"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AboutFooter from "./AboutFooter";

const links = [
  { name: "About", href: "/about" },
  { name: "Advertise", href: "/about/advertise" },
  { name: "Editorial Policy", href: "/about/editor" },
  { name: "Comment Policy", href: "/about/comment-policy" },
  { name: "Privacy Policy", href: "/about/privacy-policy" },
  { name: "Terms & Conditions", href: "/about/terms" },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#202020] text-gray-200">
      {/* ===== Mobile Navbar ===== */}
      <div className="md:hidden relative border-b px-4 py-3 flex items-center justify-between bg-[#202020] z-50">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo/sr.png" alt="Logo" className="h-10" />
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="text-sm font-semibold px-3 py-1"
        >
          Menu
        </button>

        {/* Mobile Dropdown Overlay */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-[#202020] shadow-md z-50 px-4 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block text-sm font-medium ${
                  pathname === link.href ? "text-primary" : "text-gray-200"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ===== Desktop Sidebar ===== */}
      <aside className="hidden md:flex md:w-64 border-r border-gray-700 min-h-screen p-4 flex-col bg-[#202020]">
        <Link href="/" className="flex items-center gap-2 mb-6">
          <img src="/logo/sr.png" alt="Logo" className="h-20 w-auto" />
        </Link>

        <nav className="space-y-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 text-sm font-medium transition-colors
                  ${active ? "bg-primary text-white" : "hover:bg-gray-700 text-gray-200"}
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ===== Page Content ===== */}
      <main className="flex-1 p-4 md:p-8">
        {children}
        <AboutFooter />
      </main>
    </div>
  );
}
