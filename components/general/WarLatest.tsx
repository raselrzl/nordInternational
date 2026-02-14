import { prisma } from "@/app/utils/db";
import Link from "next/link";
import { isJson } from "@/app/utils/isJson";
import { JsonToHtml } from "@/components/richTextEditor/JsonToHtml";
import { BesicTwoAdvertise } from "../allAdvertisement/BesicTwo";

type Article = {
  id: string;
  newsHeading: string;
  newsDetails: string;
  newsPicture: string;
  newsPictureHeading: string;
  createdAt: Date;
};

async function getLatestWarNews(): Promise<Article[]> {
  const articles = await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE", newsCategory: "WAR" },
    orderBy: { createdAt: "desc" },
    take: 7,
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
  const articles = await getLatestWarNews();

  if (articles.length === 0) return null;

  const featured = articles[0];
  const others = articles.slice(1);

  const leftArticles = others.slice(0, 3);
  const rightArticles = others.slice(3, 6);

  return (
    <section className="px-2 md:px-0 my-10">
      <div className="flex items-center justify-between px-4 md:px-0 my-10 md:my-16">
        <h2 className="flex items-center gap-2 text-lg md:text-xl font-extrabold uppercase border-l-8 pl-2 border-primary">
          
          War & Crisis
        </h2>

        <Link
          href="/war"
          className="text-xs font-semibold"
        >
        More ➠
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ✅ Left side - 5 small cards */}
        <div className="flex flex-col gap-4">
          {leftArticles.map((article) => (
            <Link
              href={`/newsDetails/${article.id}`}
              key={article.id}
              className="flex items-center gap-3 group border-t border-gray-950/10"
            >
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-24 h-20 md:h-32 md:w-32 object-cover rounded-md"
              />
              <p className="text-md group-hover:underline line-clamp-4">
                {article.newsHeading}
              </p>
            </Link>
          ))}
        </div>

        {/* ✅ Middle featured article */}
        <div className="overflow-hidden border">
           <Link href={`/newsDetails/${featured.id}`}>
              <h3 className="text-xl md:text-xl font-bold hover:underline text-center  mb-10 pt-3">
                {featured.newsHeading}
              </h3>
            </Link>
          <Link href={`/newsDetails/${featured.id}`}>
            <img
              src={featured.newsPicture}
              alt={featured.newsPictureHeading}
              className="w-full h-80 object-cover"
            />
          </Link>
        </div>

        {/* ✅ Right side - 5 small cards */}
        <div className="flex flex-col gap-4">
          {rightArticles.map((article) => (
            <Link
              href={`/newsDetails/${article.id}`}
              key={article.id}
              className="flex items-center gap-3 group border-t border-gray-950/10"
            >
              <p className="text-md group-hover:underline line-clamp-2">
                {article.newsHeading}
              </p>
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-24 h-20 object-cover rounded-md md:h-32 md:w-32"
              />
            </Link>
          ))}
        </div>
      </div>
       
    </section>
  );
}
