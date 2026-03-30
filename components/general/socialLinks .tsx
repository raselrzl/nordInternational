import {
  Instagram,
  Facebook,
  Youtube,
  Music2, // TikTok alternative
  AtSign, // Threads alternative
} from "lucide-react";

export default function FollowGEP() {
  const socialLinks = [
    {
      href: "https://www.instagram.com/gepnews",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "https://www.threads.com/@gepnews",
      icon: AtSign,
      label: "Threads",
    },
    {
      href: "https://www.facebook.com/gepspot",
      icon: Facebook,
      label: "Facebook",
    },
    {
      href: "https://www.youtube.com/@globaleyepressofficial",
      icon: Youtube,
      label: "YouTube",
    },
    {
      href: "https://www.tiktok.com/@gep_news",
      icon: Music2,
      label: "TikTok",
    },
  ];

  return (
    <div className="mt-6 px-4 pb-6">
      <div className="flex flex-col gap-3">
        <p className="text-xs tracking-widest uppercase font-semibold">
          Follow GEP
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group"
            >
              <div className="
                w-10 h-10 flex items-center justify-center
                rounded-xl
                bg-muted
                hover:bg-primary
                dark:hover:bg-primary
                transition-all duration-300
                shadow-sm hover:shadow-md
              ">
                <Icon
                  size={18}
                  className="
                    text-foreground
                    group-hover:text-white
                    transition-colors
                  "
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}