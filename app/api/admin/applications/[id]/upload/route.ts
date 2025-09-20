import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, createAdminResponse } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(
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
    const formData = await request.formData();
    const editedFile = formData.get('editedFile') as File | null;
    const explanationFile = formData.get('explanationFile') as File | null;
    const documentType = formData.get('documentType') as string;

    if (!editedFile && !explanationFile) {
      return createAdminResponse('At least one file must be provided', 400);
    }

    // Check if application exists
    const application = await prisma.application.findUnique({
      where: { id: applicationId }
    });

    if (!application) {
      return createAdminResponse('Application not found', 404);
    }

    const uploadedDocuments = [];

    // Handle edited file upload
    if (editedFile) {
      const editedFileBuffer = await editedFile.arrayBuffer();
      const editedFileData = Buffer.from(editedFileBuffer);
      const editedFileName = `edited_${uuidv4()}_${editedFile.name}`;

      // In production, you would upload to cloud storage here
      // For now, we'll store metadata in the database
      const editedDoc = await prisma.document.create({
        data: {
          applicationId,
          fileName: editedFileName,
          fileUrl: `/uploads/${editedFileName}`, // This would be a cloud URL in production
          fileType: documentType as any || 'OTHER',
          content: editedFileData.toString('base64') // Store as base64 for now
        }
      });

      uploadedDocuments.push(editedDoc);
    }

    // Handle explanation file upload
    if (explanationFile) {
      const explanationFileBuffer = await explanationFile.arrayBuffer();
      const explanationFileData = Buffer.from(explanationFileBuffer);
      const explanationFileName = `explanation_${uuidv4()}_${explanationFile.name}`;

      const explanationDoc = await prisma.document.create({
        data: {
          applicationId,
          fileName: explanationFileName,
          fileUrl: `/uploads/${explanationFileName}`,
          fileType: 'OTHER',
          content: explanationFileData.toString('base64')
        }
      });

      uploadedDocuments.push(explanationDoc);
    }

    // Update application status if needed
    if (application.status === 'IN_REVIEW') {
      await prisma.application.update({
        where: { id: applicationId },
        data: {
          status: 'REVIEWED',
          updatedAt: new Date()
        }
      });
    }

    return NextResponse.json({
      success: true,
      documents: uploadedDocuments,
      message: 'Files uploaded successfully'
    });

  } catch (error) {
    console.error('Error uploading files:', error);
    return createAdminResponse('Failed to upload files', 500);
  }
}