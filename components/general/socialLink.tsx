import {
  Facebook,
  FacebookIcon,
  Instagram,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
  Youtube,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4  justify-center mt-2">
      <a
        href="https://web.facebook.com/globaleye.press/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <Facebook className="w-10 h-10 bg-primary p-1 rounded-xl text-accent hover:text-green-600" />
      </a>
      <a
        href="https://www.instagram.com/globaleyepress"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <Instagram className="w-10 h-10 bg-primary p-1 rounded-xl text-accent hover:text-pink-500" />
      </a>
     {/*  <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
      >
        <Youtube className="w-10 h-10 bg-primary p-1 rounded-xl text-accent hover:text-red-600" />
      </a> */}
    </div>
  );
};

export default SocialLinks;
