"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

export default function DropDownMenuList() {
  const menuItems = [
    "Latest",
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
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenuIcon className="h-6 w-6 cursor-pointer text-gray-800 dark:text-gray-100" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2"
      >
        {/* NAV ITEMS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {menuItems.map((item) => (
            <MenuItem
              key={item}
              href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
              label={item}
            />
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
          <p className="mb-2">
            Advertise with us:{" "}
            <Link href="/about/advertise#advertiseForm" className="text-primary underline">
              Form
            </Link>{" "}
            or{" "}
            <Link href="mailto:contact@globaleye.press" className="text-primary underline">
              Email
            </Link>
          </p>

          <p className="mb-2">Follow us:</p>
          <div className="flex justify-center gap-3">
            <SocialIcon href="https://www.instagram.com/globaleye.press" img="/instagram.png" alt="Instagram" />
            <SocialIcon href="https://web.facebook.com/globaleye.press/" img="/facebook.png" alt="Facebook" />
            <SocialIcon href="https://www.youtube.com/@globaleyepressofficial" img="/youtube.png" alt="YouTube" />
            <SocialIcon href="https://www.tiktok.com/@globaleye.press" img="/tiktokk.png" alt="TikTok" />
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
        className="block rounded-lg cursor-pointer px-1 border-xs shadow-xs shadow-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold uppercase text-black dark:text-gray-100 text-center"
      >
        {label}
      </Link>
    </DropdownMenuItem>
  );
}

function SocialIcon({ href, img, alt }: { href: string; img: string; alt: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={img} alt={alt} className="w-7 h-7 rounded-full" />
    </a>
  );
}
