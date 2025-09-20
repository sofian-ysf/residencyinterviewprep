import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
    const {
      applicationId,
      packageType,
      personalInfo,
      documents,
      experiences,
      personalStatement,
      programSignals,
      impactfulExperience,
    } = body;

    // Map package types from pricing to Prisma enum
    const packageTypeMap: { [key: string]: string } = {
      'basic': 'ESSENTIAL',
      'professional': 'COMPREHENSIVE',
      'premium': 'PREMIUM',
      'complete': 'COMPLETE'
    };

    // If applicationId exists, update it, otherwise create new
    const applicationData: any = {
      packageType: packageTypeMap[packageType?.toLowerCase()] || 'ESSENTIAL',
      status: 'DRAFT',

      // Personal Statement
      personalStatement: personalStatement?.content || '',
      psCharCount: personalStatement?.charCount || 0,

      // Program Signals (store personal info here temporarily)
      programSignals: {
        ...(programSignals || {}),
        personalInfo: {
          firstName: personalInfo?.firstName,
          lastName: personalInfo?.lastName,
          email: personalInfo?.email || session.user.email,
          phone: personalInfo?.phone,
          aamc: personalInfo?.aamc,
          medicalSchool: personalInfo?.medicalSchool,
          graduationYear: personalInfo?.graduationYear,
        }
      },

      // Impactful Experience
      impactfulExperience: impactfulExperience || '',
    };

    let application: any;

    if (applicationId) {
      // Update existing draft
      application = await prisma.application.update({
        where: {
          id: applicationId,
          userId: user.id, // Ensure user owns this application
        },
        data: {
          ...applicationData,
          updatedAt: new Date(),
        },
        include: {
          documents: true,
          experiences: true,
        },
      });

      // Handle experiences if provided
      if (experiences && experiences.length > 0) {
        // Delete existing experiences and recreate
        await prisma.experience.deleteMany({
          where: { applicationId: application.id },
        });

        await prisma.experience.createMany({
          data: experiences.map((exp: any) => ({
            applicationId: application.id,
            title: exp.title,
            organization: exp.organization,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            ongoing: exp.ongoing || false,
            description: exp.description,
            charCount: exp.charCount || exp.description?.length || 0,
            isMostMeaningful: exp.isMostMeaningful || false,
            meaningfulDescription: exp.meaningfulDescription,
            experienceType: exp.experienceType || 'OTHER',
          })),
        });
      }
    } else {
      // Create new draft
      application = await prisma.application.create({
        data: {
          ...applicationData,
          userId: user.id,
          experiences: experiences && experiences.length > 0 ? {
            create: experiences.map((exp: any) => ({
              title: exp.title,
              organization: exp.organization,
              startDate: new Date(exp.startDate),
              endDate: exp.endDate ? new Date(exp.endDate) : null,
              ongoing: exp.ongoing || false,
              description: exp.description,
              charCount: exp.charCount || exp.description?.length || 0,
              isMostMeaningful: exp.isMostMeaningful || false,
              meaningfulDescription: exp.meaningfulDescription,
              experienceType: exp.experienceType || 'OTHER',
            })),
          } : undefined,
        },
        include: {
          documents: true,
          experiences: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: 'Draft saved successfully',
    });

  } catch (error) {
    console.error('Error saving draft:', error);
    return NextResponse.json(
      { error: 'Failed to save draft' },
      { status: 500 }
    );
  }
}

// Get user's drafts
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

    const drafts = await prisma.application.findMany({
      where: {
        userId: user.id,
        status: 'DRAFT',
      },
      include: {
        documents: true,
        experiences: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(drafts);

  } catch (error) {
    console.error('Error fetching drafts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch drafts' },
      { status: 500 }
    );
  }
}