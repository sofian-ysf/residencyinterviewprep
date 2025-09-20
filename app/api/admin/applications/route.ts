import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, createAdminResponse } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const authResult = await checkAdminAuth();

  if (authResult.status !== 200) {
    return createAdminResponse(authResult.error!, authResult.status);
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const userId = searchParams.get('userId');

  try {
    const whereClause: any = {};

    if (status && status !== 'all') {
      whereClause.status = status;
    } else if (!status) {
      // Default to showing only in-review applications
      whereClause.status = {
        in: ['IN_REVIEW', 'SUBMITTED']
      };
    }
    // If status === 'all', don't add any status filter

    if (userId) {
      whereClause.userId = userId;
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            medicalSchool: true,
            graduationYear: true,
            specialty: true
          }
        },
        documents: true,
        experiences: {
          select: {
            id: true,
            title: true,
            organization: true,
            experienceType: true,
            isMostMeaningful: true
          }
        },
        reviews: {
          select: {
            id: true,
            status: true,
            rating: true,
            reviewCompleted: true
          }
        },
        _count: {
          select: {
            documents: true,
            experiences: true,
            reviews: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return NextResponse.json(applications);

  } catch (error) {
    console.error('Error fetching applications:', error);
    return createAdminResponse('Failed to fetch applications', 500);
  }
}