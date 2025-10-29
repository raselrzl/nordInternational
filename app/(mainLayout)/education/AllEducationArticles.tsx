import { prisma } from "@/app/utils/db";
import { EmptyState } from "../../../components/general/EmptyState";
import { NewsArticleCard } from "../../../components/general/NewsArticleCard";
import { PaginationComponent } from "@/components/general/PaginationComponent";

// ✅ Define the Article type
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

// ✅ Fetch EDUCATION articles
async function getAllEducationArticles(
  page: number = 1,
  pageSize: number = 8
): Promise<{ articles: Article[]; totalPages: number }> {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { newsCategory: "EDUCATION" },
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
    }),
    prisma.newsArticle.count({ where: { newsCategory: "EDUCATION" } }),
  ]);

  return {
    articles: data as Article[],
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

// ✅ Component
export default async function AllEducationArticles({
  currentPage,
}: {
  currentPage: number;
}) {
  const { articles, totalPages } = await getAllEducationArticles(currentPage);

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
