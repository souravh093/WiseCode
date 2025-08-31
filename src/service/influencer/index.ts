"use server";

import { TQuery } from "@/types/query.types";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

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

export const createInfluencer = async (data: FieldValues) => {
  try {
    const cookie = await cookies();
    const token = cookie.get("auth-token")?.value;

    const response = await fetch(`${process.env.NEXT_URL}/api/influencers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create influencer");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating influencer:", error);
    throw error;
  }
};
