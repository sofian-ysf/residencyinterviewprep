import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    // Get the current user session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create a test payment record
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        stripePaymentIntentId: `test_pi_${Date.now()}`,
        stripeCustomerId: `test_cus_${Date.now()}`,
        amount: 299,
        currency: 'usd',
        status: 'SUCCEEDED',
        packageType: 'comprehensive',
        packageName: 'Comprehensive Edit (Test)',
        metadata: {
          test: true,
          createdAt: new Date().toISOString()
        }
      }
    });

    // Create an application for the user
    const application = await prisma.application.create({
      data: {
        userId: user.id,
        packageType: 'COMPREHENSIVE',
        status: 'DRAFT'
      }
    });

    // Link payment to application
    await prisma.payment.update({
      where: { id: payment.id },
      data: { applicationId: application.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Test payment created successfully',
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        packageName: payment.packageName
      },
      application: {
        id: application.id,
        status: application.status
      }
    });
  } catch (error) {
    console.error('Error creating test payment:', error);
    return NextResponse.json(
      { error: 'Failed to create test payment' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Get the current user session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Find the user and their payments
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        payments: {
          orderBy: { createdAt: 'desc' }
        },
        applications: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const hasActivePayment = user.payments.some(p => p.status === 'SUCCEEDED');
    const activeApplications = user.applications.filter(a => a.status !== 'COMPLETED');

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      hasActivePayment,
      payments: user.payments.map(p => ({
        id: p.id,
        amount: p.amount,
        status: p.status,
        packageName: p.packageName,
        createdAt: p.createdAt
      })),
      applications: activeApplications.map(a => ({
        id: a.id,
        packageType: a.packageType,
        status: a.status,
        createdAt: a.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment status' },
      { status: 500 }
    );
  }
}