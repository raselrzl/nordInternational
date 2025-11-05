import { prisma } from "@/app/utils/db";
import Link from "next/link";
import { isJson } from "@/app/utils/isJson";
import { JsonToHtml } from "@/components/richTextEditor/JsonToHtml";

type Article = {
  id: string;
  newsHeading: string;
  newsDetails: string;
  newsPicture: string;
  newsPictureHeading: string;
  createdAt: Date;
};

// ✅ Fetch 11 latest CRIME news
async function getLatestCrimeNews(): Promise<Article[]> {
  const articles = await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE", newsCategory: "CRIME" },
    orderBy: { createdAt: "desc" },
    take: 11,
    select: {
      id: true,
      newsHeading: true,
      newsDetails: true,
      newsPicture: true,
      newsPictureHeading: true,
      createdAt: true,
    },
  });
  return articles;
}

export default async function WarLatest() {
  const articles = await getLatestCrimeNews();

  if (articles.length === 0) return null;

  // ✅ Middle one (latest) = featured
  const featured = articles[0];
  const others = articles.slice(1);

  // ✅ Exactly 5 on left and 5 on right (if available)
  const leftArticles = others.slice(0, 5);
  const rightArticles = others.slice(5, 10);

  return (
    <section className="px-2 md:px-0 my-10">
      <h2 className="text-xl font-extrabold mb-4 flex items-center">
        WAR Updates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ✅ Left side - 5 small cards */}
        <div className="flex flex-col gap-4">
          {leftArticles.map((article) => (
            <Link
              href={`/newsDetails/${article.id}`}
              key={article.id}
              className="flex items-center gap-3 group"
            >
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-24 h-20 object-cover rounded-md"
              />
              <p className="font-semibold text-md group-hover:underline line-clamp-3">
                {article.newsHeading}
              </p>
            </Link>
          ))}
        </div>

        {/* ✅ Middle featured article */}
        <div className="overflow-hidden md:border-l md:border-r md:px-2">
          <Link href={`/newsDetails/${featured.id}`}>
            <img
              src={featured.newsPicture}
              alt={featured.newsPictureHeading}
              className="w-full h-64 object-cover"
            />
          </Link>
          <div className="p-2">
            <Link href={`/newsDetails/${featured.id}`}>
              <h3 className="text-lg md:text-2xl font-bold hover:underline">
                {featured.newsHeading}
              </h3>
            </Link>

            {/* ✅ JSON parse condition (from your example) */}
            {isJson(featured.newsDetails) ? (
              <div className="text-sm md:text-md text-accent-foreground/80 mt-2 line-clamp-3">
                <JsonToHtml json={JSON.parse(featured.newsDetails)} />
              </div>
            ) : (
              <p className="text-sm md:text-md text-accent-foreground/80 mt-2 line-clamp-3">
                {featured.newsDetails}
              </p>
            )}
          </div>
        </div>

        {/* ✅ Right side - 5 small cards */}
        <div className="flex flex-col gap-4">
          {rightArticles.map((article) => (
            <Link
              href={`/newsDetails/${article.id}`}
              key={article.id}
              className="flex items-center gap-3 group"
            >
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-24 h-20 object-cover rounded-md"
              />
              <p className="font-semibold text-md group-hover:underline line-clamp-2">
                {article.newsHeading}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
