import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { sendPaymentNotification } from '@/lib/discord';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        const payment = await prisma.payment.upsert({
          where: {
            stripePaymentIntentId: paymentIntent.id,
          },
          update: {
            status: 'SUCCEEDED',
            updatedAt: new Date(),
          },
          create: {
            stripePaymentIntentId: paymentIntent.id,
            stripeCustomerId: paymentIntent.customer as string,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: 'SUCCEEDED',
            packageType: paymentIntent.metadata.planId || 'unknown',
            packageName: paymentIntent.metadata.planName,
            userId: paymentIntent.metadata.userId,
            metadata: paymentIntent.metadata,
          },
          include: {
            user: true,
          },
        });

        // Send Discord notification for successful payment
        await sendPaymentNotification({
          email: payment.user.email,
          name: payment.user.name || undefined,
          packageName: payment.packageName || payment.packageType,
          amount: payment.amount,
          paymentId: paymentIntent.id,
        });
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        
        await prisma.payment.update({
          where: {
            stripePaymentIntentId: failedPayment.id,
          },
          data: {
            status: 'FAILED',
            updatedAt: new Date(),
          },
        });
        break;

      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.payment_status === 'paid') {
          await prisma.payment.create({
            data: {
              stripeSessionId: session.id,
              stripePaymentIntentId: session.payment_intent as string,
              stripeCustomerId: session.customer as string,
              amount: (session.amount_total || 0) / 100,
              currency: session.currency || 'usd',
              status: 'SUCCEEDED',
              packageType: session.metadata?.planId || 'unknown',
              packageName: session.metadata?.planName,
              userId: session.metadata?.userId || session.customer_email || 'unknown',
              metadata: session.metadata || undefined,
            },
          });
        }
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        
        await prisma.subscription.upsert({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          update: {
            status: mapStripeStatus(subscription.status),
            currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
            currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
            updatedAt: new Date(),
          },
          create: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            status: mapStripeStatus(subscription.status),
            currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
            currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
            userId: (subscription as any).metadata?.userId || '',
          },
        });
        break;

      case 'customer.subscription.deleted':
        const canceledSubscription = event.data.object as Stripe.Subscription;
        
        await prisma.subscription.update({
          where: {
            stripeSubscriptionId: canceledSubscription.id,
          },
          data: {
            status: 'CANCELED',
            updatedAt: new Date(),
          },
        });
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        
        if ((invoice as any).subscription) {
          await prisma.payment.create({
            data: {
              stripePaymentId: (invoice as any).payment_intent as string,
              stripeCustomerId: (invoice as any).customer as string,
              amount: ((invoice as any).amount_paid || 0) / 100,
              currency: (invoice as any).currency || 'usd',
              status: 'SUCCEEDED',
              packageType: 'subscription',
              packageName: `Subscription Payment - ${(invoice as any).number}`,
              userId: (invoice as any).metadata?.userId || (invoice as any).customer_email || 'unknown',
              metadata: {
                invoiceId: invoice.id,
                subscriptionId: (invoice as any).subscription,
                ...(invoice as any).metadata,
              },
            },
          });
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

function mapStripeStatus(stripeStatus: Stripe.Subscription.Status): any {
  const statusMap: Record<Stripe.Subscription.Status, string> = {
    'active': 'ACTIVE',
    'canceled': 'CANCELED',
    'incomplete': 'INCOMPLETE',
    'incomplete_expired': 'INCOMPLETE_EXPIRED',
    'past_due': 'PAST_DUE',
    'trialing': 'TRIALING',
    'unpaid': 'UNPAID',
    'paused': 'ACTIVE',
  };
  
  return statusMap[stripeStatus] || 'ACTIVE';
}