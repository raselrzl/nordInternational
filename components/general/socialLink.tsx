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
    
            <div className="flex items-center justify-center mt-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/globaleye.press"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/instagram.png"
                    alt="Instagram"
                    className="w-full h-full object-cover scale-[1.02]"
                  />
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://web.facebook.com/globaleye.press/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/facebook.png"
                    alt="Facebook"
                    className="w-full h-full object-cover scale-[1.02]"
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
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/youtube.png"
                    alt="YouTube"
                    className="w-full h-full object-cover scale-[1.02]"
                  />
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@globaleye.press"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/tiktokk.png"
                    alt="TikTok"
                    className="w-full h-full object-cover scale-[1.02]"
                  />
                </div>
              </a>
            </div>
  );
};

export default SocialLinks;
