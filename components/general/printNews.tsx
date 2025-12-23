"use client";
import { SquarePlay, LocateIcon, LinkIcon, Copy, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { NewsDetailsDisplay } from "../richTextEditor/NewsDetailsDisplay";
import { PrintNewsDetailsClient } from "@/components/general/PrintNewsClient";
import { quote } from "@prisma/client";

interface PrintNewsProps {
  newsPicture: string | null;
  newsPictureHeading: string | null;
  newsPictureCredit: string | null;
  newsLocation: string | null;
  newsDetails: string | "...";
  newsResource: string | null;
  newsHeading: string | null;
  id: string | null;
  createdAt: Date;
  quotes?: quote[];
}

export default function PrintNews({
  newsPicture,
  newsPictureHeading, 
  newsPictureCredit,
  newsLocation,
  newsDetails,
  newsResource,
  newsHeading,
  createdAt,
  quotes = [],
  id,
}: PrintNewsProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [articleUrl, setArticleUrl] = useState("");
  const [isFullImage, setIsFullImage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setArticleUrl(window.location.href);
    }
  }, []);

  const handleShareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(articleUrl)}`,
      "_blank"
    );
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  };

  const handleShareMessenger = () => {
    const url = encodeURIComponent(articleUrl);
    const shareUrl = `https://m.me/?link=${url}`;
    window.open(shareUrl, "_blank");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      toast("Copied");
    } catch {
      toast("Something wrong");
    }
  };

  return (
    <>
      {/* Share Buttons */}
      <div className="flex justify-end flex-wrap space-x-1 pr-2 mt-6 md:mt-2">
        <PrintNewsDetailsClient
          newsHeading={newsHeading ?? ""}
          newsPicture={newsPicture ?? null}
          newsPictureHeading={newsPictureHeading ?? null}
          newsDetails={newsDetails}
          createdAt={createdAt}
          quotes={quotes}
        />

        <Button
          onClick={handleShareWhatsApp}
          className="w-12 h-12 p-0 cursor-pointer border-none shadow-none "
          variant="outline"
        >
          <img
            src="/whatsapp.svg"
            alt="WhatsApp"
            className="object-cover w-full h-full pb-1"
          />
        </Button>

        <Button
          onClick={handleShareFacebook}
          className="w-10 h-10 p-0 cursor-pointer border-none shadow-none"
          variant="outline"
        >
          <img
            src="/fb.webp"
            alt="Facebook"
            className="object-cover w-full h-full"
          />
        </Button>

        <Button
          onClick={handleShareMessenger}
          className="w-12 h-12 p-0 cursor-pointer border-none shadow-none"
          variant="outline"
        >
          <img
            src="/messanger.svg"
            alt="Messenger"
            className="object-cover w-full h-full mb-1"
          />
        </Button>

        <Button
          onClick={handleCopyLink}
          className="w-10 h-10 p-0 cursor-pointer border-none shadow-none"
          variant="outline"
        >
          <img
            src="/copylink.png"
            alt="copyimage"
            className="object-cover w-full h-full"
          />
        </Button>
      </div>

      {/* MAIN CONTENT */}
      <div className="mb-10">
        <div
          id="printable-content"
          ref={contentRef}
          className="w-full rounded-xs shadow mt-6"
        >
          <h1 className="text-2xl font-bold my-4 p-2">
            {newsHeading}
          </h1>

          {/* Image Section */}
          {newsPicture && (
            <>
              <div
                className="relative w-full md:px-6 h-[280px] md:h-[550px] cursor-pointer"
                onClick={() => setIsFullImage(true)}
              >
                <img
                  src={newsPicture}
                  alt="Description"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-4 py-2 text-center z-10">
                  {newsPictureHeading || newsPictureCredit ? (
                    <>
                      {newsPictureHeading && (
                        <p className="text-sm font-semibold">
                          {newsPictureHeading}
                        </p>
                      )}
                      {newsPictureCredit && (
                        <p className="text-xs">{newsPictureCredit}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm font-semibold">
                      Global Eye Correspondent
                    </p>
                  )}
                </div>
              </div>

              {/* Fullscreen Image Viewer */}
              {isFullImage && (
                <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsFullImage(false)}
                    className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full hover:bg-black/70"
                  >
                    ✕
                  </button>

                  {/* Fullscreen Image */}
                  <img
                    src={newsPicture}
                    alt="Fullscreen Image"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </>
          )}

          {/* NEWS DETAILS */}
          <div className="whitespace-pre-line text-md mg:text-lg dark:bg-black mt-10">
            <div className="flex flex-row px-1">
              <MapPin />
              <p className="text-xl font-bold uppercase">{newsLocation}</p>
            </div>

            <div className="px-2 mt-4">
              <NewsDetailsDisplay newsDetails={newsDetails} />
            </div>
          </div>
        </div>
        <div className="w-[120px] border-b-6 border-primary my-4"></div>
      </div>
    </>
  );
}
