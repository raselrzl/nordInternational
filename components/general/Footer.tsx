import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 w-full flex justify-center">
      <div className=" w-full max-w-7xl text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-2 py-2 border-2">
          <Link
            href="/about"
            className="hover:underline font-semibold text-foreground/90 text-md md:text-2xl px-2"
          >
            Nord International
          </Link>
          <Link
            href="/about/privacy-policy"
            className="hover:underline font-semibold text-foreground/90 text-md md:text-xl px-2"
          >
            Privacy Plicy
          </Link>
          <Link
            href="/about/terms"
            className="hover:underline font-semibold text-foreground/90 text-md md:text-xl px-2"
          >
            Terms
          </Link>
          <Link
            href="/about/comment-policy"
            className="hover:underline font-semibold text-foreground/90 text-md md:text-xl px-2"
          >
            Comment Policy
          </Link>
          <Link
            href="/about/advertise"
            className="hover:underline font-semibold text-foreground/90 text-md md:text-xl px-2"
          >
            Advertisement
          </Link>
          {/*  <Link href="/about/contact" className="hover:underline font-semibold text-foreground/90 text-md md:text-xl px-2">
            Contact
          </Link> */}
        </div>
        <div className="md:grid md:grid-cols-3">
          <div>
            <strong>Publication and Communication</strong>
            <p className="mb-1 text-sm text-muted-foreground">
              <span>Editor: </span>
              <a
                href="mailto:editor@nordinternational.com"
                className="text-orange-600 hover:underline"
              >
                editor@nordinternational.com
              </a>
              <br />
              <span>Publisher: </span>
              <a
                href="mailto:publisher@nordinternational.com"
                className="text-orange-600 hover:underline"
              >
                contact@nordinternational.com
              </a>
            </p>

            <div>
              <p>Smedjegatan 35, 60219, Norrköping, Sweden</p>
              <a
                href="mailto:info@nordinternational.com"
                className="text-primary hover:underline"
              >
                info@nordinternational.com
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <strong>Advertisement</strong>
            <br />
            Email:{" "}
            <a
              href="mailto:ads@nordinternational.com"
              className="text-primary hover:underline"
            >
              ads@nordinternational.com
            </a>
            <Link href="/" className="flex items-center p-2">
              <div className="w-[160px] h-[60px] md:w-[200px] md:h-[80px] bg-[url('/n1w.png')] dark:bg-[url('/n1b.png')] bg-cover bg-center" />
            </Link>
          </div>
          <div className="flex items-center  justify-center gap-4 mt-6 md:mt-0">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="w-10 h-10 bg-primary p-1 rounded-xl text-accent hover:text-blue-600" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-10 h-10 bg-primary p-1 rounded-xl text-accent hover:text-pink-500" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube className="w-10 h-10 bg-primary p-1 rounded-xl text-accent hover:text-red-600" />
            </a>
          </div>
        </div>

        <p className="text-xs text-primary py-2 mt-2 bg-accent">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
