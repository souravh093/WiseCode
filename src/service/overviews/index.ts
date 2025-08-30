"use server";

export const overviewInfluencer = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_URL}/api/overviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching overview:", error);
    throw new Error("Failed to fetch overview");
  }
};
