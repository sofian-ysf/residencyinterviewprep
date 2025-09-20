import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

    // Fetch applications that have been reviewed or completed
    const reviewedApplications = await prisma.application.findMany({
      where: {
        userId: user.id,
        status: {
          in: ['REVIEWED', 'COMPLETED']
        }
      },
      include: {
        reviews: {
          include: {
            reviewer: {
              select: {
                id: true,
                name: true,
                email: true,
                medicalSchool: true,
                specialty: true
              }
            }
          }
        },
        documents: true,
        experiences: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Transform the data to include review details
    const transformedReviews = reviewedApplications.map(app => {
      const review = app.reviews[0]; // Get the most recent review
      return {
        id: app.id,
        applicationPackage: app.packageType,
        status: app.status,
        personalStatement: app.personalStatement,
        psWordCount: app.psWordCount,
        experiences: app.experiences,
        documents: app.documents,
        review: review ? {
          id: review.id,
          reviewer: review.reviewer.name || review.reviewer.email,
          reviewerEmail: review.reviewer.email,
          reviewerSpecialty: review.reviewer.specialty || 'Medical Professional',
          reviewerInstitution: review.reviewer.medicalSchool || 'Medical Institution',
          rating: review.rating || 0,
          overallFeedback: review.overallFeedback || '',
          psComments: review.psComments || '',
          experienceComments: review.experienceComments || {},
          editSummary: review.editSummary || '',
          reviewCompleted: review.reviewCompleted,
          completedDate: review.reviewCompleted
            ? new Date(review.reviewCompleted).toLocaleDateString()
            : new Date(app.updatedAt).toLocaleDateString()
        } : null
      };
    });

    return NextResponse.json(transformedReviews);

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}