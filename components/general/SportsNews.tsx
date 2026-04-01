import Link from "next/link";
import { prisma } from "@/app/utils/db";

type Article = {
  id: string;
  newsHeading: string;
  newsSubHeading?: string | null;
  newsPicture: string;
  createdAt: Date;
};

export default async function SportsNews() {
  const sportsNews: Article[] = await prisma.newsArticle.findMany({
    where: {
      newsCategory: "SPORTS",
      newsArticleStatus: "ACTIVE",
    },
    orderBy: { createdAt: "desc" },
    take: 2,
  });

  if (!sportsNews.length) {
    return <p className="text-center py-10">No sports news available.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {sportsNews.map((article) => (
        <Link key={article.id} href={`/newsDetails/${article.id}`} className="block">
          
          <div className="relative w-full overflow-hidden md:rounded-xl shadow-lg">
            
            {/* Image */}
            <img
              src={article.newsPicture}
              alt={article.newsHeading}
              className="w-full h-64 md:h-96 object-cover"
            />

            {/* Category Tag */}
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs md:text-sm px-3 py-1 rounded-md shadow-md">
              Sports
            </span>

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
              
              <h2 className="text-white text-lg md:text-2xl font-bold line-clamp-2">
                {article.newsHeading}
              </h2>

              {article.newsSubHeading && (
                <p className="text-gray-200 text-sm md:text-base mt-1 line-clamp-3">
                  {article.newsSubHeading}
                </p>
              )}

            </div>
          </div>

        </Link>
      ))}

    </div>
  );
}