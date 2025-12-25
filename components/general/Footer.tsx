import Link from "next/link";
import CountryListLinks from "./CountryListLinks";

export default function Footer() {
  return (
    <footer className="mt-10 w-full">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-start">
          <div
            className="
              w-[80px] h-[26px]
              bg-[url('/logo/gepb.png')]
              dark:bg-[url('/logo/gepw.png')]
              bg-cover bg-center
            "
          />
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap gap-2 mb-2 py-2 text-sm pl-4">
          <Link
            href="/about/terms"
            className="hover:underline text-foreground/90 text-sm"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/about/editor"
            className="hover:underline text-foreground/90 text-sm"
          >
            Editorial Policy
          </Link>
          <Link
            href="/about/privacy-policy"
            className="hover:underline text-foreground/90 text-sm"
          >
            Privacy Policy
          </Link>
          <Link
            href="/about/cookie-policy"
            className="hover:underline text-foreground/90 text-sm"
          >
            Cookie Policy
          </Link>
          <Link
            href="/about/comment-policy"
            className="hover:underline text-foreground/90 text-sm"
          >
            Comment Policy
          </Link>

          <Link
            href="/about/advertise/standards-integrity"
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
            className="hover:underline text-foreground/90 text-sm"
          >
            About
          </Link>
        </div>
        {/* Social section */}
        <div className="mt-6 pb-4 ml-4">
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm uppercase font-bold">Follow GEP</p>

            <div className="flex items-center gap-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/gepnews"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/instagram.png"
                    alt="Instagram"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://web.facebook.com/gepnews"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/facebook.png"
                    alt="Facebook"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@globaleyepressofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/youtube.png"
                    alt="YouTube"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@gepnews"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/tiktokk.png"
                    alt="TikTok"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* Country links */}
        <CountryListLinks />

        {/* Copyright */}
        <p className="text-xs mt-6 text-center">
          Copyright GEP &copy; {new Date().getFullYear()}. All rights reserved.
          A Souveral Network Independent media organization operating from
          Portugal.
        </p>
      </div>
    </footer>
  );
}
