import { prisma } from "@/app/utils/db";
import { isJson } from "@/app/utils/isJson";
import { UltimateOne } from "@/components/allAdvertisement/UltimateOne";
import { EmptyState } from "@/components/general/EmptyState";
import { JsonToHtml } from "@/components/richTextEditor/JsonToHtml";
import Link from "next/link";

// ---------------------- TYPES ----------------------
export type Quote = {
  speakerInfo: string;
  text: string;
};

export type Reporter = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  reporterName: string | null;
  location: string;
  bio: string;
  profilePicture: string;
  phoneNumber: string;
  facebookProfileAddress: string | null;
  registered: boolean;
};

export type Article = {
  id: string;
  createdAt: Date;
  isFeatured: boolean;
  newsCategory: string;
  newsDetails: string | null;
  newsHeading: string;
  newsPicture: string;
  quotes: Quote[];
  newsResource: string | null;
  newsPictureHeading: string | null;
  newsPictureCredit: string | null;
  newsLocation: string | null;
  newsReporter: Reporter | null;
  newsArticleStatus: string;
};

// ---------------------- DATA FETCH ----------------------

// Get all active Italy articles (latest 9)
export async function getAllArticles(): Promise<Article[]> {
  return prisma.newsArticle.findMany({
    where: {
      newsArticleStatus: "ACTIVE",
      newsLocation: "Italy",
    },
    select: {
      id: true,
      createdAt: true,
      isFeatured: true,
      newsCategory: true,
      newsDetails: true,
      newsHeading: true,
      newsPicture: true,
      quotes: { select: { speakerInfo: true, text: true } },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: { createdAt: "desc" },
    take: 9,
  });
}

// Get last featured Italy article
export async function getLastFeaturedArticle(): Promise<Article | null> {
  return prisma.newsArticle.findFirst({
    where: {
      newsArticleStatus: "ACTIVE",
      isFeatured: true,
      newsLocation: "Italy",
    },
    select: {
      id: true,
      createdAt: true,
      isFeatured: true,
      newsCategory: true,
      newsDetails: true,
      newsHeading: true,
      newsPicture: true,
      quotes: { select: { speakerInfo: true, text: true } },
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

// ---------------------- COMPONENT ----------------------
export default async function ItalyNews() {
  const allArticles: Article[] = await getAllArticles();
  const lastFeaturedArticle: Article | null = await getLastFeaturedArticle();

  return (
    <>
      {/* Featured Italy Article */}
      {lastFeaturedArticle ? (
        <div className="mb-6 max-h-[320px] md:border-1 md:p-2">
          <Link href={`/newsDetails/${lastFeaturedArticle.id}`} className="mb-10">
            <div className="grid grid-cols-5">
              <div className="w-full max-h-[240px] md:max-h-[270px] border md:rounded-xl overflow-hidden col-span-5 md:col-span-3 mt-10 md:mt-0">
                <img
                  src={lastFeaturedArticle.newsPicture}
                  alt={lastFeaturedArticle.newsHeading}
                  width={500}
                  height={270}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pl-1 md:pl-4 col-span-5 md:col-span-2">
                <h2 className="text-lg md:text-2xl font-semibold mt-2 pl-2 md:pl-0">
                  {lastFeaturedArticle.newsHeading}
                </h2>
             {/*    {lastFeaturedArticle.newsDetails && isJson(lastFeaturedArticle.newsDetails) ? (
                  <div className="text-[14px] text-accent-foreground/80 mb-2 md:mt-2 line-clamp-3 pl-2 md:pl-0">
                    <JsonToHtml json={JSON.parse(lastFeaturedArticle.newsDetails)} />
                  </div>
                ) : (
                  <p className="text-[14px] text-accent-foreground/80 mb-2 md:mt-2 line-clamp-3 pl-2 md:pl-0">
                    {lastFeaturedArticle.newsDetails || ""}
                  </p>
                )} */}
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <EmptyState
          title="Oops! No featured article yet."
          description="Stay tuned for upcoming news from Italy."
          buttonText="Homepage"
          href="/"
        />
      )}

      {/* Advertisement Section */}
      <div className="px-2 md:px-0">
        <UltimateOne />
      </div>

      {/* All Italy Articles */}
      {allArticles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-6 px-2 border-y-1 md:border-1 my-10">
          {allArticles
            .filter((article: Article) => article.id !== lastFeaturedArticle?.id)
            .map((article: Article) => (
              <Link href={`/newsDetails/${article.id}`} key={article.id}>
                <div className="max-w-md w-full mx-auto my-1 sm:max-w-xs md:max-w-md lg:max-w-lg">
                  <div className="w-full h-[110px] md:h-[150px] border-1 rounded-xl overflow-hidden">
                    <img
                      src={article.newsPicture}
                      alt={article.newsHeading}
                      width={190}
                      height={140}
                      className="w-full h-full md:h-[150px] object-cover"
                    />
                  </div>
                  <div className="pt-4">
                    <h2 className="text-[15px] font-semibold leading-[1.5] px-1 font-stretch-extra-condensed">
                      {article.newsHeading}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <EmptyState
          title="Oops! No articles yet."
          description="Stay tuned for upcoming news from Italy."
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}
