import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { TJwtPayload } from "@/types/auth.types";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authenticated",
        },
        { status: 401 }
      );

    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET environment variable is not set");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error",
        },
        { status: 500 }
      );
    }

    try {
      const payload = jwt.verify(token, jwtSecret) as TJwtPayload;

      const user = await prisma.user.findUnique({
        where: { email: payload.email },
        select: {
          id: true,
          email: true,
          role: true,
          created_at: true,
          updated_at: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: "User not found",
          },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "User data retrieved successfully",
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
          },
          isAuthenticated: true,
        },
      });
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
