"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function CountrySliderClient({ articles }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);

  const total = articles.length;

  // 👇 Detect which card is visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 280; // must match width below
      const index = Math.round(scrollLeft / cardWidth) + 1;
      setCurrent(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <section className="px-3 py-6">
      {/* Header with counter */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold tracking-tight"></h2>

        {/* Counter */}
        <div className="text-sm text-muted-foreground font-medium">
          {current} / {total}
        </div>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {articles.map((article: any, index: number) => (
          <Link
            key={article.id}
            href={`/newsDetails/${article.id}`}
            className="min-w-[260px] max-w-[260px] snap-start group"
          >
            <div className="relative rounded-xs overflow-hidden shadow-lg">
              {/* 🔥 Increased height */}
              <img
                src={article.newsPicture}
                alt={article.newsPictureHeading}
                className="w-full h-90 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Country */}
              <div className="absolute top-3 left-3 bg-red-700 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                {article.country}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-base font-semibold leading-snug line-clamp-4 group-hover:underline">
                  {article.newsHeading}
                </h3>

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
