"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MenuIcon, ChevronDown, X, Search } from "lucide-react";
import CountryListLinks from "./CountryListLinks";

export default function DropDownMenuList() {
  const menuItems = [
    { label: "Latest Headlines", slug: "latest" },
    { label: "Politics & Power", slug: "politics" },
    { label: "Sports & Athletics", slug: "sports" },
    { label: "Education & Learning", slug: "education" },
    { label: "Health & Wellness", slug: "health" },
    { label: "Opinions & Analysis", slug: "opinion" },
    { label: "Crime & Public Safety", slug: "crime" },
    { label: "Technology & Innovation", slug: "technology" },
    { label: "Entertainment & Culture", slug: "entertainment" },
    { label: "Economy & Markets", slug: "economy" },
    { label: "Law & Justice", slug: "law-and-justice" },
    { label: "Environment & Climate", slug: "environment" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setShowArrow(
        el.scrollHeight > el.clientHeight &&
          el.scrollTop + el.clientHeight < el.scrollHeight,
      );
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="mx-2 mt-1 w-7 h-7 flex flex-col justify-center gap-[5px] group"
      >
        <span className="h-[2px] w-6 bg-gray-800 dark:bg-gray-100 transition-all group-hover:w-7"></span>
        <span className="h-[2px] w-4 bg-gray-800 dark:bg-gray-100 transition-all group-hover:w-6"></span>
        <span className="h-[2px] w-5 bg-gray-800 dark:bg-gray-100 transition-all group-hover:w-7"></span>
      </button>

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto transform transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Centered Container */}
        <div className="w-full max-w-7xl mx-auto p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div
              className="
                w-[70px] h-[32px]
                md:w-[80px] md:h-[40px]
                bg-[url('/lb.png')]
                dark:bg-[url('/lw.png')]
                bg-cover bg-center
              "
            />
          </Link>

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:text-primary"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-3 mb-4">
            <div className="flex items-center border border-primary rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search on GEP..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-3 py-2 outline-none bg-transparent text-sm"
              />
              <button
                onClick={handleSearch}
                className="bg-primary p-4 flex items-center justify-center"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Header */}
          <h3 className="text-sm pl-2 py-0.5 md:text-lg font-semibold uppercase tracking-wide bg-black text-white my-3 border-b">
            Highlights Of
          </h3>

          {/* Special Link */}
          <Link
            href="/war"
            className="block rounded-lg cursor-pointer border-l-8 border-primary p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold text-black dark:text-gray-100"
            onClick={() => setOpen(false)}
          >
            War & Crisis
          </Link>

          {/* Menu Grid */}
          <div
            ref={scrollRef}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4 max-h-[400px] overflow-y-auto"
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.slug}
                href={`/${item.slug}`}
                label={item.label}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>

          {/* Scroll Arrow */}
          {showArrow && (
            <div className="flex justify-center mt-2 text-gray-400 animate-bounce">
              <ChevronDown className="w-5 h-5" />
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
            <p className="mb-2">
              Advertise with us:{" "}
              <Link
                href="/about/advertise#advertiseForm"
                className="text-primary underline"
                onClick={() => setOpen(false)}
              >
                Form
              </Link>{" "}
              or{" "}
              <Link
                href="mailto:contact@globaleye.press"
                className="text-primary underline"
              >
                Email
              </Link>
            </p>

            <p className="mb-2">Follow GEP:</p>
            <div className="flex justify-center gap-3">
              <SocialIcon
                href="https://www.instagram.com/gepnews"
                img="/instagram.png"
                alt="Instagram"
              />
              <SocialIcon
                href="https://web.facebook.com/gepnews"
                img="/facebook.png"
                alt="Facebook"
              />
              <SocialIcon
                href="https://www.youtube.com/@globaleyepressofficial"
                img="/youtube.png"
                alt="YouTube"
              />
              <SocialIcon
                href="https://www.tiktok.com/@gepnews"
                img="/tiktokk.png"
                alt="TikTok"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ----------------- COMPONENTS ----------------- */

function MenuItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold text-black dark:text-gray-100"
    >
      {label}
    </Link>
  );
}

function SocialIcon({
  href,
  img,
  alt,
}: {
  href: string;
  img: string;
  alt: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={img} alt={alt} className="w-7 h-7 rounded-xs" />
    </a>
  );
}
