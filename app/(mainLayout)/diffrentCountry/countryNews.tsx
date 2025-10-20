import { prisma } from "@/app/utils/db";

export async function getCountryNews(country: string) {
  const dbCountry = country.toUpperCase();
  const allArticles = await prisma.newsArticle.findMany({
    where: {
      newsArticleStatus: "ACTIVE",
      newsLocation: dbCountry as any,
    },
    orderBy: { createdAt: "desc" },
    take: 9,
  });

  const lastFeaturedArticle = await prisma.newsArticle.findFirst({
    where: {
      newsArticleStatus: "ACTIVE",
      isFeatured: true,
      newsLocation: dbCountry as any,
    },
    orderBy: { createdAt: "desc" },
  });

  return { allArticles, lastFeaturedArticle };
}
