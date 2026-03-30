"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MenuIcon, ChevronDown, X, Search, ExternalLink } from "lucide-react";
import CountryListLinks from "./CountryListLinks";
import FollowGEP from "./socialLinks ";

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
        className="mx-2 mt-1 w-7 h-7 flex flex-col justify-center gap-[3px] group cursor-pointer"
      >
        <span className="h-[2px] w-5 bg-primary dark:bg-primary transition-all group-hover:w-7"></span>
        <span className="h-[2px] w-3 bg-gray-800 dark:bg-gray-100 transition-all group-hover:w-5"></span>
        <span className="h-[2px] w-4 bg-gray-800 dark:bg-gray-100 transition-all group-hover:w-6"></span>
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
                bg-[url('/gb.png')]
                dark:bg-[url('/gw.png')]
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
          <h3 className="text-xl pl-2 py-0.5  font-extrabold uppercase tracking-wide my-3 border-l-8 border-primary">
            Spotlight
          </h3>

          {/* Special Link */}
          <Link
            href="/war"
            className="block rounded-lg cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold text-black dark:text-gray-100"
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
          {/* Footer links */}
          <div className="flex flex-col md:flex-wrap md:flex-row gap-4 mb-2 text-sm pl-4 font-semibold py-10 border-t mt-10">
            <div className="flex justify-start mb-6">
              <div
                className="
              w-[80px] h-[26px]
              bg-[url('/gb.png')]
              dark:bg-[url('/gw.png')]
              bg-cover bg-center
            "
              />
            </div>
            <Link
              href="https://www.souveral.com/terms-conditions"
              className="hover:underline text-foreground/90 text-sm flex flex-row"
              target="_blank"
            >
              Terms & Conditions <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
            <Link
              href="/about/editor"
              className="hover:underline text-foreground/90 text-sm "
            >
              Editorial Policy
            </Link>
            <Link
              href="https://www.souveral.com/privacy-policy"
              className="hover:underline text-foreground/90 text-sm flex flex-row"
              target="_blank"
            >
              Privacy Policy <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
            <Link
              href="https://www.souveral.com/cookie-policy"
              className="hover:underline text-foreground/90 text-sm flex flex-row"
              target="_blank"
            >
              Cookie Policy <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
            <Link
              href="/about/comment-policy"
              className="hover:underline text-foreground/90 text-sm"
            >
              Comment Policy
            </Link>

            <Link
              href="/about/advertise"
              className="hover:underline text-foreground/90 text-sm"
            >
              Advertise With Us
            </Link>
            <Link
              href="/about/advertise/standards-integrity"
              className="hover:underline text-foreground/90 text-sm"
            >
              Standards & Integrity
            </Link>
            <Link
              href="https://www.souveral.com/about"
              className="hover:underline text-foreground/90 text-sm flex flex-row"
              target="_blank"
            >
              About GEP <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </div>
          <div className="border-t">
            <CountryListLinks />
          </div>

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

            <FollowGEP />
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
