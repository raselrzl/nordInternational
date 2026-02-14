import { prisma } from "@/app/utils/db";
import Link from "next/link";
import { isJson } from "@/app/utils/isJson";
import { JsonToHtml } from "@/components/richTextEditor/JsonToHtml";
import { CrimeAndPopularTab } from "./CrimeAndPopularTab";
import { PremiarTwo } from "../allAdvertisement/PremierTwo";
import { BesicOneAdvertise } from "../allAdvertisement/BesicOne";

type Article = {
  id: string;
  newsHeading: string;
  newsDetails: string;
  newsPicture: string;
  newsPictureHeading: string;
  createdAt: Date;
};

async function getLatestAsiaNews(): Promise<Article[]> {
  const articles = await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE", newsLocation: "Asia" },
    orderBy: { createdAt: "desc" },
    take: 3,
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

export default async function AsiaLatest() {
  const articles = await getLatestAsiaNews();

  if (articles.length === 0) return null;

  const featured = articles[0];
  const others = articles.slice(1);

  const leftArticles = others.slice(0, 6);
  return (
    <section className="px-2 md:px-0 my-20">
      <div className="flex justify-between text-xl w-[160px] md:my-16 my-8">
        <Link
          key="Asia"
          href="/diffrentCountry?country=Asia"
          className="flex items-center justify-center gap-2 p-1 transition-all 
                     hover:opacity-80 active:opacity-60 active:scale-95 rounded-xs"
        >
          <img
            src="/flags/asia.jpg"
            alt="ASIA flag"
            width={30}
            height={40} 
            className="rounded-sm border"
          />
          <span className="text-md font-bold uppercase">ASIA</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="overflow-hidden shadow-lg">
          <Link href={`/newsDetails/${featured.id}`}>
            <img
              src={featured.newsPicture}
              alt={featured.newsPictureHeading}
              className="w-full h-64 object-cover rounded-xl"
            />
          </Link>
          <div className="p-2">
            <Link href={`/newsDetails/${featured.id}`}>
              <h3 className="text-xl md:text-xl font-bold hover:underline mb-16">
                {featured.newsHeading}
              </h3>
            </Link>
            <BesicOneAdvertise />
          </div>
        </div>
        {/* ✅ Left side - 5 small cards */}
        <div className="flex flex-col gap-4">
          {leftArticles.map((article) => (
            <Link
              href={`/newsDetails/${article.id}`}
              key={article.id}
              className="flex flex-col items-center gap-3 group shadow-lg"
            >
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-80 h-60 object-cover rounded-xl"
              />
              <p className="font-semibold text-sm group-hover:underline line-clamp-3 px-10 py-4 text-center">
                {article.newsHeading}
              </p>
            </Link>
          ))}
        </div>

        {/* ✅ Right side - 5 small cards */}
        <div className="flex flex-col gap-4">
          <CrimeAndPopularTab />
        </div>
      </div>
    </section>
  );
}
