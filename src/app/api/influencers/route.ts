import { prisma } from "@/lib/prisma";
import { builderQuery } from "@/utils/builderQuery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter");
    const orderBy = searchParams.get("orderBy");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const influencersQuery = builderQuery({
      searchFields: ["name", "username"],
      searchTerm: search,
      filter: filter ? JSON.parse(filter) : {},
      orderBy: orderBy ? JSON.parse(orderBy) : {},
      page: page,
      limit: limit,
    });

    const totalItems = await prisma.influencer.count({
      where: influencersQuery.where,
    });

    const totalPages = Math.ceil(totalItems / influencersQuery.take);
    const currentPages = page;

    const response = await prisma.influencer.findMany({
      ...influencersQuery,
    });

    return NextResponse.json({
      success: true,
      message: "Influencers retrieved successfully",
      meta: {
        totalItems,
        currentPages,
        totalPages,
      },
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve influencers",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


