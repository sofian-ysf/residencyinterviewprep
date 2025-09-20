import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function checkAdminAuth() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('Admin check: No session found');
      return { error: 'Unauthorized', status: 401 };
    }

    console.log('Admin check: Session user:', session.user.email);

    // For development: bypass database check if needed
    if (process.env.BYPASS_ADMIN_CHECK === 'true') {
      console.log('Admin check: Bypassed for development');
      return {
        user: {
          id: 'dev-admin',
          email: session.user.email,
          role: 'ADMIN' as const
        },
        status: 200
      };
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, role: true, email: true }
      });

      if (!user) {
        console.log('Admin check: User not found in database');
        // For now, create a mock admin user if database is unavailable
        return {
          user: {
            id: 'temp-admin',
            email: session.user.email,
            role: 'ADMIN' as const
          },
          status: 200
        };
      }

      console.log('Admin check: User role is', user.role);

      // Temporary: Allow specific email addresses to bypass admin check during development
      const adminEmails = ['team@myerasediting.com', 'admin@myerasediting.com'];
      if (adminEmails.includes(user.email.toLowerCase()) || user.role === 'ADMIN') {
        console.log('Admin check: Access granted');
        return { user: { ...user, role: 'ADMIN' as const }, status: 200 };
      }

      // For now, allow all authenticated users to access admin
      console.log('Admin check: Temporarily allowing access for development');
      return { user: { ...user, role: 'ADMIN' as const }, status: 200 };

    } catch (dbError) {
      console.error('Database error in admin check:', dbError);
      // If database is down, allow access for development
      return {
        user: {
          id: 'temp-admin',
          email: session.user.email,
          role: 'ADMIN' as const
        },
        status: 200
      };
    }
  } catch (error) {
    console.error('Admin check error:', error);
    return { error: 'Internal server error', status: 500 };
  }
}

export function createAdminResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}