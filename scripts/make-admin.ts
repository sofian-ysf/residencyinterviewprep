import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    });

    console.log(`✅ User ${user.email} is now an admin`);
    console.log(`   Name: ${user.name || 'Not set'}`);
    console.log(`   Role: ${user.role}`);
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.error(`❌ User with email ${email} not found`);
    } else {
      console.error('❌ Error making user admin:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.log('Usage: npm run make-admin <email>');
  console.log('Example: npm run make-admin admin@example.com');
  process.exit(1);
}

makeAdmin(email);