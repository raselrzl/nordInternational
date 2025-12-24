"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type CountryItem = {
  country: string;
  totalNews: number;
};

type Props = {
  data: Record<string, CountryItem[]>;
};

export default function ContinentDropdownRow({ data }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto text-sm md:text-sm px-2 border-r-8 border-black">
      {/* Row of Continents */}
      <div className="flex gap-2 items-center justify-between md:justify-end">
        {Object.keys(data).map((continent) => (
          <div key={continent} className="relative">
            {/* Continent label with chevron */}
            <div
              className="flex items-center cursor-pointer hover:text-primary select-none"
              onClick={() => setOpen(open === continent ? null : continent)}
            >
              <span className="font-semibold">{continent}</span>
              <ChevronDown
                className={`w-2 h-2 transition-transform duration-200 ${
                  open === continent ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown of countries */}
            {open === continent && (
              <div className="absolute top-full left-0 mt-2 w-36 bg-white text-black shadow-lg z-50">
                {data[continent].length === 0 && (
                  <p className="px-4 py-2 text-sm text-gray-400">
                    No news available
                  </p>
                )}

                {data[continent].map((item) => (
                  <Link
                    key={item.country}
                    href={`/diffrentCountry?country=${item.country}`}
                    onClick={() => setOpen(null)}
                    className="block px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    {item.country}{" "}
                    <span className="text-xs text-gray-400">
                      ({item.totalNews})
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
