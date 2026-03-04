"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CompactTopNav() {
  const pathname = usePathname();

  const menuItems = [
   /*  { label: "Latest", slug: "latest" }, */
    { label: "Politics", slug: "politics" },
    { label: "Sports", slug: "sports" },
    { label: "Education", slug: "education" },
    { label: "Health", slug: "health" },
    { label: "Opinion", slug: "opinion" },
    { label: "Crime", slug: "crime" },
    { label: "Tech", slug: "technology" },
   /*  { label: "Culture", slug: "entertainment" }, */
    { label: "Economy", slug: "economy" },
   /*  { label: "Law", slug: "law-and-justice" }, */
   /*  { label: "Climate", slug: "environment" }, */
/*     { label: "War", slug: "war" }, */
  ];

  return (
    <nav className="hidden lg:flex w-full bg-white dark:bg-gray-900 text-[13px] font-semibold">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-end gap-x-4 overflow-x-auto whitespace-nowrap">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(`/${item.slug}`);

            return (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className={`transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}