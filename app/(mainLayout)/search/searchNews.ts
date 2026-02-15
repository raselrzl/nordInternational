"use server";

import { prisma } from "@/app/utils/db";
import { NewsCountry } from "@prisma/client";

export async function searchNewsLimited(query: string) {
  if (!query || query.trim() === "") return [];

  const keyword = query.trim();

  // Try to match enum value
  let countryFilter = undefined;

  const enumValues = Object.values(NewsCountry);

  const matchedCountry = enumValues.find(
    (country) => country.toLowerCase() === keyword.toLowerCase()
  );

  if (matchedCountry) {
    countryFilter = matchedCountry;
  }

  const results = await prisma.newsArticle.findMany({
    where: {
      newsArticleStatus: "ACTIVE",
      OR: [
        {
          newsHeading: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        ...(countryFilter
          ? [
              {
                newsLocation: countryFilter,
              },
            ]
          : []),
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return results;
}
