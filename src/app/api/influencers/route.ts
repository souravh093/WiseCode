import { prisma } from "@/lib/prisma";
import { builderQuery } from "@/utils/builderQuery";
import { NextRequest, NextResponse } from "next/server";
import { Platform } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const platform = searchParams.get("platform");
    const country = searchParams.get("country");
    const category = searchParams.get("category");
    const minFollowers = searchParams.get("minFollowers");
    const sortBy = searchParams.get("sortBy");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const filter: Record<string, unknown> = {};

    if (platform && Object.values(Platform).includes(platform as Platform)) {
      filter.platform = platform as Platform;
    }

    if (country) {
      filter.country = country;
    }

    if (category) {
      filter.categories = {
        has: category,
      };
    }

    if (minFollowers) {
      filter.followers = {
        gte: parseInt(minFollowers),
      };
    }

    let orderBy: Record<string, string> = { created_at: "desc" };

    if (sortBy) {
      switch (sortBy) {
        case "followers-desc":
          orderBy = { followers: "desc" };
          break;
        case "followers-asc":
          orderBy = { followers: "asc" };
          break;
        case "engagement-desc":
          orderBy = { engagement_rate: "desc" };
          break;
        case "engagement-asc":
          orderBy = { engagement_rate: "asc" };
          break;
      }
    }

    const influencersQuery = builderQuery({
      searchFields: ["name", "username"],
      searchTerm: search,
      filter: filter,
      orderBy: orderBy,
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
