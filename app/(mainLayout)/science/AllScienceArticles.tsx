import { prisma } from "@/app/utils/db";
import { EmptyState } from "../../../components/general/EmptyState";
import { NewsArticleCard } from "../../../components/general/NewsArticleCard";
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
  newsDetails: string;
  newsHeading: string;
  newsPicture: string;
  quotes: Quote[];
  newsResource: string;
  newsPictureHeading: string;
  newsPictureCredit: string;
  newsLocation: string | null;
  newsReporter: any;
  newsArticleStatus: string;
};

// ---------------------- DATA FETCH ----------------------
async function getAllScienceArticles(page: number = 1, pageSize: number = 8) {
  const skip = (page - 1) * pageSize;

  const [articles, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { newsCategory: "SCIENCE" },
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
    }),
    prisma.newsArticle.count({
      where: { newsCategory: "SCIENCE" },
    }),
  ]);

  return {
    articles,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

// ---------------------- COMPONENT ----------------------
export default async function AllScienceArticles({
  currentPage,
}: {
  currentPage: number;
}) {
  const { articles, totalPages } = await getAllScienceArticles(currentPage);

  return (
    <>
      {articles.length > 0 ? (
        <div className="flex flex-col gap-6 px-2">
          {articles.map((article: Article, index: number) => (
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
