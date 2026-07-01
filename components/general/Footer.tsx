import Link from "next/link";
import CountryListLinks from "./CountryListLinks";
import { ExternalLink } from "lucide-react";
import FollowGEP from "./socialLinks ";
import FooterCategoryLinks from "./FooterCategoryLinks";
import ComplaintPopup from "./Complaint";

export default function Footer() {
  return (
    <footer className="mt-10 w-full">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Footer links */}
        <FooterCategoryLinks />
        <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-2 py-2 text-sm pl-2 font-semibold items-start">
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <ComplaintPopup />
          </div>{" "}
          <Link
            href="/about/terms"
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
            href="/about/privacy-policy"
            className="hover:underline text-foreground/90 text-sm flex flex-row"
            target="_blank"
          >
            Privacy Policy <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
          <Link
            href="/about/cookie-policy"
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
            href="/about"
            className="hover:underline text-foreground/90 text-sm flex flex-row"
            target="_blank"
          >
            About GEP <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </div>
        {/* Country links */}
        <CountryListLinks />
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mt-6 gap-4">
          {/* Logo */}
          <div
            className="
      w-[80px] h-[26px]
      bg-[url('/gb.png')]
      dark:bg-[url('/gw.png')]
      bg-cover bg-center
    "
          />

          {/* Social */}
          <FollowGEP />
        </div>
        {/* Copyright */}
      </div>
      <p className="text-[10px] mt-6 text-center border-t bg-black text-white">
        Copyright GEP &copy; {new Date().getFullYear()}. All rights reserved
        Souveral Network.
      </p>
    </footer>
  );
}
