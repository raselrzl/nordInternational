import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import CountryListLinks from "./CountryListLinks";

export default function Footer() {
  return (
    <footer className="mt-10 w-full flex justify-center">
      <div className=" w-full max-w-7xl text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-2 py-2 border-2 uppercase">
          <Link
            href="/about"
            className="hover:underline font-semibold text-foreground/90 text-sm md:text-md px-2"
          >
            Global Eye
          </Link>
          <Link
            href="/about/privacy-policy"
            className="hover:underline font-semibold text-foreground/90 text-sm md:text-md px-2"
          >
            Privacy Plicy
          </Link>
          <Link
            href="/about/terms"
            className="hover:underline font-semibold text-foreground/90 text-sm md:text-md px-2"
          >
            Terms
          </Link>
          <Link
            href="/about/comment-policy"
            className="hover:underline font-semibold text-foreground/90 text-sm md:text-md px-2"
          >
            Comment Policy
          </Link>
          <Link
            href="/about/advertise"
            className="hover:underline font-semibold text-foreground/90 text-sm md:text-md px-2"
          >
            Advertisement
          </Link>
          {/*  <Link href="/about/contact" className="hover:underline font-semibold text-foreground/90 text-md md:text-xl px-2">
            Contact
          </Link> */}
        </div>

        <div className="md:grid md:grid-cols-3 mt-4 pb-4">
          <div>
            <h1 className="text-lg font-bold mt-4 pb-4">
              Publication and Communication
            </h1>
            <h3 className="font-bold text-md">
              Editor & Publisher: Global Eye
            </h3>
           {/*  <p className="mb-1 text-sm text-muted-foreground">
              <a
                href="mailto:contact@globaleye.press"
                className="text-orange-600 hover:underline"
              >
                contact@globaleye.press
              </a>
              <br />
              <a
                href="mailto:publisher@globaleye.press"
                className="text-orange-600 hover:underline"
              >
                contact@globaleye.press
              </a>
            </p> */}

            <div className="text-sm ">
              <p>Norrköping, Sweden</p>
              <a
                href="mailto:contact@globaleye.press"
                className="text-primary hover:underline"
              >
                contact@globaleye.press
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg font-bold mt-4">Advertisement</h1>

            <div className="max-w-2xl text-sm mx-auto px-4 py-4 text-foreground text-center">
              <p className="mb-4 inline">Fill up the </p>
              <a
                href="/about/advertise#advertiseForm"
                aria-label="Form"
                className="text-primary hover:underline"
              >
                Form
              </a>
            </div>

            <p className="text-sm"> or Email us for advertisement</p>
            <a
              href="mailto:contact@globaleye.press"
              className="text-primary text-sm hover:underline"
            >
              contact@globaleye.press
            </a>
             <div 
    className="
      w-[120px] h-[30px] 
      md:w-[140px] md:h-[40px] 
      bg-[url('/geye.png')] 
      dark:bg-[url('/geyeb.png')] 
      bg-cover bg-center
    " 
  />
          </div>
          <div className="flex flex-col items-center  justify-center gap-4 mt-6 md:mt-0">
            <p className="text-sm">
              Follow our social media accounts for the latest updates and
              exclusive content.
            </p>
            <div className="flex flex-row gap-3">
              {" "}
           {/*    <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-10 h-10 bg-primary p-1 rounded-xl text-accent hover:text-green-600" />
              </a> */}
              <a
                href="https://www.instagram.com/globaleyepress"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-10 h-10 bg-primary p-1 rounded-xl text-accent hover:text-pink-500" />
              </a>
           {/*    <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="w-10 h-10 bg-primary p-1 rounded-xl text-accent hover:text-red-600" />
              </a> */}
            </div>
          </div>
        </div>
        <CountryListLinks />

        <p className="text-xs text-primary py-2 mt-2 bg-accent">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
