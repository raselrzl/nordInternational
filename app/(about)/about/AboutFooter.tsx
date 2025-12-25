import SocialLinks from "@/components/general/socialLink";
import Link from "next/link";

export default function AboutFooter() {
  return (
    <footer className="w-full bg-[#202020] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Logo */}
        <div className="flex mb-2">
          <img
            src="/logo/gepw.png"
            alt="Souveral Network"
            className="h-8 w-auto"
          />
        </div>
        {/* Links */}
        <div className="flex flex-wrap gap-2 mb-2 py-2 text-sm pl-4">
          <Link href="/about/terms" className="hover:underline text-sm">
            Terms & Conditions
          </Link>
          <Link href="/about/editor" className="hover:underline text-sm">
            Editorial Policy
          </Link>
          <Link
            href="/about/privacy-policy"
            className="hover:underline text-sm"
          >
            Privacy Policy
          </Link>
          <Link href="/about/cookie-policy" className="hover:underline text-sm">
            Cookie Policy
          </Link>
          <Link
            href="/about/comment-policy"
            className="hover:underline text-sm"
          >
            Comment Policy
          </Link>

          <Link
            href="/about/advertise/standards-integrity"
            className="hover:underline text-sm"
          >
            Advertise With Us
          </Link>
          <Link
            href="/about/advertise/standards-integrity"
            className="hover:underline text-sm"
          >
            Standards & Integrity
          </Link>
          <Link href="/about" className="hover:underline text-sm">
            About
          </Link>
        </div>
        <SocialLinks />
      </div>

      <div className="flex items-center justify-center mb-6">
        <img
          src="/logo/sr.png"
          alt="Souveral Network"
          className="h-20 w-auto"
        />
      </div>
      {/* Copyright */}
      <p className="text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Souveral Network. All rights reserved.
      </p>
    </footer>
  );
}
