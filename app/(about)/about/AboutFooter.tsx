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
        <div className="flex flex-wrap gap-4 text-sm mb-6 pl-3">
          {" "}
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/about/editor" className="hover:text-white">
            Editorial Policy
          </Link>
          <Link href="/about/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/about/terms" className="hover:text-white">
            Terms & Conditions
          </Link>
          <Link href="/about/advertise" className="hover:text-white">
            Advertise
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
