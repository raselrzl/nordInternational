"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuIcon, ChevronDown } from "lucide-react";

export default function DropDownMenuList() {
  /*  const menuItems = [
    "National",
    "Politics",
    "Country",
    "International",
    "Sports",
    "Education",
    "Health",
    "Opinion",
    "Religion",
    "Crime",
    "Technology",
    "Entertainment",
    "Economy",
    "Law & Justice",
    "Environment",
    "Science",
  ]; */

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setShowArrow(
        el.scrollHeight > el.clientHeight &&
          el.scrollTop + el.clientHeight < el.scrollHeight
      );
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenuIcon className="h-4 w-4 mb-0.5 ml-2 cursor-pointer text-gray-800 dark:text-gray-100" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white text-white dark:bg-gray-900 rounded-xs shadow-xl border border-primary dark:border-gray-700 p-2"
      >
        <h3 className="text-sm pl-2 py-0.5 md:text-lg font-semibold uppercase tracking-wide bg-black my-3 border-b items-center">
          Highlights Of
        </h3>
        <DropdownMenuItem asChild className="p-0 pl-2">
          <Link
            href="/war"
            className="block rounded-lg cursor-pointer border-l-8 p-0 border-orange-600  hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-semibold text-black dark:text-gray-100 text-left"
          >
            War & Crisis
          </Link>
        </DropdownMenuItem>
        {/* NAV ITEMS GRID */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-1 mt-2  max-h-[400px] overflow-x-auto"
        >
          {/* {menuItems.map((item) => (
            <MenuItem
              key={item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}
              href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
              label={item}
            />
          ))} */}
          {menuItems.map((item) => (
            <MenuItem
              key={item.slug}
              href={`/${item.slug}`}
              label={item.label}
            />
          ))}
        </div>

        {showArrow && (
          <div className="flex justify-center mt-2 text-gray-400 animate-bounce">
            <ChevronDown className="w-5 h-5" />
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
          <p className="mb-2">
            Advertise with us:{" "}
            <Link
              href="/about/advertise#advertiseForm"
              className="text-primary underline"
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

          <p className="mb-2">Follow us:</p>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ----------------- SMALL REUSABLE COMPONENTS ----------------- */

function MenuItem({ href, label }: { href: string; label: string }) {
  return (
    <DropdownMenuItem asChild>
      <Link
        href={href}
        className="block rounded-lg cursor-pointer  hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-semibold text-black dark:text-gray-100 text-left"
      >
        {label}
      </Link>
    </DropdownMenuItem>
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
      <img src={img} alt={alt} className="w-7 h-7 rounded-full" />
    </a>
  );
}
