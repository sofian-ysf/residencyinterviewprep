import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, createAdminResponse } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authResult = await checkAdminAuth();

  if (authResult.status !== 200) {
    return createAdminResponse(authResult.error!, authResult.status);
  }

  const params = await context.params;
  const applicationId = params.id;

  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        user: true,
        documents: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        experiences: {
          orderBy: {
            startDate: 'desc'
          }
        },
        reviews: {
          include: {
            reviewer: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!application) {
      return createAdminResponse('Application not found', 404);
    }

    return NextResponse.json(application);

  } catch (error) {
    console.error('Error fetching application:', error);
    return createAdminResponse('Failed to fetch application', 500);
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authResult = await checkAdminAuth();

  if (authResult.status !== 200) {
    return createAdminResponse(authResult.error!, authResult.status);
  }

  const params = await context.params;
  const applicationId = params.id;

  try {
    const body = await request.json();
    const { status } = body;

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedApplication);

  } catch (error) {
    console.error('Error updating application:', error);
    return createAdminResponse('Failed to update application', 500);
  }
}