"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AboutFooter from "./AboutFooter";
import { MenuIcon } from "lucide-react";

const links = [
  { name: "Terms & Conditions", href: "/about/terms" },
  { name: "Editorial Policy", href: "/about/editor" },
  { name: "Privacy Policy", href: "/about/privacy-policy" },
  { name: "Cookie Policy", href: "/about/cookie-policy" },
  { name: "Comment Policy", href: "/about/comment-policy" },  
  { name: "Advertise With Us", href: "/about/advertise" },  {
    name: "Standards & Integrity",
    href: "/about/advertise/standards-integrity",
  },
  { name: "About", href: "/about" },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#202020] text-gray-200">
      {/* ===== Mobile Navbar ===== */}
      <div className="md:hidden fixed top-0 left-0 w-full border-b border-gray-700 bg-[#202020] z-50 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/gepw.png" alt="Logo" className="h-10" />
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="text-sm font-semibold px-3 py-1"
        >
          <MenuIcon />
        </button>

        {/* Mobile Dropdown Overlay */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-[#202020] shadow-md z-50 px-4 py-3 space-y-2 border-b">
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
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo/sr.png" alt="Logo" className="h-10" />
            </Link>
          </div>
        )}
      </div>

      {/* ===== Desktop Layout ===== */}
      <div className="hidden md:flex justify-center mt-0 md:mt-0">
        <div className="flex w-full max-w-7xl">
          {/* Sidebar */}
          <aside className="w-64 border-r border-gray-700 p-4 flex-shrink-0 flex flex-col bg-[#202020]">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src="/gepw.png" alt="Logo" className="h-16 w-auto" />
            </Link>

            <nav className="space-y-2">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 text-sm font-medium transition-colors
                      ${
                        active
                          ? "bg-primary text-white"
                          : "hover:bg-gray-700 text-gray-200"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Scrollable Content */}
          <main className="flex-1 p-8 overflow-y-auto max-h-screen">
            {children}
            <AboutFooter />
          </main>
        </div>
      </div>

      {/* ===== Mobile Content Spacing ===== */}
      <div className="md:hidden pt-16">
        {children}
        <AboutFooter />
      </div>
    </div>
  );
}
