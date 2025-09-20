import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, createAdminResponse } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const authResult = await checkAdminAuth();

  if (authResult.status !== 200) {
    return createAdminResponse(authResult.error!, authResult.status);
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        applications: {
          select: {
            id: true,
            status: true,
            packageType: true,
            createdAt: true,
            updatedAt: true
          }
        },
        _count: {
          select: {
            applications: true,
            reviews: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(users);

  } catch (error) {
    console.error('Error fetching users:', error);
    return createAdminResponse('Failed to fetch users', 500);
  }
}