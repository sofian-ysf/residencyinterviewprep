import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch the application with all related data
    const application = await prisma.application.findFirst({
      where: {
        id: params.id,
        userId: user.id, // Ensure the user owns this application
      },
      include: {
        documents: true,
        experiences: {
          orderBy: {
            createdAt: 'asc'
          }
        },
        reviews: true,
        payment: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    console.log('Returning application with personalStatement:', application.personalStatement?.substring(0, 100));
    return NextResponse.json(application);

  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // First, check if the application exists and belongs to the user
    const application = await prisma.application.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Don't allow deletion of applications that are in review
    if (application.status === 'IN_REVIEW' || application.status === 'SUBMITTED') {
      return NextResponse.json(
        { error: 'Cannot delete applications that are in review' },
        { status: 400 }
      );
    }

    // Delete related records first (due to foreign key constraints)
    await prisma.experience.deleteMany({
      where: { applicationId: params.id }
    });

    await prisma.document.deleteMany({
      where: { applicationId: params.id }
    });

    await prisma.review.deleteMany({
      where: { applicationId: params.id }
    });

    // Now delete the application
    await prisma.application.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}