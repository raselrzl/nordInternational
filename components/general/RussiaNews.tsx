import { prisma } from "@/app/utils/db";
import Link from "next/link";
import { isJson } from "@/app/utils/isJson";
import { JsonToHtml } from "@/components/richTextEditor/JsonToHtml";
import { CrimeAndPopularTab } from "./CrimeAndPopularTab";

type Article = {
  id: string;
  newsHeading: string;
  newsDetails: string;
  newsPicture: string;
  newsPictureHeading: string;
  createdAt: Date;
};

async function getRussiaNews(): Promise<Article[]> {
  const articles = await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE", newsLocation: "Russia" },
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

export default async function RussiaLatest() {
  const articles = await getRussiaNews();
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const others = articles.slice(1);

  return (
    <section className="px-2">
      {/* Header */}
      <div className="flex items-center gap-2 my-6">
        <Link
          href="/diffrentCountry?country=Russia"
          className="flex items-center gap-2 hover:opacity-80"
        >
          <img
            src="/flags/russia.jpeg"
            alt="Russia flag"
            className="w-7 h-5 object-cover border rounded-sm"
          />
          <span className="text-lg font-bold uppercase">Russia</span>
        </Link>
      </div>

      {/* Featured Article */}
      <Link href={`/newsDetails/${featured.id}`} className="group block mb-5">
        <div className="relative h-52 rounded-xl overflow-hidden">
          <img
            src={featured.newsPicture}
            alt={featured.newsPictureHeading}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Title */}
          <div className="absolute bottom-0 p-3">
            <h2 className="text-white font-bold text-base leading-tight group-hover:underline line-clamp-3">
              {featured.newsHeading}
            </h2>
          </div>
        </div>
      </Link>

      {/* Other Articles */}
      <div className="flex flex-col gap-3">
        {others.map((article) => (
          <Link
            href={`/newsDetails/${article.id}`}
            key={article.id}
            className="flex gap-3 group border-b pb-3"
          >
            <img
              src={article.newsPicture}
              alt={article.newsPictureHeading}
              className="w-20 h-16 object-cover rounded-md flex-shrink-0"
            />
            <p className="font-semibold text-sm leading-snug line-clamp-2 group-hover:underline">
              {article.newsHeading}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

