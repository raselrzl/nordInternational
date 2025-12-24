"use server";

import { prisma } from "@/app/utils/db";
import Link from "next/link";


export async function getTopViewedNews() {
  try {
    const news = await prisma.newsArticle.findMany({
      where: {
        newsArticleStatus: "ACTIVE",
      },
      orderBy: {
        viewCount: "desc",
      },
      take: 10,
      select: {
        id: true,
        newsHeading: true,
        newsPicture: true,
        newsLocation: true,
        viewCount: true,
        createdAt: true,
      },
    });

    return news;
  } catch (error) {
    console.error("Error fetching top viewed news:", error);
    return [];
  }
}


export default async function MostViewedNews() {
  const news = await getTopViewedNews();

  if (!news.length) {
    return null;
  }

  return (
    <section className="border-gray-200 rounded-md p-4 border">
      <h2 className="text-lg font-semibold mb-4 uppercase border-b pb-2">
        Most Viewed News
      </h2>

      <ul className="space-y-4">
        {news.map((item, index) => (
          <li key={item.id} className="flex gap-3">
            <span className="text-sm font-bold text-gray-400 w-5">
              {index + 1}.
            </span>

            <div className="flex-1">
              <Link
                href={`/newsDetails/${item.id}`}
                className="text-sm font-medium leading-snug hover:underline"
              >
                {item.newsHeading}
              </Link>

              <div className="text-xs text-gray-500 mt-1">
                {item.newsLocation && (
                  <span>{item.newsLocation} • </span>
                )}
                {item.viewCount ?? 0} views
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
