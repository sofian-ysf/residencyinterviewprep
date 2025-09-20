import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const params = await context.params;
    const applicationId = params.id;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch the specific application with review details
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
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
                specialty: true,
                role: true
              }
            }
          },
          orderBy: {
            updatedAt: 'desc'
          }
        },
        documents: true,
        experiences: {
          orderBy: {
            startDate: 'desc'
          }
        }
      }
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Review not found or unauthorized' },
        { status: 404 }
      );
    }

    // Get the most recent review
    const review = application.reviews[0];

    return NextResponse.json({
      application,
      review,
      editedContent: {
        personalStatement: application.personalStatement,
        experiences: application.experiences,
        editSummary: review?.editSummary || null,
        reviewer: review?.reviewer || null,
        reviewDate: review?.updatedAt || application.updatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching review details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch review details' },
      { status: 500 }
    );
  }
}