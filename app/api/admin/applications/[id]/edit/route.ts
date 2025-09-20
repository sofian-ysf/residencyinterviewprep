import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, createAdminResponse } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function PUT(
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
    const {
      personalStatement,
      experiences,
      editSummary
    } = body;

    // Update application
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        personalStatement,
        psWordCount: personalStatement ? personalStatement.split(/\s+/).length : undefined,
        psCharCount: personalStatement ? personalStatement.length : undefined,
        updatedAt: new Date()
      }
    });

    // Update experiences if provided
    if (experiences && experiences.length > 0) {
      for (const exp of experiences) {
        await prisma.experience.update({
          where: { id: exp.id },
          data: {
            title: exp.title,
            organization: exp.organization,
            description: exp.description,
            meaningfulDescription: exp.meaningfulDescription,
            charCount: exp.description ? exp.description.length : 0,
            updatedAt: new Date()
          }
        });
      }
    }

    // Create or update review with edit summary
    const existingReview = await prisma.review.findFirst({
      where: {
        applicationId,
        reviewerId: authResult.user!.id
      }
    });

    if (existingReview) {
      await prisma.review.update({
        where: { id: existingReview.id },
        data: {
          editSummary,
          status: 'IN_PROGRESS',
          updatedAt: new Date()
        }
      });
    } else {
      await prisma.review.create({
        data: {
          applicationId,
          reviewerId: authResult.user!.id,
          editSummary,
          status: 'IN_PROGRESS'
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Application updated successfully'
    });

  } catch (error) {
    console.error('Error updating application:', error);
    return createAdminResponse('Failed to update application', 500);
  }
}