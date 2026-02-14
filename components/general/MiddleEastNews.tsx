import { prisma } from "@/app/utils/db";
import Link from "next/link";
import { BesicOneAdvertise } from "../allAdvertisement/BesicOne";

type Article = {
  id: string;
  newsHeading: string;
  newsDetails: string;
  newsPicture: string;
  newsPictureHeading: string;
  createdAt: Date;
};

async function getLatestMiddleeastNews(): Promise<Article[]> {
  const articles = await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE", newsLocation:"Middleeast"},
    orderBy: { createdAt: "desc" },
    take: 5,
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
export default async function MiddleeastLatest() {
  const articles = await getLatestMiddleeastNews();
  if (articles.length === 0) return null;

  const featured = articles[0];
  const others = articles.slice(1); // 5 articles

  return (
    <section className="px-2 md:px-0 my-10">
      {/* Section Header */}
      <div className="flex items-center gap-2 my-6 md:my-10">
        <Link
          href="/diffrentCountry?country=Middleeast"
          className="flex items-center gap-2 hover:opacity-80"
        >
          <img
            src="/flags/middleeast.webp"
            alt="Middleeast"
            className="w-7 h-5 object-cover border rounded-sm"
          />
          <span className="text-lg font-bold uppercase">Middleeast</span>
        </Link>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 🔥 Featured (Big) */}
        <div className="md:col-span-2 relative group">
          <Link href={`/newsDetails/${featured.id}`}>
            <div className="relative h-72 md:h-[420px] overflow-hidden">
              <img
                src={featured.newsPicture}
                alt={featured.newsPictureHeading}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-0 p-4">
                <h2 className="text-white text-xl md:text-3xl font-bold leading-tight group-hover:underline">
                  {featured.newsHeading}
                </h2>
              </div>
            </div>
          </Link>
        </div>

        {/* 📰 Other 5 news */}
        <div className="flex flex-col gap-4">
          {others.map((article) => (
            <Link
              href={`/newsDetails/${article.id}`}
              key={article.id}
              className="flex gap-3 group"
            >
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-26 h-23 object-cover flex-shrink-0"
              />
              <p className="text-sm md:text-base leading-snug group-hover:underline">
                {article.newsHeading}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <BesicOneAdvertise />
      </div>
    </section>
  );
}

