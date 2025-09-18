import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function markUserAsPaid() {
  const email = 'sofian_y@hotmail.co.uk';

  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`User with email ${email} not found`);
      return;
    }

    console.log(`Found user: ${user.name || user.email}`);

    // Create a payment record
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        amount: 299, // Comprehensive package
        currency: 'USD',
        status: 'SUCCEEDED',
        stripePaymentId: `manual_${Date.now()}`,
        packageType: 'COMPREHENSIVE',
      },
    });

    // Create an application for the user
    const application = await prisma.application.create({
      data: {
        userId: user.id,
        packageType: 'COMPREHENSIVE',
        status: 'DRAFT',
      },
    });

    // Update the payment with the application ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: { applicationId: application.id },
    });

    console.log('✅ Successfully marked user as paid!');
    console.log(`Payment ID: ${payment.id}`);
    console.log(`Application ID: ${application.id}`);
    console.log('\nUser can now access /dashboard/new to upload documents');

  } catch (error) {
    console.error('Error marking user as paid:', error);
  } finally {
    await prisma.$disconnect();
  }
}

markUserAsPaid();