import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendApplicationSubmittedNotification } from '@/lib/discord';

export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json();
    const { applicationId } = body;

    // Check if user already has an application in review
    const existingInReview = await prisma.application.findFirst({
      where: {
        userId: user.id,
        status: {
          in: ['IN_REVIEW', 'SUBMITTED']
        }
      }
    });

    if (existingInReview) {
      return NextResponse.json(
        {
          error: 'You already have an application in review. Please wait for it to be completed before submitting another.',
          existingApplicationId: existingInReview.id
        },
        { status: 400 }
      );
    }

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Find the application and verify ownership
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId: user.id,
      },
      include: {
        documents: true,
        experiences: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Validate that application has minimum required information
    if (!application.personalStatement && application.experiences.length === 0) {
      return NextResponse.json(
        { error: 'Application must have at least a personal statement or experiences before submission' },
        { status: 400 }
      );
    }

    // Update application status to IN_REVIEW
    const updatedApplication = await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        status: 'IN_REVIEW',
        updatedAt: new Date(),
      },
    });

    // Send Discord notification
    await sendApplicationSubmittedNotification({
      email: user.email,
      name: user.name || undefined,
      packageType: application.packageType,
      specialty: undefined,
    });

    return NextResponse.json({
      success: true,
      applicationId: updatedApplication.id,
      message: 'Application submitted for review successfully',
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

// Get all applications (drafts, in review, completed)
export async function GET(request: NextRequest) {
  try {
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

    const applications = await prisma.application.findMany({
      where: {
        userId: user.id,
      },
      include: {
        documents: true,
        experiences: true,
        reviews: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(applications);

  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}