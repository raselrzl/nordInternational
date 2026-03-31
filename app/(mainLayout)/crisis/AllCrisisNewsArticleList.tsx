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
  quotes: { speakerInfo: string; text: string }[];
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
};

async function getAllCrisisArticles(
  page: number = 1,
  pageSize: number = 8
): Promise<{ articles: Article[]; totalPages: number }> {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { newsCategory: "CRISIS" },
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
        quotes: { select: { speakerInfo: true, text: true } },
        newsResource: true,
        newsPictureHeading: true,
        newsPictureCredit: true,
        newsLocation: true,
        newsReporter: true,
        newsArticleStatus: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.newsArticle.count({ where: { newsCategory: "CRISIS" } }),
  ]);

  return {
    articles: data as Article[], // ✅ cast explicitly
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export default async function AllCrisisNewsArticleList({
  currentPage,
}: {
  currentPage: number;
}) {
  const { articles, totalPages } = await getAllCrisisArticles(currentPage);

  // ✅ Ensure TypeScript knows articles is Article[]
  const typedArticles: Article[] = articles;

  return (
    <>
      {typedArticles.length > 0 ? (
        <div className="flex flex-col gap-6 px-2">
          {typedArticles.map((article) => (
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
