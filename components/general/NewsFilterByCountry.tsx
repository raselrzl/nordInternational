import { prisma } from "@/app/utils/db";
import { UltimateOne } from "@/components/allAdvertisement/UltimateOne";
import { EmptyState } from "@/components/general/EmptyState";
import { NewsCountry } from "@prisma/client";
import { Compass, Globe } from "lucide-react";
import Link from "next/link";

// ✅ Props (IMPORTANT)
type Props = {
  country: NewsCountry;
};

// ✅ Article type (match select)
type Article = {
  id: string;
  createdAt: Date;
  isFeatured: boolean;
  newsCategory: string;
  newsDetails: string;
  newsHeading: string;
  newsPicture: string;
  quotes: {
    speakerInfo: string;
    text: string;
  }[];
  newsResource: string;
  newsPictureHeading: string;
  newsPictureCredit: string;
  newsLocation: NewsCountry | null;
  newsReporter: any;
  newsArticleStatus: string;
};

// ✅ Get all articles (FIXED TYPE)
async function getAllArticles(country: NewsCountry): Promise<Article[]> {
  return prisma.newsArticle.findMany({
    where: {
      newsArticleStatus: "ACTIVE",
      newsLocation: country,
    },
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
    orderBy: { createdAt: "desc" },
    take: 13,
  });
}

// ✅ Get featured article
async function getLastFeaturedArticle(
  country: NewsCountry,
): Promise<Article | null> {
  return prisma.newsArticle.findFirst({
    where: {
      newsArticleStatus: "ACTIVE",
      isFeatured: true,
      newsLocation: country,
    },
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
    orderBy: { createdAt: "desc" },
  });
}

// ✅ MAIN COMPONENT (FIXED)
export default async function NewsByCountry({ country }: Props) {
  const allArticles = await getAllArticles(country);
  const lastFeaturedArticle = await getLastFeaturedArticle(country);

  return (
    <>
      {/* Featured */}
      <h1 className="flex items-center justify-between gap-2 text-xl md:text-2xl font-bold tracking-tight uppercase bg-black pl-3 pr-4 py-2 text-white">
        {country}
        <span className="text-gray-300 text-sm md:text-base font-medium">
          Featured
        </span>
      </h1>
      {lastFeaturedArticle ? (
        <div className="mb-6 md:border md:p-3">
          <Link
            href={`/newsDetails/${lastFeaturedArticle.id}`}
            className="group"
          >
            {/* Image Wrapper */}
            <div className="relative w-full h-[240px] md:h-[380px] border md:rounded-xl overflow-hidden">
              {/* Image */}
              <img
                src={lastFeaturedArticle.newsPicture}
                alt="picture"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* 🔥 Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            {/* Heading */}
            <div className="mt-3 px-1 md:px-2">
              <h2 className="text-lg md:text-2xl font-semibold leading-snug">
                {lastFeaturedArticle.newsHeading}
              </h2>
            </div>
          </Link>
        </div>
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="No featured article available yet."
          buttonText="Homepage"
          href="/"
        />
      )}

      {/* Ad */}
      {/*   <div className="px-2 md:px-0">
        <UltimateOne />
      </div> */}

      {/* List */}
      {allArticles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-6 px-2 border-y md:border my-10">
          {allArticles
            .filter((a) => a.id !== lastFeaturedArticle?.id)
            .map((article) => (
              <Link href={`/newsDetails/${article.id}`} key={article.id}>
                <div className="w-full mx-auto">
                  <div className="h-[110px] md:h-[150px] border rounded-xl overflow-hidden">
                    <img
                      src={article.newsPicture}
                      alt="picture"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="pt-2">
                    <h2 className="text-[14px] md:text-[15px] font-semibold leading-snug px-1">
                      {article.newsHeading}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="No article available yet."
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}
