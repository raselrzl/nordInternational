"use client";

import {
  LinkIcon,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { NewsDetailsDisplay } from "../richTextEditor/NewsDetailsDisplay";
import { PrintNewsDetailsClient } from "@/components/general/PrintNewsClient";
import { quote } from "@prisma/client";
import NewUserTracker from "./NewUserTracker";

interface PrintNewsProps {
  newsPicture: string | null;
  newsPictureHeading: string | null;
  newsPictureCredit: string | null;
  newsLocation: string | null;
  newsDetails: string | "...";
  newsResource: string | null;
  newsHeading: string | null;
  newsSubHeading: string | null;
  newsReporterPublicName: string | null;
  id: string | null;
  createdAt: Date;
  quotes?: quote[];
}

export default function PrintNews({
  newsPicture,
  newsPictureHeading,
  newsPictureCredit,
  newsDetails,
  newsSubHeading,
  newsReporterPublicName,
  newsHeading,
  createdAt,
  quotes = [],
}: PrintNewsProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [articleUrl, setArticleUrl] = useState("");
  const [isFullImage, setIsFullImage] = useState(false);

  // 🔊 Speech
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // ⏱ Listening time
  const [listenMinutes, setListenMinutes] = useState(1);

  // ---------------- INIT ----------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      setArticleUrl(window.location.href);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // ---------------- CALCULATE LISTEN TIME ----------------
  useEffect(() => {
    if (!contentRef.current) return;

    const text = contentRef.current.innerText || "";
    const words = text.trim().split(/\s+/).length;

    const wordsPerMinute = 150; // speech average
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

    setListenMinutes(minutes);
  }, [newsDetails, newsHeading, newsSubHeading]);

  // ---------------- SHARE ----------------

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
    window.open(`https://m.me/?link=${url}`, "_blank");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      toast("Copied");
    } catch {
      toast("Something wrong");
    }
  };

  // ---------------- FEMALE VOICE ----------------

  const getFemaleVoice = (lang: string) => {
    const filtered = voices.filter(v =>
      v.lang.toLowerCase().includes(lang)
    );

    return (
      filtered.find(v =>
        /female|woman|zira|samantha|google uk english female/i.test(v.name)
      ) ||
      filtered[0] ||
      voices[0]
    );
  };

  // ---------------- TEXT TO SPEECH ----------------

  const handleSpeak = () => {
    if (typeof window === "undefined") return;

    // Toggle stop
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = contentRef.current?.innerText || "";
    if (!text) return;

    const isBangla = /[\u0980-\u09FF]/.test(text);
    const lang = isBangla ? "bn" : "en";

    const utterance = new SpeechSynthesisUtterance(text);

    const femaleVoice = getFemaleVoice(lang);
    if (femaleVoice) {
      utterance.voice = femaleVoice;
      utterance.lang = femaleVoice.lang;
    } else {
      utterance.lang = isBangla ? "bn-BD" : "en-US";
    }

    utterance.rate = 1;
    utterance.pitch = 1.2;

    utterance.onend = () => setIsSpeaking(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <>
      {/* BIG LISTEN BUTTON (LEFT) */}
      <div className="flex justify-start px-2 mt-6">
        <button
          onClick={handleSpeak}
          className="bg-black text-white px-6 py-3 rounded-lg text-sm md:text-base font-semibold flex items-center gap-2 hover:bg-gray-800 transition"
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-5 h-5" />
              Stop
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              Listen {/* ({listenMinutes} min) */}
            </>
          )}
        </button>
      </div>

      {/* Share Buttons (Right) */}
      <div className="flex justify-end flex-wrap space-x-1 pr-2 mt-2">
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
          className="w-8 h-8 p-0 border-none shadow-none dark:bg-white"
          variant="outline"
        >
          <img src="/wha.png" className="w-6 h-6" alt="WhatsApp" />
        </Button>

        <Button
          onClick={handleShareFacebook}
          className="w-8 h-8 p-0 border-none shadow-none dark:bg-white"
          variant="outline"
        >
          <img src="/fac.png" className="w-6 h-6" alt="Facebook" />
        </Button>

        <Button
          onClick={handleShareMessenger}
          className="w-8 h-8 p-0 border-none shadow-none dark:bg-white"
          variant="outline"
        >
          <img src="/mes.png" className="w-6 h-6" alt="Messenger" />
        </Button>

        <Button
          onClick={handleCopyLink}
          className="w-6 h-6 mt-1 ml-1 border border-black dark:border-white rounded"
          variant="outline"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* ---------------- ARTICLE ---------------- */}

      <div className="mb-10">
        <div ref={contentRef} className="w-full rounded-xs mt-6">
          <div className="h-2 w-20 bg-primary ml-2"></div>

          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold my-4 px-2 uppercase">
            {newsHeading}
          </h1>

          <p className="m-2 text-sm font-bold text-justify">
            By: {newsReporterPublicName || "GEP Editor"}
          </p>

          <p className="m-2 text-sm italic text-justify">
            {newsSubHeading}
          </p>

          {/* Image */}
          {newsPicture && (
            <>
              <div
                className="relative w-full md:px-6 h-[280px] md:h-[550px] cursor-pointer"
                onClick={() => setIsFullImage(true)}
              >
                <img
                  src={newsPicture}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  alt="News"
                />

                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-4 py-2 text-center">
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
                    <p className="text-sm font-semibold">GEP</p>
                  )}
                </div>
              </div>

              {isFullImage && (
                <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
                  <button
                    onClick={() => setIsFullImage(false)}
                    className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full"
                  >
                    ✕
                  </button>

                  <img
                    src={newsPicture}
                    className="max-w-full max-h-full object-contain"
                    alt="Fullscreen"
                  />
                </div>
              )}
            </>
          )}

          {/* Details */}
          <div className="whitespace-pre-line text-md md:text-lg dark:bg-black pt-10 shadow">
            <div className="flex font-bold pl-2 items-center">
              <NewUserTracker />
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
