import { prisma } from "@/app/utils/db";
import { NewsCountry } from "@prisma/client";
import CountrySliderClient from "./CountrySliderClient";

const countries = Object.values(NewsCountry);

// ✅ Set priority countries here
const priority = ["Sweden", "Portugal"];

async function getLatestPerCountry() {
  const results = await Promise.all(
    countries.map(async (country) => {
      const article = await prisma.newsArticle.findFirst({
        where: {
          newsLocation: country,
          newsArticleStatus: "ACTIVE",
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          newsHeading: true,
          newsDetails: true,
          newsPicture: true,
          newsPictureHeading: true,
          createdAt: true,
        },
      });

      return article ? { ...article, country } : null;
    })
  );

  return results
    .filter((item): item is any => item !== null)
    .sort((a, b) => {
      // 1️⃣ Priority countries first
      const aPriority = priority.indexOf(a.country);
      const bPriority = priority.indexOf(b.country);

      if (aPriority !== -1 && bPriority === -1) return -1;
      if (aPriority === -1 && bPriority !== -1) return 1;
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;

      // 2️⃣ Then sort the rest alphabetically
      return a.country.localeCompare(b.country);
    });
}

export default async function CountryNewsSlider() {
  const articles = await getLatestPerCountry();
  if (!articles.length) return null;

  return <CountrySliderClient articles={articles} />;
}