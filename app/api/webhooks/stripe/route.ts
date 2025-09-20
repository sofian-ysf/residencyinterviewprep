import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email/gmail-service';
import { emailTemplates } from '@/lib/email/templates';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const metadata = paymentIntent.metadata;
        const userId = metadata.userId;
        const serviceName = metadata.serviceName || 'ERAS Editing Service';
        const packageType = metadata.packageType || 'ESSENTIAL';

        if (userId) {
          const user = await prisma.user.findUnique({
            where: { id: userId },
          });

          if (user) {
            await prisma.payment.create({
              data: {
                userId: user.id,
                stripePaymentId: paymentIntent.id,
                amount: paymentIntent.amount / 100,
                status: 'SUCCEEDED',
                packageType: packageType,
                packageName: serviceName,
              },
            });

            const receiptData = {
              userName: user.name || 'Customer',
              amount: paymentIntent.amount / 100,
              paymentId: paymentIntent.id,
              serviceName,
              date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              invoiceUrl: undefined,
            };

            const template = emailTemplates.paymentReceipt(receiptData);
            await sendEmail({
              to: user.email,
              subject: template.subject,
              html: template.html,
            });

            console.log(`Payment receipt sent to ${user.email}`);
          }
        }
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        const metadata = session.metadata;
        const userId = metadata?.userId;
        const serviceName = metadata?.serviceName || 'ERAS Editing Service';
        const packageType = metadata?.packageType || 'ESSENTIAL';

        if (userId && session.customer_email) {
          const user = await prisma.user.findUnique({
            where: { id: userId },
          });

          if (user) {
            await prisma.payment.create({
              data: {
                userId: user.id,
                stripePaymentId: session.payment_intent as string,
                amount: (session.amount_total || 0) / 100,
                status: 'SUCCEEDED',
                packageType: packageType,
                packageName: serviceName,
              },
            });

            const receiptData = {
              userName: user.name || 'Customer',
              amount: (session.amount_total || 0) / 100,
              paymentId: session.payment_intent as string,
              serviceName,
              date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            };

            const template = emailTemplates.paymentReceipt(receiptData);
            await sendEmail({
              to: user.email,
              subject: template.subject,
              html: template.html,
            });

            console.log(`Payment receipt sent to ${user.email}`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}