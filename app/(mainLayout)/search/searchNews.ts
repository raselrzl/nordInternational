"use server";

import { prisma } from "@/app/utils/db";
import { NewsCountry } from "@prisma/client";

export async function searchNewsLimited(query: string) {
  if (!query || query.trim() === "") return [];

  const keyword = query.trim();

  // ---------- Match country enum ----------
  let countryFilter: NewsCountry | undefined = undefined;

  const enumValues = Object.values(NewsCountry);

  const matchedCountry = enumValues.find(
    (country) => country.toLowerCase() === keyword.toLowerCase()
  );

  if (matchedCountry) {
    countryFilter = matchedCountry;
  }

  // ---------- Search ----------
  const results = await prisma.newsArticle.findMany({
    where: {
      newsArticleStatus: "ACTIVE",
      OR: [
        // 1. Heading match
        {
          newsHeading: {
            contains: keyword,
            mode: "insensitive",
          },
        },

        // 2. Details match
        {
          newsDetails: {
            contains: keyword,
            mode: "insensitive",
          },
        },

        // 3. Country match (only if matched)
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
