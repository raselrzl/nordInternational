import { prisma } from "@/app/utils/db";
import Link from "next/link";
import React from "react";

export default async function NewsTicker() {
  const latestFive = await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE" },
    select: { id: true, newsHeading: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Fallback message if no news
  const fallbackMessage = "Nothing available right now";

  // Determine items to show (news headlines or fallback message)
  const itemsToShow = latestFive.length
    ? latestFive
    : [{ id: "fallback", newsHeading: fallbackMessage }];

  return (
    <div className="overflow-hidden bg-primary text-white font-bold py-1">
      <div
        className="flex gap-10 whitespace-nowrap [will-change:transform] animate-ticker"
        style={{ ["--ticker-speed" as any]: "20s" }}
        aria-label="Latest headlines"
      >
        {itemsToShow.map((item) =>
          latestFive.length ? (
            <Link key={`A-${item.id}`} href={`/newsDetails/${item.id}`} className="hover:underline">
              {item.newsHeading}
            </Link>
          ) : (
            <span key={item.id}>{item.newsHeading}</span>
          )
        )}
        {itemsToShow.map((item) =>
          latestFive.length ? (
            <span key={`B-${item.id}`} aria-hidden="true">
              {item.newsHeading}
            </span>
          ) : (
            <span key={`fallback-copy-${item.id}`} aria-hidden="true">
              {item.newsHeading}
            </span>
          )
        )}
      </div>
    </div>
  );
}
