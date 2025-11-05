import { prisma } from "@/app/utils/db";
import { isJson } from "@/app/utils/isJson";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import { UltimateOne } from "@/components/allAdvertisement/UltimateOne";
import { EmptyState } from "@/components/general/EmptyState";
import { JsonToHtml } from "@/components/richTextEditor/JsonToHtml";
import Link from "next/link";

// ✅ Article type
type Article = {
  id: string;
  createdAt: Date;
  isFeatured: boolean;
  newsCategory: string;
  newsDetails: string;
  newsHeading: string;
  newsPicture: string;
  newsResource: string;
  newsPictureHeading: string;
  newsPictureCredit: string;
  newsLocation: string | null;
  newsReporter: {
    id: string;
    reporterName: string | null;
    location: string;
    bio: string;
    profilePicture: string;
    phoneNumber: string;
    facebookProfileAddress: string | null;
    registered: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };
  newsArticleStatus: string;
  quotes: { speakerInfo: string; text: string }[];
};

// ✅ Fetch all ACTIVE Germany articles
export async function getAllArticles(): Promise<Article[]> {
  const data = await prisma.newsArticle.findMany({
    where: {
      newsArticleStatus: "ACTIVE",
      newsLocation: "Germany",
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
      newsReporter: {
        select: {
          id: true,
          reporterName: true,
          location: true,
          bio: true,
          profilePicture: true,
          phoneNumber: true,
          facebookProfileAddress: true,
          registered: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
        },
      },
      newsArticleStatus: true,
    },
    orderBy: { createdAt: "desc" },
    take: 9,
  });

  return data as Article[];
}

// ✅ Fetch last featured Germany article
export async function getLastFeaturedArticle(): Promise<Article | null> {
  const article = await prisma.newsArticle.findFirst({
    where: {
      newsArticleStatus: "ACTIVE",
      isFeatured: true,
      newsLocation: "Germany",
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
      newsReporter: {
        select: {
          id: true,
          reporterName: true,
          location: true,
          bio: true,
          profilePicture: true,
          phoneNumber: true,
          facebookProfileAddress: true,
          registered: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
        },
      },
      newsArticleStatus: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return article as Article | null;
}

// ✅ Component
export default async function GermanyNews() {
  const allArticles = await getAllArticles();
  const lastFeaturedArticle = await getLastFeaturedArticle();

  return (
    <>
      {/* Featured Germany article */}
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
                  className="w-full h-full object-fit"
                />
              </div>
              <div className="pl-1 md:pl-4 col-span-5 md:col-span-2">
                <h2 className="text-lg md:text-2xl font-semibold mt-2 pl-2 md:pl-0">
                  {lastFeaturedArticle.newsHeading}
                  
                </h2>
                {isJson(lastFeaturedArticle.newsDetails) ? (
                  <div className="text-[14px] text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2 md:p">
                    <JsonToHtml json={JSON.parse(lastFeaturedArticle.newsDetails)} />
                  </div>
                ) : (
                  <p className="text-[14px] text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2 md:p">
                    {lastFeaturedArticle.newsDetails}
                  </p>
                )}
              </div>
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

      <div className="px-2 md:px-0">
        <UltimateOne />
      </div>

      {/* All Germany articles */}
      {allArticles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-6 px-2 border-y-1 md:border-1 my-10">
          {allArticles
            .filter((a) => a.id !== lastFeaturedArticle?.id)
            .map((article) => (
              <Link href={`/newsDetails/${article.id}`} key={article.id}>
                <div className="max-w-md w-full mx-auto my-1 sm:max-w-xs md:max-w-md lg:max-w-lg">
                  <div className="w-auto h-[110px] md:h-[150px] border-1 rounded-xl overflow-hidden">
                    <img
                      src={article.newsPicture}
                      alt={article.newsHeading}
                      width={190}
                      height={140}
                      className="w-full h-full md:h-[150px] object-fit"
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
          title="Oops! There's nothing to show yet."
          description="No article available yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}
