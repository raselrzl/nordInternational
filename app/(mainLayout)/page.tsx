import React, { Suspense } from "react";
import { prisma } from "../utils/db";
import { EmptyState } from "@/components/general/EmptyState";
import Link from "next/link";
import { Calendar, Flame, Loader2 } from "lucide-react";
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
import IndiaLatest from "@/components/general/India";
import AfrikaLatest from "@/components/general/Afrika";
import AustraliaLatest from "@/components/general/Australia";
import SouthamericaLatest from "@/components/general/SouthamericaAmerica";
import Videos from "@/components/general/Videos";
import { BesicOneAdvertise } from "@/components/allAdvertisement/BesicOne";
import { BesicTwoAdvertise } from "@/components/allAdvertisement/BesicTwo";
import { OpinionForm } from "@/components/general/OpinionForm";
import CountryNewsSlider from "@/components/general/CountryNewsSlider";
import SportsNews from "@/components/general/SportsNews";
import PoolPopupComponent from "@/components/general/PoolPopupComponent";
import CategoryNewsSlider from "@/components/general/CategoryNewsSlider";

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
  newsSubHeading?: string;
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
        take: 7,
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
        take: 5,
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
        take: 3,
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
      <div className="mb-2 grid grid-cols-3 items-center px-2">
        {/* Live Updates */}
        <div className="col-span-3 md:col-span-2">
          <LiveUpdate />
        </div>

        {/* Desktop-only Advertisement Banner */}
        {/*   <div className=" md:flex items-center col-span-3 md:col-span-1 justify-center gap-2 rounded-md border border-yellow-400 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-2 shadow-sm">
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
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-10">
        {/* ---------------------- Left Column: USA Highlights ---------------------- */}
        <div className="order-3 md:order-1 md:col-span-1 px-2 sm:px-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 border-b pb-2">
            <img
              src="/flags/usa.webp"
              alt="USA flag"
              width={26}
              height={18}
              className="rounded-sm border"
            />
            <Link
              href="/diffrentCountry?country=Usa"
              className="text-sm font-extrabold uppercase hover:underline"
            >
              USA Highlights
            </Link>
          </div>

          {latestUSANews.length > 0 ? (
            <>
              {/* ---------- Featured (Top Story) ---------- */}
              <Link
                href={`/newsDetails/${latestUSANews[0].id}`}
                className="block mb-4"
              >
                <div className="relative rounded-lg overflow-hidden group">
                  <img
                    src={latestUSANews[0].newsPicture}
                    alt={latestUSANews[0].newsHeading}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <h3 className="absolute bottom-0 text-white text-sm font-bold p-3 line-clamp-3">
                    {latestUSANews[0].newsHeading}
                  </h3>
                </div>
              </Link>

              {/* ---------- Rest List ---------- */}
              <div className="flex flex-col divide-y">
                {latestUSANews.slice(1, 6).map((item: Article) => (
                  <Link
                    key={item.id}
                    href={`/newsDetails/${item.id}`}
                    className="flex gap-2 py-3 group"
                  >
                    <img
                      src={item.newsPicture}
                      alt={item.newsHeading}
                      className="w-20 h-18 object-cover rounded-md flex-shrink-0"
                    />

                    <p className="text-sm leading-snug group-hover:underline">
                      {item.newsHeading}
                    </p>
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

          {/* Ad */}
          <div className="mt-6">
            <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
              <ProOneAdvertise />
            </Suspense>
          </div>
        </div>

        {/* ---------------------- right Column ---------------------- */}
        <div className="order-2 md:order-3 md:col-span-1">
          <Suspense fallback={<Loader2 />}>
            <PremiumOneAdvertise />
          </Suspense>

          {InternationalAll.length > 0 ? (
            <>
              {/*   <Link
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
              </Link> */}

              <div className="bg-white dark:bg-gray-900 mt-6 border border-gray-200 dark:border-gray-700 shadow-lg mx-2 md:mx-0 rounded-xl">
                {/* Header */}
                <div className="flex items-center justify-center py-3 gap-3 border-b border-gray-200 dark:border-gray-700 bg-red-700 dark:bg-gray-800 rounded-t-xl">
                  <h1 className="font-bold text-lg md:text-xl uppercase tracking-wide text-gray-900 dark:text-gray-100">
                    Top News
                  </h1>
                </div>

                {/* News List */}
                <div className="px-4 py-3 space-y-4">
                  {InternationalAll.map((article: Article, idx: number) => (
                    <Link key={article.id} href={`/newsDetails/${article.id}`}>
                      <div className="relative group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden  transition-all">
                        {/* News Date on top */}
                        <div className="absolute top-2 left-2 bg-red-700 text-white text-xs px-2 py-1 rounded-full z-10">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                          )}
                        </div>

                        {/* Image */}
                        {article.newsPicture && (
                          <img
                            src={article.newsPicture}
                            alt={
                              article.newsPictureHeading || article.newsHeading
                            }
                            className="w-full h-45 object-cover"
                          />
                        )}

                        {/* Title */}
                        <div className="p-3 bg-gray-50 dark:bg-gray-800">
                          <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:underline">
                            {article.newsHeading}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  ))}
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

          {/*     <div className="flex justify-center items-center pt-4 border-t-1">
            <DeluxeTwoAdvertise />
          </div> */}
        </div>

        {/* ---------------------- middle Column ---------------------- */}
        <div className="order-1 md:order-2 md:col-span-3">
          {lastFeaturedArticle.length > 0 ? (
            <>
              <Link href={`/newsDetails/${lastFeaturedArticle[0].id}`}>
                <div className="mb-6 rounded-lg grid grid-cols-1 gap-3">
                  {/* Heading first */}
                  <h2 className="text-xl md:text-4xl font-[900] md:line-clamp-3 px-3 md:px-8">
                    {lastFeaturedArticle[0].newsHeading}
                  </h2>

                  {/* Big Image */}
                  <div className="w-full h-[220px] md:h-[380px] overflow-hidden rounded-md">
                    <img
                      src={lastFeaturedArticle[0].newsPicture}
                      alt={lastFeaturedArticle[0].newsHeading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>

              {/* Other Featured Articles */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 mt-20 md:mt-4">
                {lastFeaturedArticle.slice(1).map((article: Article) => (
                  <Link key={article.id} href={`/newsDetails/${article.id}`}>
                    <div className="max-w-md w-full mx-auto my-1 sm:max-w-xs md:max-w-md lg:max-w-lg">
                      <div className="w-auto h-[110px] md:h-[150px] border-1 rounded-xl overflow-hidden">
                        <img
                          src={article.newsPicture}
                          alt={article.newsHeading}
                          className="w-full h-full object-fit"
                        />
                      </div>
                      <div className="pt-4">
                        <h2 className="text-[14px] md:text-[16px] font-medium leading-[1.5] px-1 font-stretch-extra-condensed line-clamp-4">
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
      <CountryNewsSlider />
      {/*   popuppool */}

      <WarLatest />
      <PoolPopupComponent />
      <BesicTwoAdvertise />
      <CategoryNewsSlider />
      <ChainaLatest />
      <BesicOneAdvertise />
      <div className="mb-4">
        <div className="flex flex-row items-center space-x-2">
          <p className="font-bold text-xl uppercase border-l-8 border-primary pl-2">
            Entertainment
          </p>
        </div>
        <div className="grid grid-cols-1">
          
            <PopupOnViewServer />
            <Binodon />
        </div>
      </div>
      <AsiaLatest />
      {/* Russia Section */}
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
      {/*    <div className="grid grid-cols-1 md:grid-cols-4 mb-20">
        <IndiaLatest />
        <AfrikaLatest />
        <AustraliaLatest />
        <SouthamericaLatest />
      </div> */}
      <InstagramPosts />
      {/* <Videos /> */}
      <div className="my-20">
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
    </>
  );
}
