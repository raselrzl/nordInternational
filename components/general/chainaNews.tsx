import { prisma } from "@/app/utils/db";
import Link from "next/link";

type Article = {
  id: string;
  newsHeading: string;
  newsDetails: string;
  newsPicture: string;
  newsPictureHeading: string;
  createdAt: Date;
};

async function getLatestChainaNews(): Promise<Article[]> {
  const articles = await prisma.newsArticle.findMany({
    where: {
      newsArticleStatus: "ACTIVE",
      newsLocation: "Chaina", // change to "China" if DB uses correct spelling
    },
    orderBy: { createdAt: "desc" },
    take: 3, // ✅ only 3 latest
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

export default async function ChainaLatest() {
  const articles = await getLatestChainaNews();

  if (articles.length === 0) return null;

  return (
    <section className="px-2 md:px-0 my-10 md:my-24">
      {/* Header */}
      <div className="flex justify-between text-xl w-[160px] my-10 md:my-16">
        <Link
          href="/diffrentCountry?country=Chaina"
          className="flex items-center justify-center gap-2 p-1 transition-all 
                     hover:opacity-80 active:opacity-60 active:scale-95 rounded-xs"
        >
          <img
            src="/flags/chaina.jpg"
            alt="Chaina flag"
            width={30}
            height={40}
            className="rounded-sm border"
          />
          <span className="text-md font-bold uppercase">Chaina</span>
        </Link>
      </div>

      {/* 3 Latest News — Same Size */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="overflow-hidden border rounded-md hover:shadow-md transition"
          >
            <Link href={`/newsDetails/${article.id}`}>
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-full h-56 md:h-64 object-cover"
              />
            </Link>

            <div className="p-2">
              <Link href={`/newsDetails/${article.id}`}>
                <h3 className="text-lg font-bold hover:underline line-clamp-2">
                  {article.newsHeading}
                </h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
