import { prisma } from "@/app/utils/db";
import { EmptyState } from "@/components/general/EmptyState";
import { NewsArticleCard } from "@/components/general/NewsArticleCard";
import { PaginationComponent } from "@/components/general/PaginationComponent";

// ---------------------- TYPES ----------------------
type Quote = {
  speakerInfo: string;
  text: string;
};

type Article = {
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
  newsReporter: any; // adjust if you have a proper reporter type
  newsArticleStatus: string;
};

// ---------------------- DATA FETCH ----------------------
async function getAllTechnologyArticles(
  page: number = 1,
  pageSize: number = 8
): Promise<{ articles: Article[]; totalPages: number }> {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { newsCategory: "TECHNOLOGY" },
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
    prisma.newsArticle.count({ where: { newsCategory: "TECHNOLOGY" } }),
  ]);

  return {
    articles: data,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

// ---------------------- COMPONENT ----------------------
export default async function AllTechnologyArticles({
  currentPage,
}: {
  currentPage: number;
}) {
  const { articles, totalPages } = await getAllTechnologyArticles(currentPage);

  return (
    <>
      {articles.length > 0 ? (
        <div className="flex flex-col gap-6 px-2">
         {articles.map((article) => (
  <NewsArticleCard
    key={article.id}
    article={{
      ...article,
      newsDetails: article.newsDetails ?? "",
      newsResource: article.newsResource ?? "",
      newsPictureHeading: article.newsPictureHeading ?? "",
      newsPictureCredit: article.newsPictureCredit ?? "",
    }}
  />
))}

        </div>
      ) : (
        <EmptyState
          title="Oops! Nothing to show yet."
          description="No technology articles have been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}

      <PaginationComponent totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
