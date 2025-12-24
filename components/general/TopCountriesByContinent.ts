"use server";

import { prisma } from "@/app/utils/db";
import { NewsCountry } from "@prisma/client";

/**
 * Continent → Countries mapping (from YOUR enum)
 */
const CONTINENT_COUNTRIES: Record<string, NewsCountry[]> = {
  Asia: ["Bangladesh", "India", "Pakistan", "Chaina", "Asia"],
  Europe: [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
    "CzechRepublic", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy",
    "Latvia", "Lithuania", "Luxembourg", "Malta",
    "Netherlands", "Poland", "Portugal", "Romania",
    "Slovakia", "Slovenia", "Spain", "Sweden",
    "Uk", "Switzerland", "Norway",
  ],
  America: ["Usa", "Canada", "Southamerica"],
  MiddleEast: ["Middleeast"],
  Africa: ["Afrika"],
  Australia: ["Australia"],
};

export async function getTopCountriesByContinent() {
  const result: Record<
    string,
    { country: string; totalNews: number }[]
  > = {};

  for (const continent of Object.keys(CONTINENT_COUNTRIES)) {
    const countries = CONTINENT_COUNTRIES[continent];

    /**
     * 🔥 REAL database aggregation
     */
    const data = await prisma.newsArticle.groupBy({
      by: ["newsLocation"],
      where: {
        newsArticleStatus: "ACTIVE",
        newsLocation: {
          in: countries,
        },
      },
      _count: {
        newsLocation: true,
      },
      orderBy: {
        _count: {
          newsLocation: "desc",
        },
      },
      take: 5,
    });

    result[continent] = data.map((item) => ({
      country: item.newsLocation!,
      totalNews: item._count.newsLocation,
    }));
  }

  return result;
}
