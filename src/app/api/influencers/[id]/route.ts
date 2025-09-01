import { prisma } from "@/lib/prisma";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    let token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      token = request.cookies.get("token")?.value;
    }

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No authorization token provided",
        },
        { status: 401 }
      );
    }

    const decoded = jwtDecode<{ role: string }>(token);
    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid authorization token",
        },
        { status: 401 }
      );
    }

    if (!decoded.role) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    const influencer = await prisma.influencer.findUnique({ where: { id } });

    if (!influencer) {
      return NextResponse.json(
        {
          success: false,
          message: "Influencer not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Influencer retrieved successfully",
      data: influencer,
    });
  } catch (error) {
    console.error("Error fetching influencer:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    let token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      token = request.cookies.get("token")?.value;
    }

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No authorization token provided",
        },
        { status: 401 }
      );
    }

    const decoded = jwtDecode<{ role: string }>(token);
    if (!decoded || !decoded.role || decoded.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized - Admin access required",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      name,
      platform,
      username,
      email,
      followers,
      engagement_rate,
      country,
      categories,
    } = body;

    // Check if influencer exists
    const existingInfluencer = await prisma.influencer.findUnique({
      where: { id },
    });

    if (!existingInfluencer) {
      return NextResponse.json(
        {
          success: false,
          message: "Influencer not found",
        },
        { status: 404 }
      );
    }

    // Check if username is already taken by another influencer
    if (username !== existingInfluencer.username) {
      const existingUsername = await prisma.influencer.findFirst({
        where: {
          username,
          platform,
          id: { not: id },
        },
      });

      if (existingUsername) {
        return NextResponse.json(
          {
            success: false,
            message: "Username already exists for this platform",
          },
          { status: 400 }
        );
      }
    }

    const updatedInfluencer = await prisma.influencer.update({
      where: { id },
      data: {
        name,
        platform,
        username,
        email: email || null,
        followers: parseInt(followers),
        engagement_rate: parseFloat(engagement_rate),
        country,
        categories,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Influencer updated successfully",
      data: updatedInfluencer,
    });
  } catch (error) {
    console.error("Error updating influencer:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    let token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      token = request.cookies.get("token")?.value;
    }

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No authorization token provided",
        },
        { status: 401 }
      );
    }

    const decoded = jwtDecode<{ role: string }>(token);
    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid authorization token",
        },
        { status: 401 }
      );
    }

    if (!decoded.role) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    const influencer = await prisma.influencer.findUnique({ where: { id } });

    if (!influencer) {
      return NextResponse.json(
        {
          success: false,
          message: "Influencer not found",
        },
        { status: 404 }
      );
    }

    await prisma.influencer.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Influencer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting influencer:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
