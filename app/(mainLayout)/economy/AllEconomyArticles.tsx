import { prisma } from "@/app/utils/db";
import { EmptyState } from "../../../components/general/EmptyState";
import { NewsArticleCard } from "../../../components/general/NewsArticleCard";
import { PaginationComponent } from "@/components/general/PaginationComponent";

// ✅ Define the Article type matching Prisma selection
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

// ✅ Map Prisma result to Article type
function mapPrismaArticle(a: any): Article {
  return {
    id: a.id,
    createdAt: a.createdAt,
    isFeatured: a.isFeatured,
    newsCategory: a.newsCategory,
    newsDetails: a.newsDetails,
    newsHeading: a.newsHeading,
    newsPicture: a.newsPicture,
    newsResource: a.newsResource,
    newsPictureHeading: a.newsPictureHeading,
    newsPictureCredit: a.newsPictureCredit,
    newsLocation: a.newsLocation ? String(a.newsLocation) : null,
    newsReporter: a.newsReporter,
    newsArticleStatus: a.newsArticleStatus,
    quotes: a.quotes || [],
  };
}

// ✅ Fetch all ECONOMY articles
async function getAllEconomyArticles(
  page: number = 1,
  pageSize: number = 8
): Promise<{ articles: Article[]; totalPages: number }> {
  const skip = (page - 1) * pageSize;

  const [dataRaw, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { newsCategory: "ECONOMY" },
      take: pageSize,
      skip,
      select: {
        id: true,
        createdAt: true,
        isFeatured: true,
        newsCategory: true,
        newsDetails: true,
        newsHeading: true,
        newsPicture: true,
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
        quotes: { select: { speakerInfo: true, text: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.newsArticle.count({
      where: { newsCategory: "ECONOMY" },
    }),
  ]);

  return {
    articles: dataRaw.map(mapPrismaArticle),
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

// ✅ Component
export default async function AllEconomyArticles({
  currentPage,
}: {
  currentPage: number;
}) {
  const { articles, totalPages } = await getAllEconomyArticles(currentPage);

  return (
    <>
      {articles.length > 0 ? (
        <div className="flex flex-col gap-6 px-2">
          {articles.map((article) => (
            <NewsArticleCard article={article} key={article.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Oops! Nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
      <PaginationComponent totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
