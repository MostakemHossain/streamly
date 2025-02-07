import { db } from "@/db";
import { categories } from "@/db/schema";

export const categoriesName = [
  "Comedy",
  "Education",
  "Entertainment",
  "Film & Animation",
  "Gaming",
  "Howto & Style",
  "Music",
  "News & Politics",
  "Sports",
  "Travel & Events",
  "People & Blogs",
  "Pets & Animals",
  "Science & Technology",
];

async function main() {
  try {
    // Create categories
    const values = categoriesName.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}}`,
    }));

    await db.insert(categories).values(values);
    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories ", error);
    process.exit(1);
  }
}
main();
