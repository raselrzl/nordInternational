import Link from "next/link";
import { searchNewsLimited } from "./searchNews";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";

  const results = await searchNewsLimited(query);

  return (
    <div className="max-w-7xl mx-auto px-2 py-6">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: "{query}"
      </h1>

      {query === "" && (
        <p className="text-gray-500">No search keyword provided.</p>
      )}

      {query !== "" && results.length === 0 && (
        <p className="text-gray-500">No news found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((article) => (
          <Link
            key={article.id}
            href={`/newsDetails/${article.id}`}
            className="group border rounded-xl overflow-hidden hover:shadow-md transition"
          >
            <img
              src={article.newsPicture || "/n2.png"}
              alt={article.newsHeading}
              className="w-full h-40 object-cover"
            />

            <div className="p-3">
              <p className="font-semibold text-sm line-clamp-3 group-hover:underline">
                {article.newsHeading}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {article.newsLocation}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
