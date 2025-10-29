import { prisma } from "@/app/utils/db";
import { EmptyState } from "../../../components/general/EmptyState";
import { NewsArticleCard } from "../../../components/general/NewsArticleCard";
import { PaginationComponent } from "@/components/general/PaginationComponent";

// ✅ Article type
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
  newsReporter: any; // adjust if you have a proper type
  newsArticleStatus: string;
};

// ✅ Fetch opinion articles with pagination
async function getAllOpinionArticles(
  page: number = 1,
  pageSize: number = 8
): Promise<{ articles: Article[]; totalPages: number }> {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { newsCategory: "OPINION" },
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
    prisma.newsArticle.count({
      where: { newsCategory: "OPINION" },
    }),
  ]);

  return {
    articles: data,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export default async function AllOpinionArticles({
  currentPage,
}: {
  currentPage: number;
}) {
  const { articles, totalPages } = await getAllOpinionArticles(currentPage);

  return (
    <>
      {articles.length > 0 ? (
        <div className="flex flex-col gap-6 px-2">
          {articles.map((article: Article, index) => (
            <NewsArticleCard article={article} key={index} />
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
