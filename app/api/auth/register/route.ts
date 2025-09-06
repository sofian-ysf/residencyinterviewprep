import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendNewUserNotification } from "@/lib/discord";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, medicalSchool, graduationYear, specialty } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        medicalSchool,
        graduationYear,
        specialty,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Send Discord notification
    await sendNewUserNotification({
      email: user.email,
      name: user.name || undefined,
      provider: 'Email/Password',
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}