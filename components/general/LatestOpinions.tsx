import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/app/utils/db";
import { ChevronRight, Newspaper } from "lucide-react";

async function getLatestOpinions() {
  // Fetch latest 6-8 articles to ensure we can always show 4 with quotes
  const articles = await prisma.newsArticle.findMany({
    where: { newsCategory: "OPINION" },
    take: 8,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      newsPicture: true,
      quotes: {
        select: {
          text: true,
          speakerInfo: true,
        },
      },
    },
  });
  return articles;
}

export default async function LatestOpinions() {
  const allArticles = await getLatestOpinions();

  // Include articles that have at least one quote
  const opinions = allArticles
    .filter(
      (item) =>
        item.quotes && item.quotes.length > 0 && item.quotes.some((q) => q.text)
    )
    .slice(0, 4); // Take first 4 valid articles

  if (!opinions || opinions.length === 0) return null;

  return (
    <section className="md:rounded-xs dark:bg-gray-600">
      {/* Section Header */}
      <div className="flex justify-between text-xl w-full bg-black text-orange-600">
        <h1 className="font-bold py-1 flex">
          <Newspaper className="mr-4" /> OPINIONS
        </h1>
        <ChevronRight className="block md:hidden" />
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 gap-2 px-2 md:px-0">
        {opinions.map((item) => {
          const firstQuote = item.quotes.find((q) => q.text) || {
            text: "No quote available",
            speakerInfo: "Unknown",
          };
          return (
            <Link
              key={item.id}
              href={`/newsDetails/${item.id}`}
              className="block relative border-l-4 border-primary pl-4 bg-accent-foreground/5 p-2 md:p-4 min-h-[120px] shadow-sm hover:shadow-md hover:border-primary/70 transition-all duration-300"
            >
              <p className="italic mb-7 md:mb-10 text-[13px] text-justify">
                “{firstQuote.text}”
              </p>
              <div className="absolute bottom-3 right-4 flex items-center gap-3">
                {item.newsPicture && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-primary">
                    <img
                      src={item.newsPicture}
                      alt={firstQuote.speakerInfo || "Speaker"}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <p className="text-xs text-accent-foreground/80 font-medium">
                  — {firstQuote.speakerInfo || "Unknown"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory">
        {opinions.map((item) => {
          const firstQuote = item.quotes.find((q) => q.text) || {
            text: "No quote available",
            speakerInfo: "Unknown",
          };
          return (
            <Link
              key={item.id}
              href={`/newsDetails/${item.id}`}
              className="flex-shrink-0 w-80 snap-center relative border-l-4 border-primary pl-4 bg-accent-foreground/5 p-4 min-h-[140px] shadow-sm hover:shadow-md hover:border-primary/70 transition-all duration-300"
            >
              <p className="italic mb-8 text-sm text-justify text-gray-800">
                “{firstQuote.text}”
              </p>
              <div className="absolute bottom-3 right-4 flex items-center gap-3">
                {item.newsPicture && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-primary">
                    <img
                      src={item.newsPicture}
                      alt={firstQuote.speakerInfo || "Speaker"}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <p className="text-xs text-accent-foreground/80 font-medium">
                  — {firstQuote.speakerInfo || "Unknown"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
