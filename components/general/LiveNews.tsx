"use client";

import { motion } from "framer-motion";
import { getLatestNews } from "./homepageArticleList";

export default async function LiveNewsSection() {
  // Fetch latest 8 news headlines directly from Prisma
  const latestNews = await getLatestNews();

  const newsItems =
    latestNews && latestNews.length > 0
      ? latestNews.map((n) => n.newsHeading)
      : [
          "Government announces new economic reforms",
          "Major traffic updates across Dhaka city",
          "Bangladesh wins ODI series against India",
          "New healthcare initiative launched nationwide",
          "PM visits flood-affected regions",
          "Digital ID system rollout begins nationwide",
          "Stock market sees positive growth today",
          "National university exams postponed due to weather",
        ];

  return (
    <div className="flex items-start gap-6 relative py-6">
      {/* Left vertical line */}
      <div className="relative w-6">
        <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-red-600/60" />

        {/* Dots for each news headline */}
        {newsItems.map((_, index) => (
          <motion.span
            key={index}
            className="absolute left-[8px] w-3 h-3 rounded-full bg-red-600"
            style={{
              top: `${index * 45 + 40}px`, // vertical spacing between dots
            }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Right side content */}
      <div className="flex-1">
        {/* Blinking LIVE text */}
        <motion.h2
          className="text-red-600 font-bold text-xl tracking-widest mb-6"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          LIVE
        </motion.h2>

        {/* Headlines list */}
        <div className="flex flex-col gap-6">
          {newsItems.map((headline, index) => (
            <div
              key={index}
              className="text-base font-semibold text-foreground/90 flex items-center"
            >
              {headline}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
