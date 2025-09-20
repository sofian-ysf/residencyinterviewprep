import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function checkAdminAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { error: 'Unauthorized', status: 401 };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true, email: true }
  });

  if (!user) {
    return { error: 'User not found', status: 404 };
  }

  if (user.role !== 'ADMIN') {
    return { error: 'Forbidden - Admin access required', status: 403 };
  }

  return { user, status: 200 };
}

export function createAdminResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}