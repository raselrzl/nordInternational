import { prisma } from "@/app/utils/db";
import { newsCategory } from "@prisma/client";
import CategorySliderClient from "./CategorySliderClient";

const categories = Object.values(newsCategory);

// Optionally: Set priority categories
const priority = ["WAR", "POLITICS", "LATEST"];

async function getLatestPerCategory() {
  const results = await Promise.all(
    categories.map(async (category) => {
      const article = await prisma.newsArticle.findFirst({
        where: {
          newsCategory: category,
          newsArticleStatus: "ACTIVE",
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          newsHeading: true,
          newsSubHeading: true,
          newsPicture: true,
          newsPictureHeading: true,
          createdAt: true,
        },
      });

      return article ? { ...article, category } : null;
    })
  );

  return results
    .filter((item): item is any => item !== null)
    .sort((a, b) => {
      // 1️⃣ Priority categories first
      const aPriority = priority.indexOf(a.category);
      const bPriority = priority.indexOf(b.category);

      if (aPriority !== -1 && bPriority === -1) return -1;
      if (aPriority === -1 && bPriority !== -1) return 1;
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;

      // 2️⃣ Alphabetical order for the rest
      return a.category.localeCompare(b.category);
    });
}

export default async function CategoryNewsSlider() {
  const articles = await getLatestPerCategory();
  if (!articles.length) return null;

  return <CategorySliderClient articles={articles} />;
}