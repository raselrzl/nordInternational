import { prisma } from "@/app/utils/db";
import { EmptyState } from "@/components/general/EmptyState";
import { NewsArticleCard } from "@/components/general/NewsArticleCard";
import { PaginationComponent } from "@/components/general/PaginationComponent";

async function getCountryNewsArticles(
  country: string,
  page: number = 1,
  pageSize: number = 9
) {
  const skip = (page - 1) * pageSize;

  const [articles, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: {
        newsArticleStatus: "ACTIVE",
        newsLocation: country as any,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
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
    }),
    prisma.newsArticle.count({
      where: {
        newsArticleStatus: "ACTIVE",
        newsLocation: country as any,
      },
    }),
  ]);

  return {
    articles,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export default async function CountryNewsList({
  country,
  currentPage,
}: {
  country: string;
  currentPage: number;
}) {
  const { articles, totalPages } = await getCountryNewsArticles(
    country,
    currentPage
  );

  return (
    <>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {articles.map((article) => (
            <NewsArticleCard key={article.id} article={article} />
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
