import React, { Suspense } from "react";
import { prisma } from "../utils/db";
import { EmptyState } from "@/components/general/EmptyState";
import Link from "next/link";
import { Flame, Loader2 } from "lucide-react";
import { JsonToHtml } from "@/components/richTextEditor/JsonToHtml";
import { isJson } from "../utils/isJson";
import { trackRoute } from "../utils/routeTracker";

// Advertisement & Sections
import { ProOneAdvertise } from "@/components/allAdvertisement/ProOne";
import { DeluxeTwoAdvertise } from "@/components/allAdvertisement/DeluxeTwo";
import { PremiumOneAdvertise } from "@/components/allAdvertisement/PremiumOne";
import { PremiumTwoAdvertise } from "@/components/allAdvertisement/PremiumTwo";
import { PremiarOne } from "@/components/allAdvertisement/PremiarOne";
import SocialLinks from "@/components/general/socialLink";
import { Contact } from "@/components/general/Contact";
import {
  Binodon,
  ScienceNews,
  ScienceNewsHeadPost,
} from "@/components/general/homepageArticleList";
import { CrimeAndPopularTab } from "@/components/general/CrimeAndPopularTab";
import LatestOpinions from "@/components/general/LatestOpinions";
import PopupOnViewServer from "@/components/PopupAd/PopupOnViewServer";
import { aauth } from "../actions";
import LiveUpdate from "@/components/general/PublicSourceNewsLiveUpdate";
import WarLatest from "@/components/general/WarLatest";
import InstagramPosts from "@/components/instagram/InstagramPosts";
import Image from "next/image";
import ChainaLatest from "@/components/general/chainaNews";
import AsiaLatest from "@/components/general/asiaNews";
import RussiaLatest from "@/components/general/RussiaNews";
import MiddleeastLatest from "@/components/general/MiddleEastNews";

// ---------------------- TYPES ----------------------
type Quote = {
  speakerInfo: string;
  text: string;
};

type Article = {
  id: string;
  createdAt: Date;
  isFeatured: boolean;
  newsCategory: string;
  newsDetails: string;
  newsHeading: string;
  newsPicture: string;
  quotes: Quote[];
  newsResource: string;
  newsPictureHeading: string;
  newsPictureCredit: string;
  newsLocation: string | null;
  newsReporter: any;
  newsArticleStatus: string;
};

