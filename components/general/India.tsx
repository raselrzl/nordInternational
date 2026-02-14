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

async function getIndiaNews(): Promise<Article[]> {
  const articles = await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE", newsLocation: "India" },
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

export default async function IndiaLatest() {
  const articles = await getIndiaNews();

  return (
    <section className="px-2">
      <div className="flex justify-between text-xl w-[160px] my-10">
        <Link
          href="/diffrentCountry?country=India"
           className="flex items-center justify-center gap-2 p-1 transition-all 
                     hover:opacity-80 active:opacity-60 active:scale-95 rounded-xs"
        >
          <img
            src="/flags/india.jpg"
            alt="India flag"
            width={30}
            height={40}
            className="rounded-sm border"
          />
          <span className="text-md font-bold uppercase">India</span>
        </Link>
      </div>

      <div className="flex flex-col gap-4 border p-2">
        {articles.map((article) => (
          <Link
            href={`/newsDetails/${article.id}`}
            key={article.id}
            className="flex items-center gap-3 group border-gray-950/10 pb-3"
          >
            <img
              src={article.newsPicture}
              alt={article.newsPictureHeading}
              className="w-24 h-20 object-cover rounded-xl"
            />
            <div>
              <p className="font-semibold text-sm group-hover:underline line-clamp-4">
                {article.newsHeading}
              </p>

            {/*   {isJson(article.newsDetails) ? (
                <div className="text-sm text-accent-foreground/80 mt-3 overflow-hidden line-clamp-1 md:line-clamp-2">
                  <JsonToHtml json={JSON.parse(article.newsDetails)} />
                </div>
              ) : (
                <p className="text-sm text-accent-foreground/80 mt-3 overflow-hidden  line-clamp-1 md:line-clamp-2">
                  {article.newsDetails}
                </p>
              )} */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
