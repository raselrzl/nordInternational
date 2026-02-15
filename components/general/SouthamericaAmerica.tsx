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

async function getSouthamericaNews(): Promise<Article[]> {
  const articles = await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE", newsLocation: "Southamerica" },
    orderBy: { createdAt: "desc" },
    take: 2,
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

export default async function SouthamericaLatest() {
  const articles = await getSouthamericaNews();
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const others = articles.slice(1, 6);

  return (
    <section className="px-2">
      {/* Header */}
      <div className="flex justify-between text-xl w-[220px] my-10">
        <Link
          href="/diffrentCountry?country=Southamerica"
          className="flex items-center gap-2 p-1 transition-all 
                     hover:opacity-80 active:opacity-60 active:scale-95"
        >
          <img
            src="/flags/southamerica.jpg"
            alt="South America flag"
            width={30}
            height={40}
            className="rounded-sm border"
          />
          <span className="text-md font-bold uppercase">
            South America
          </span>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {/* -------- Featured Article -------- */}
        <Link
          href={`/newsDetails/${featured.id}`}
          className="block group"
        >
          <div className="overflow-hidden">
            <img
              src={featured.newsPicture}
              alt={featured.newsPictureHeading}
              className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <h3 className="font-black text-base md:text-lg leading-tight p-3 group-hover:underline line-clamp-3">
            {featured.newsHeading}
          </h3>
        </Link>

        {/* -------- Other Articles -------- */}
        <div className="flex flex-col divide-y">
          {others.map((article) => (
            <Link
              href={`/newsDetails/${article.id}`}
              key={article.id}
              className="flex gap-3 p-3 group items-center"
            >
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-20 h-16 object-cover rounded-md flex-shrink-0"
              />

              <p className="text-sm font-semibold leading-snug group-hover:underline line-clamp-3">
                {article.newsHeading}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

