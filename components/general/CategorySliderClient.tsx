"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function CategorySliderClient({ articles }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const total = articles.length;

  // Track visible card
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85; // 85% of container width
      const index = Math.round(scrollLeft / cardWidth) + 1;
      setCurrent(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="px-3 py-6">
      {/* Header with counter */}
  {/*     <div className="flex items-center justify-between mb-4 max-w-7xl mx-auto">
        <h2 className="text-lg font-bold tracking-tight">Latest News by Category</h2>
        <div className="text-sm text-muted-foreground font-medium">
          {current} / {total}
        </div>
      </div> */}

      {/* Slider */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory max-w-5xl mx-auto"
      >
        {articles.map((article: any) => (
          <Link
            key={article.id}
            href={`/newsDetails/${article.id}`}
            className="flex-shrink-0 w-[85%] md:w-full md:max-w-[800px] snap-center group"
          >
            <div className="relative rounded-md overflow-hidden shadow-lg">
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Category badge */}
              <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                {article.category.replace("_", " ")}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-base md:text-lg font-semibold leading-snug line-clamp-3 md:line-clamp-4 group-hover:underline">
                  {article.newsHeading}
                </h3>
                {article.newsSubHeading && (
                  <p className="text-xs md:text-sm opacity-80 mt-1 line-clamp-2 md:line-clamp-3">
                    {article.newsSubHeading}
                  </p>
                )}

                <div className="flex items-center gap-1 text-xs opacity-80 mt-2">
                  <Calendar size={13} />
                  {new Date(article.createdAt).toLocaleDateString("en-GB")}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}