// ---------------------- DATA FETCH ----------------------
async function getData(): Promise<{
  lastFeaturedArticle: Article[];
  latestUSANews: Article[];
  InternationalAll: Article[];
}> {
  const [lastFeaturedArticle, latestUSANews, InternationalAll] =
    await Promise.all([
      prisma.newsArticle.findMany({
        where: { newsArticleStatus: "ACTIVE", isFeatured: true },
        select: {
          id: true,
          createdAt: true,
          isFeatured: true,
          newsCategory: true,
          newsDetails: true,
          newsHeading: true,
          newsPicture: true,
          quotes: { select: { speakerInfo: true, text: true } },
          newsResource: true,
          newsPictureHeading: true,
          newsPictureCredit: true,
          newsLocation: true,
          newsReporter: true,
          newsArticleStatus: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.newsArticle.findMany({
        where: { newsLocation: "Usa" },
        select: {
          id: true,
          createdAt: true,
          isFeatured: true,
          newsCategory: true,
          newsDetails: true,
          newsHeading: true,
          newsPicture: true,
          quotes: { select: { speakerInfo: true, text: true } },
          newsResource: true,
          newsPictureHeading: true,
          newsPictureCredit: true,
          newsLocation: true,
          newsReporter: true,
          newsArticleStatus: true,
        },
        orderBy: { createdAt: "desc" },
        take: 7,
      }),
      prisma.newsArticle.findMany({
        where: { newsCategory: "INTERNATIONAL" },
        select: {
          id: true,
          createdAt: true,
          isFeatured: true,
          newsCategory: true,
          newsDetails: true,
          newsHeading: true,
          newsPicture: true,
          quotes: { select: { speakerInfo: true, text: true } },
          newsResource: true,
          newsPictureHeading: true,
          newsPictureCredit: true,
          newsLocation: true,
          newsReporter: true,
          newsArticleStatus: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

  return { lastFeaturedArticle, latestUSANews, InternationalAll };
}

// ---------------------- COMPONENT ----------------------
export default async function Home() {
  const { lastFeaturedArticle, latestUSANews, InternationalAll } =
    await getData();
  await trackRoute("Home");
  const session = await aauth();

  return (
    <>
      <div className="bg-red-50 dark:bg-black mb-2 grid grid-cols-3 items-center px-2">
        {/* Live Updates */}
        <div className="col-span-3 md:col-span-2">
          <LiveUpdate />
        </div>

        {/* Desktop-only Advertisement Banner */}
        <div className=" md:flex items-center col-span-3 md:col-span-1 justify-center gap-2 rounded-md border border-yellow-400 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-2 shadow-sm">
          <p className="text-xs md:text-sm text-gray-800 dark:text-gray-200 text-center leading-snug">
            <strong className="text-yellow-700 dark:text-yellow-400">
              NOTICE:
            </strong>{" "}
            We feature local, corporate, product, and social media
            advertisements, fully independent and not funded by any organization
            or indivisual. Our readers span across the globe. For partnership or
            advertising inquiries, reach out at{" "}
            <span className="font-semibold underline hover:text-yellow-700 dark:hover:text-yellow-400 cursor-pointer">
              contact@globaleye.press
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-10">
        {/* ---------------------- Left Column: USA Highlights ---------------------- */}
        <div className="order-3 md:order-1 md:col-span-1 p-2 border-1">
          <div className="flex flex-row gap-2 ">
            <Link
              key="Usa"
              href="/diffrentCountry?country=Usa"
              className="flex items-center justify-center gap-2 p-1 transition-all 
                     hover:opacity-80 active:opacity-60 active:scale-95 rounded-xs"
            >
              <img
                src="/flags/usa.webp"
                alt="USA flag"
                width={30}
                height={40}
                className="rounded-sm border"
              />
              <span className="text-md font-bold uppercase">
                USA Highlights
              </span>
            </Link>
          </div>

          {latestUSANews.length > 0 ? (
            latestUSANews.map((item: Article) => (
              <Link key={item.id} href={`/newsDetails/${item.id}`}>
                <div className="grid grid-cols-3 border-b py-2">
                  <div className="col-span-1">
                    <img
                      src={item.newsPicture}
                      alt={item.newsHeading}
                      className="w-32 h-16 object-cover border"
                    />
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm md:text-md font-semibold ml-2 line-clamp-3">
                      {item.newsHeading}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <EmptyState
              title="Oops! Nothing to show yet."
              description="Nothing has been added yet. Stay tuned!"
              buttonText="Homepage"
              href="/"
            />
          )}

          <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
            <ProOneAdvertise />
          </Suspense>

          <div className="mt-10 text-left flex-col hidden sm:block">
            <p className="text-sm font-semibold text-justify">
              Follow our social media accounts for the latest updates and
              exclusive content.
            </p>
            <SocialLinks />
          </div>
        </div>

        {/* ---------------------- Middle Column ---------------------- */}
        <div className="order-2 md:order-2 md:col-span-1">
          <Suspense fallback={<Loader2 />}>
            <PremiumOneAdvertise />
          </Suspense>

          {InternationalAll.length > 0 ? (
            <>
              <Link
                href={`/newsDetails/${InternationalAll[0].id}`}
                className="block"
              >
                <div className="max-w-sm w-full mx-auto md:mx-0 rounded-lg overflow-hidden shadow-md border mt-2 p-2 items-center">
                  <h2 className="text-xl font-semibold text-center">
                    {InternationalAll[0].newsHeading}
                  </h2>
                  <img
                    src={InternationalAll[0].newsPicture}
                    alt={InternationalAll[0].newsHeading}
                    className="w-full h-40 object-cover"
                  />
                </div>
              </Link>

              <div className="bg-primary/55 dark:bg-gray-700 mt-6 border border-primary/55 dark:border-gray-600 shadow-md mx-2 md:mx-0">
                <div className="flex items-center justify-center py-3 gap-2 border-b border-primary/55 dark:border-gray-600">
                  <Flame className="text-red-600 dark:text-amber-400 w-6 h-6" />
                  <h1 className="font-bold text-lg md:text-xl uppercase text-gray-900 dark:text-gray-100 tracking-wide">
                    Top News
                  </h1>
                </div>
                <div className="relative h-82 md:h-92 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-transparent px-4 py-3">
                  <div className="space-y-3">
                    {InternationalAll.slice(1).map((article: Article) => (
                      <Link
                        key={article.id}
                        href={`/newsDetails/${article.id}`}
                      >
                        <div className="bg-amber-50 dark:bg-gray-800 hover:bg-amber-200 dark:hover:bg-gray-700 border border-primary/55 dark:border-gray-600 transition-all shadow-sm hover:shadow-md p-3">
                          <h2 className="text-base font-semibold line-clamp-1 text-gray-800 dark:text-gray-100">
                            {article.newsHeading}
                          </h2>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyState
              title="Oops! Nothing to show yet."
              description="Nothing has been added yet. Stay tuned!"
              buttonText="Homepage"
              href="/"
            />
          )}

          <div className="flex justify-center items-center pt-4 border-t-1">
            <DeluxeTwoAdvertise />
          </div>
        </div>

        {/* ---------------------- Right Column ---------------------- */}
        <div className="order-1 md:order-3 md:col-span-3">
          {lastFeaturedArticle.length > 0 ? (
            <>
              {/* Featured Article */}
              <Link href={`/newsDetails/${lastFeaturedArticle[0].id}`}>
                <div className="mb-6 max-h-[250px] md:max-h-[290px] md:border-1 md:p-2 grid grid-cols-5 px-2">
                  <div className="w-full max-h-[240px] md:max-h-[270px] border md:rounded-xl overflow-hidden col-span-5 md:col-span-3">
                    <img
                      src={lastFeaturedArticle[0].newsPicture}
                      alt={lastFeaturedArticle[0].newsHeading}
                      className="w-full h-full object-fill"
                    />
                  </div>
                  <div className="pl-1 md:pl-4 col-span-5 md:col-span-2">
                    <h2 className="text-lg md:text-2xl font-semibold mt-2 pl-2 md:pl-0 line-clamp-2 md:line-clamp-5">
                      {lastFeaturedArticle[0].newsHeading}
                    </h2>
                    {isJson(lastFeaturedArticle[0].newsDetails) ? (
                      <div className="text-sm md:text-md text-accent-foreground/80 mb-8 md:mt-2 line-clamp-1 md:line-clamp-5 pl-2 md:pl-1">
                        <JsonToHtml
                          json={JSON.parse(lastFeaturedArticle[0].newsDetails)}
                        />
                      </div>
                    ) : (
                      <p className="text-sm md:text-md text-accent-foreground/80 mb-8 md:mt-2 line-clamp-1 md:line-clamp-5 pl-2 md:pl-1">
                        {lastFeaturedArticle[0].newsDetails}
                      </p>
                    )}
                  </div>
                </div>
              </Link>

              {/* Other Featured Articles */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 md:border-1 mt-20 md:mt-4">
                {lastFeaturedArticle.slice(1).map((article: Article) => (
                  <Link key={article.id} href={`/newsDetails/${article.id}`}>
                    <div className="max-w-md w-full mx-auto my-1 sm:max-w-xs md:max-w-md lg:max-w-lg">
                      <div className="w-auto h-[110px] md:h-[150px] border-1 rounded-xl overflow-hidden">
                        <img
                          src={article.newsPicture}
                          alt={article.newsHeading}
                          className="w-full h-full md:h-[150px] object-fit"
                        />
                      </div>
                      <div className="pt-4">
                        <h2 className="text-[14px] font-semibold leading-[1.5] px-1 font-stretch-extra-condensed">
                          {article.newsHeading}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              title="Oops! Nothing to show yet."
              description="Nothing has been added yet. Stay tuned!"
              buttonText="Homepage"
              href="/"
            />
          )}
        </div>
      </div>

      <div className="border-y-2 my-2 border-primary"></div>
      <WarLatest />
      <div className="border-y-2 my-2 border-primary"></div>
      {/* Videos Section */}
      {/*   <Videos /> */}
      <ChainaLatest />
      <InstagramPosts />

      <AsiaLatest />
      <div className="border-y-2 my-2 border-primary"></div>
      {/* Tab Section */}
      <div className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="mx-4 md:mx-0 py-4">
            <RussiaLatest />
          </div>
          <div className="py-4">
            <Suspense fallback={<Loader2 className="animate-spin" />}>
              <PremiarOne />
            </Suspense>
            <h1 className="mt-8 text-center text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-white to-black bg-clip-text text-transparent tracking-wide">
              Best Memories
            </h1>

            <Image
              src="/jewish.png"
              alt="Jewish entering Paletiose after world war 2"
              height={300}
              width={400}
              className="mx-2 border"
            />
          </div>

          <div className="py-4">
            <LatestOpinions />
          </div>
        </div>
      </div>

      {/* Science Section */}
      <div className="border-y-4 my-2 py-6 border-primary">
        <div className="grid grid-cols-3 border-primary my-4">
          <div className="col-span-3 md:col-span-1 p-2 mt-2 flex flex-col justify-between w-full max-w-sm mx-auto md:mx-0">
            <ScienceNewsHeadPost />
            <PremiumTwoAdvertise />
          </div>
          <div className="col-span-3 md:col-span-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
            <ScienceNews />
          </div>
        </div>
      </div>
      <MiddleeastLatest />

      {/* Binodon Section */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-3 md:col-span-2">
            <PopupOnViewServer />
            <Binodon />
          </div>
          <div className="col-span-3 md:col-span-1 md:mt-12">
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}
