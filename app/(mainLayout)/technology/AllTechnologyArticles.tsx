import { prisma } from "@/app/utils/db";
import { EmptyState } from "../../../components/general/EmptyState";
import { NewsArticleCard } from "../../../components/general/NewsArticleCard";
import { PaginationComponent } from "@/components/general/PaginationComponent";

async function getAllTechnologyArticles(
  page: number = 1,
  pageSize: number = 8
) {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { newsCategory: "TECHNOLOGY" },
      take: pageSize,
      skip: skip,
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
      where: { newsCategory: "TECHNOLOGY" },
    }),
  ]);

  return {
    articles: data,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

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
          {articles.map((article, index) => (
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
