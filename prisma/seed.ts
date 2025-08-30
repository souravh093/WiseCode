import { prisma } from "../src/lib/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

export const seedUsers = async () => {
  console.log("Seeding users...");

  const users = [
    {
      email: "admin@example.com",
      password_hash: await bcrypt.hash("Admin123!", 12),
      role: "ADMIN" as const,
    },
    {
      email: "viewer@example.com",
      password_hash: await bcrypt.hash("Viewer123!", 12),
      role: "VIEWER" as const,
    },
  ];

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Users seeded successfully.");
};

export const seedInfluencers = async () => {
  console.log("Seeding influencers...");

  const influencers = Array.from({ length: 2000 }).map(() => ({
    name: faker.person.fullName(),
    platform: faker.helpers.arrayElement([
      "INSTAGRAM",
      "TIKTOK",
      "YOUTUBE",
      "X",
    ]),
    username: faker.internet.username(),
    followers: faker.number.int({ min: 1000, max: 10000000 }),
    engagement_rate: faker.number.float({
      min: 0.5,
      max: 15.0,
      fractionDigits: 2,
    }),
    country: faker.location.countryCode("alpha-2"),
    categories: faker.helpers.arrayElements(
      [
        "lifestyle",
        "fashion",
        "fitness",
        "tech",
        "gaming",
        "food",
        "travel",
        "beauty",
        "music",
        "sports",
      ],
      { min: 1, max: 3 }
    ),
    email: faker.helpers.maybe(() => faker.internet.email(), {
      probability: 0.7,
    }),
  }));

  await prisma.influencer.createMany({
    data: influencers,
    skipDuplicates: true,
  });

  console.log("Influencers seeding completed.");
};

async function main() {
  try {
    console.log("Starting database seeding...");

    await seedUsers();
    await seedInfluencers();

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
