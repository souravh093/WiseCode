"use server";

import { TQuery } from "@/types/query.types";

export const getAllInfluencers = async (query: TQuery[]) => {
  try {
    const params = new URLSearchParams();

    if (query.length > 0) {
      query.forEach((item) => {
        params.append(item.key, item.value);
      });
    }

    const response = await fetch(
      `${process.env.NEXT_URL}/api/influencers?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch influencers");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching influencers:", error);
    throw error;
  }
};
