import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.$transaction(async (prisma) => {
      const totalInfluncers = await prisma.influencer.count();
      const totalReach = await prisma.influencer.aggregate({
        _sum: {
          followers: true,
        },
      });
      const averageEngagement = await prisma.influencer.aggregate({
        _avg: {
          engagement_rate: true,
        },
      });

      return {
        data: {
          totalInfluncers,
          totalReach,
          averageEngagement,
        },
      };
    });

    return NextResponse.json({
      success: true,
      message: "Overview fetched successfully",
      data: response.data,
    });
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
