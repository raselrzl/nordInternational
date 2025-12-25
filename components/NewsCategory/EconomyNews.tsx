import { prisma } from "@/app/utils/db";
import Link from "next/link";
import { EmptyState } from "../general/EmptyState";

export async function getEconomyNews() {
  return await prisma.newsArticle.findMany({
    where: { newsCategory: "ECONOMY" },
    select: {
      id: true,
      createdAt: true,
      isFeatured: true,
      newsCategory: true,
      newsDetails: true,
      newsHeading: true,
      newsPicture: true,
      quotes: {
        select: {
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
}
export async function EconomyNews() {
  const economy = await getEconomyNews();

  return (
    <>
      <div className="min-h-[450px] overflow-y-auto">
        {economy && economy.length > 0 ? (
          economy.slice(0, 10).map((item) => (
            <Link key={item.id} href={`/newsDetails/${item.id}`}>
              <div className="max-w-sm rounded-lg overflow-hidden border-b m-2 px-2 py-1 hover:bg-accent-foreground/5 transition-opacity">
                <div className="p-1 flex gap-3 items-start">
                  {/* Big circle dot */}
                  <span className="mt-2 w-3 h-3 rounded-full bg-black dark:bg-white flex-shrink-0"></span>

                  <h2 className="text-md text-accent-foreground font-semibold line-clamp-2">
                    {item.newsHeading}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <EmptyState
            title="Oops! There's nothing to show yet."
            description="Nothing has been added yet. Stay tuned!"
            buttonText="Homepage"
            href="/"
          />
        )}
      </div>
    </>
  );
}

