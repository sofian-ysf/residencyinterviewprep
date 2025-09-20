import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, createAdminResponse } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const authResult = await checkAdminAuth();

  if (authResult.status !== 200) {
    return createAdminResponse(authResult.error!, authResult.status);
  }

  try {
    const [totalUsers, applicationsInReview, completedReviews, allApplications] = await Promise.all([
      prisma.user.count(),
      prisma.application.count({
        where: {
          status: {
            in: ['IN_REVIEW', 'SUBMITTED']
          }
        }
      }),
      prisma.application.count({
        where: {
          status: {
            in: ['REVIEWED', 'COMPLETED']
          }
        }
      }),
      prisma.application.findMany({
        select: {
          id: true,
          status: true
        }
      })
    ]);

    // For now, we'll set pendingRequests to 0 (we'll implement edit requests tracking later)
    const pendingRequests = 0;

    return NextResponse.json({
      totalUsers,
      applicationsInReview,
      completedReviews,
      pendingRequests
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return createAdminResponse('Failed to fetch statistics', 500);
  }
}