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
  const [showBottom, setShowBottom] = useState(false);
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

  // Scroll listener to show at bottom
  useEffect(() => {
    function handleScroll() {
      setShowBottom(window.scrollY > 100);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const continentKeys = Object.keys(data);

  const RowContent = (
    <div className="flex md:gap-2 items-center justify-between md:justify-end">
      {continentKeys.map((continent, idx) => {
        // Determine dropdown position
        const dropdownClass =
          idx < 2
            ? "left-0" // first two → open to right
            : "right-0"; // last two → open to left

        return (
          <div key={continent} className="relative">
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

            {open === continent && (
              <div
                className={`absolute top-full mt-2 w-max min-w-[8rem] bg-white text-black shadow-lg z-50 ${dropdownClass}`}
              >
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
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                  >
                    {item.country}{" "}
                    <span className="text-[8px] text-gray-400">
                      ({item.totalNews})
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Normal position */}
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto text-xs md:text-sm border-r-8 py-1 border-black"
      >
        {RowContent}
      </div>

      {/* Fixed at bottom on scroll */}
      {showBottom && (
        <div className="text-xs md:text-sm max-w-7xl mx-auto fixed top-31 md:top-39 left-0 right-0 z-50 px-2 py-1 md:py-2 bg-orange-600 border-r-20 border-black">
          {RowContent}
        </div>
      )}
    </>
  );
}
