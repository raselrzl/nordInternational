import Link from "next/link";
import { prisma } from "@/app/utils/db";
import { ChevronRight } from "lucide-react";

async function getLatestOpinions() {
  return await prisma.newsArticle.findMany({
    where: {
      newsCategory: "OPINION",
      newsArticleStatus: "ACTIVE",
    },
    take: 4,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      newsHeading: true,
      newsPicture: true,
      newsReporterPublicName: true,
    },
  });
}

export default async function LatestOpinions() {
  const opinions = await getLatestOpinions();

  if (!opinions || opinions.length === 0) return null;

  return (
    <section className="md:rounded-xs dark:bg-gray-600">
      {/* Header */}
      <div className="flex justify-between text-xl w-full my-10">
        <h1 className="font-bold py-1 flex border-l-8 border-primary pl-2 uppercase">
          OPINIONS & Analysis
        </h1>
        <ChevronRight className="block md:hidden mt-1" />
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-1 gap-2 px-2 md:px-0">
        {opinions.map((item) => (
          <Link
            key={item.id}
            href={`/newsDetails/${item.id}`}
            className="block relative border-l-4 border-primary pl-4 bg-accent-foreground/5 p-3 md:p-4 min-h-[120px] shadow-sm hover:shadow-md hover:border-primary/70 transition-all duration-300"
          >
            {/* Heading replaces quote */}
            <p className="mb-8 md:mb-10 text-[14px] font-medium text-gray-800 dark:text-gray-100 line-clamp-3">
              {item.newsHeading}
            </p>

            {/* Bottom right (same style) */}
            <div className="absolute bottom-3 right-4 flex items-center gap-3">
              {item.newsPicture && (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary">
                  <img
                    src={item.newsPicture}
                    alt={item.newsHeading}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <p className="text-xs text-accent-foreground/80 font-medium">
                — {item.newsReporterPublicName || "Anonymous"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory">
        {opinions.map((item) => (
          <Link
            key={item.id}
            href={`/newsDetails/${item.id}`}
            className="flex-shrink-0 w-80 snap-center relative border-l-4 border-primary pl-4 bg-accent-foreground/5 p-4 min-h-[140px] shadow-sm hover:shadow-md hover:border-primary/70 transition-all duration-300"
          >
            {/* Heading */}
            <p className="mb-10 text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-3">
              {item.newsHeading}
            </p>

            {/* Bottom */}
            <div className="absolute bottom-3 right-4 flex items-center gap-3">
              {item.newsPicture && (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary">
                  <img
                    src={item.newsPicture}
                    alt={item.newsHeading}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <p className="text-xs text-accent-foreground/80 font-medium">
                — {item.newsReporterPublicName || "Anonymous"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}