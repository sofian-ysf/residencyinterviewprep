import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe, formatAmountForStripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is properly initialized
    if (!stripe) {
      console.error('Stripe is not initialized. Check STRIPE_SECRET_KEY environment variable.');
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 503 }
      );
    }

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { packageId, packageName, amount } = await req.json();

    if (!packageId || !packageName || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount, 'usd'),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: user.id,
        packageId: packageId,
        packageName: packageName,
      },
    });

    // Create a pending payment record
    await prisma.payment.create({
      data: {
        userId: user.id,
        stripePaymentIntentId: paymentIntent.id,
        amount: amount,
        status: "PENDING",
        packageType: packageId.toUpperCase(),
        packageName: packageName,
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      amount: amount,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    
    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('STRIPE_SECRET_KEY')) {
        return NextResponse.json(
          { error: 'Payment service not configured properly' },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { error: error.message || 'Failed to create payment intent' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}