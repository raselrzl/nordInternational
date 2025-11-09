"use client";

import Image from "next/image";

interface InstagramPostPreviewProps {
  igLink: string;
}

export default function InstagramPostPreview({
  igLink,
}: InstagramPostPreviewProps) {
  // Fallback thumbnail
  const getThumbnail = () => {
    try {
      const url = new URL(igLink);
      if (url.pathname.startsWith("/p/")) {
        return `https://instagram.com${url.pathname}media/?size=l`;
      }
      return "/instagram-placeholder.png";
    } catch {
      return "/instagram-placeholder.png";
    }
  };

  return (
    <a
      href={igLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center"
    >
      <div className="relative w-[270px] h-[350px] rounded-lg overflow-hidden bg-gray-200">
        <Image
          src={getThumbnail()}
          alt="Instagram post"
          fill
          className="object-cover"           priority
        />
      </div>
    </a>
  );
}
