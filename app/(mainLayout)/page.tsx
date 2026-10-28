
import React, { Suspense } from "react";
import { prisma } from "../utils/db";
import { EmptyState } from "@/components/general/EmptyState";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { trackRoute } from "../utils/routeTracker";

// Advertisement & Sections
import { ProOneAdvertise } from "@/components/allAdvertisement/ProOne";
import { PremiumOneAdvertise } from "@/components/allAdvertisement/PremiumOne";
import { PremiumTwoAdvertise } from "@/components/allAdvertisement/PremiumTwo";
import { PremiarOne } from "@/components/allAdvertisement/PremiarOne";
import {
  Binodon,
  ScienceNews,
  ScienceNewsHeadPost,
} from "@/components/general/homepageArticleList";
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
import { BesicOneAdvertise } from "@/components/allAdvertisement/BesicOne";
import { BesicTwoAdvertise } from "@/components/allAdvertisement/BesicTwo";
import CountryNewsSlider from "@/components/general/CountryNewsSlider";
import PoolPopupComponent from "@/components/general/PoolPopupComponent";

// ---------------------- TYPES ----------------------

type HomepageArticle = {
  id: string;
  createdAt: Date;
  newsHeading: string;
  newsPicture: string;
  newsPictureHeading?: string;
};

type HomepageData = {
  lastFeaturedArticle: HomepageArticle[];
  latestUSANews: HomepageArticle[];
  InternationalAll: HomepageArticle[];
};

// ---------------------- DATA FETCH ----------------------

async function getData(): Promise<HomepageData> {
  const [
    lastFeaturedArticle,
    latestUSANews,
    InternationalAll,
  ] = await Promise.all([
    // Featured homepage articles
    prisma.newsArticle.findMany({
      where: {
        newsArticleStatus: "ACTIVE",
        isFeatured: true,
      },
      select: {
        id: true,
        createdAt: true,
        newsHeading: true,
        newsPicture: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 7,
    }),

    // USA highlights
    prisma.newsArticle.findMany({
      where: {
        newsLocation: "Usa",
      },
      select: {
        id: true,
        createdAt: true,
        newsHeading: true,
        newsPicture: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    // International top news
    prisma.newsArticle.findMany({
      where: {
        newsCategory: "INTERNATIONAL",
      },
      select: {
        id: true,
        createdAt: true,
        newsHeading: true,
        newsPicture: true,
        newsPictureHeading: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return {
    lastFeaturedArticle,
    latestUSANews,
    InternationalAll,
  };
}

// ---------------------- COMPONENT ----------------------

export default async function Home() {
  // Start independent server operations concurrently.
  const [
    {
      lastFeaturedArticle,
      latestUSANews,
      InternationalAll,
    },
    _tracked,
    _session,
  ] = await Promise.all([
    getData(),
    trackRoute("Home"),
    aauth(),
  ]);

  return (
    <>
      {/* ---------------------- LIVE UPDATES ---------------------- */}

      <div className="mb-2 grid grid-cols-3 items-center px-2">
        <div className="col-span-3 md:col-span-2">
          <LiveUpdate />
        </div>
      </div>

      {/* ---------------------- MAIN NEWS GRID ---------------------- */}

      <div className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-5">

        {/* ---------------------- LEFT COLUMN: USA ---------------------- */}

        <div className="order-3 px-2 sm:px-0 md:order-1 md:col-span-1">
          <div className="mb-3 flex items-center gap-2 border-b pb-2">
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
              {/* Featured USA story */}

              <Link
                href={`/newsDetails/${latestUSANews[0].id}`}
                className="group mb-4 block"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={latestUSANews[0].newsPicture}
                    alt={latestUSANews[0].newsHeading}
                    width={640}
                    height={360}
                    fetchPriority="high"
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <h3 className="absolute bottom-0 line-clamp-3 p-3 text-sm font-bold text-white">
                    {latestUSANews[0].newsHeading}
                  </h3>
                </div>
              </Link>

              {/* Remaining USA stories */}

              <div className="flex flex-col divide-y">
                {latestUSANews.slice(1).map((item) => (
                  <Link
                    key={item.id}
                    href={`/newsDetails/${item.id}`}
                    className="group flex gap-2 py-3"
                  >
                    <img
                      src={item.newsPicture}
                      alt={item.newsHeading}
                      width={100}
                      height={90}
                      loading="lazy"
                      className="h-[72px] w-20 shrink-0 rounded-md object-cover"
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

          {/* Advertisement */}

          <div className="mt-6">
            <Suspense
              fallback={
                <Loader2
                  className="mx-auto animate-spin"
                  aria-label="Loading advertisement"
                />
              }
            >
              <ProOneAdvertise />
            </Suspense>
          </div>
        </div>

        {/* ---------------------- RIGHT COLUMN: TOP NEWS ---------------------- */}

        <div className="order-2 md:order-3 md:col-span-1">
          <Suspense
            fallback={
              <Loader2
                className="animate-spin"
                aria-label="Loading advertisement"
              />
            }
          >
            <PremiumOneAdvertise />
          </Suspense>

          {InternationalAll.length > 0 ? (
            <div className="mx-2 mt-6 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 md:mx-0">
              {/* Header */}

              <div className="flex items-center justify-center gap-3 rounded-t-xl border-b border-gray-200 bg-red-700 py-3 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-lg font-bold uppercase tracking-wide text-white md:text-xl">
                  Top News
                </h2>
              </div>

              {/* News List */}

              <div className="space-y-4 px-4 py-3">
                {InternationalAll.map((article) => (
                  <Link
                    key={article.id}
                    href={`/newsDetails/${article.id}`}
                    className="block"
                  >
                    <div className="group relative overflow-hidden rounded-lg border border-gray-200 transition-all dark:border-gray-700">
                      <div className="absolute left-2 top-2 z-10 rounded-full bg-red-700 px-2 py-1 text-xs text-white">
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </div>

                      {article.newsPicture && (
                        <img
                          src={article.newsPicture}
                          alt={
                            article.newsPictureHeading ||
                            article.newsHeading
                          }
                          width={640}
                          height={360}
                          loading="lazy"
                          className="h-45 w-full object-cover"
                        />
                      )}

                      <div className="bg-gray-50 p-3 dark:bg-gray-800">
                        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:underline dark:text-gray-100 md:text-base">
                          {article.newsHeading}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              title="Oops! Nothing to show yet."
              description="Nothing has been added yet. Stay tuned!"
              buttonText="Homepage"
              href="/"
            />
          )}
        </div>

        {/* ---------------------- MIDDLE COLUMN: FEATURED ---------------------- */}

        <div className="order-1 md:order-2 md:col-span-3">
          {lastFeaturedArticle.length > 0 ? (
            <>
              {/* Main featured article */}

              <Link
                href={`/newsDetails/${lastFeaturedArticle[0].id}`}
                className="block"
              >
                <div className="mb-6 grid grid-cols-1 gap-3 rounded-lg">
                  <h1 className="px-3 text-xl font-black md:line-clamp-3 md:px-8 md:text-4xl">
                    {lastFeaturedArticle[0].newsHeading}
                  </h1>

                  <div className="h-[220px] w-full overflow-hidden rounded-md md:h-[380px]">
                    <img
                      src={lastFeaturedArticle[0].newsPicture}
                      alt={lastFeaturedArticle[0].newsHeading}
                      width={1200}
                      height={700}
                      fetchPriority="high"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </Link>

              {/* Remaining featured articles */}

              <div className="mt-20 grid grid-cols-2 gap-2 p-2 md:mt-4 md:grid-cols-3">
                {lastFeaturedArticle.slice(1).map((article) => (
                  <Link
                    key={article.id}
                    href={`/newsDetails/${article.id}`}
                    className="block"
                  >
                    <div className="my-1 w-full">
                      <div className="h-[110px] overflow-hidden rounded-xl border md:h-[150px]">
                        <img
                          src={article.newsPicture}
                          alt={article.newsHeading}
                          width={500}
                          height={300}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="pt-4">
                        <h2 className="line-clamp-4 px-1 text-[14px] font-medium leading-[1.5] md:text-[16px]">
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

      {/* ---------------------- REMAINING HOMEPAGE SECTIONS ---------------------- */}

      <CountryNewsSlider />

      <WarLatest />

      <PoolPopupComponent />

      <BesicTwoAdvertise />

      <ChainaLatest />

      <BesicOneAdvertise />

      {/* Entertainment */}

      <section className="mb-4">
        <div className="flex flex-row items-center space-x-2">
          <p className="border-l-8 border-primary pl-2 text-xl font-bold uppercase">
            Entertainment
          </p>
        </div>

        <div className="grid grid-cols-1">
          <PopupOnViewServer />
          <Binodon />
        </div>
      </section>

      <AsiaLatest />

      {/* Russia and opinions */}

      <section className="my-8">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="mx-4 py-4 md:mx-0">
            <RussiaLatest />
          </div>

          <div className="py-4">
            <Suspense
              fallback={
                <Loader2
                  className="mx-auto animate-spin"
                  aria-label="Loading advertisement"
                />
              }
            >
              <PremiarOne />
            </Suspense>

            <h2 className="mt-8 bg-gradient-to-r from-orange-500 via-white to-black bg-clip-text text-center text-2xl font-extrabold tracking-wide text-transparent md:text-3xl">
              Best Memories
            </h2>

            <Image
              src="/jewish.png"
              alt="Jewish entering Palestine after World War II"
              height={300}
              width={400}
              sizes="(max-width: 768px) 100vw, 400px"
              className="mx-2 border"
            />
          </div>

          <div className="py-4">
            <LatestOpinions />
          </div>
        </div>
      </section>

      {/* Instagram */}

      <InstagramPosts />

      {/* Science news */}

      <section className="my-20">
        <div className="my-4 grid grid-cols-3 border-primary">
          <div className="col-span-3 mt-2 flex w-full max-w-sm flex-col justify-between p-2 md:col-span-1 md:mx-0">
            <ScienceNewsHeadPost />

            <PremiumTwoAdvertise />
          </div>

          <div className="col-span-3 mt-2 grid grid-cols-1 gap-2 p-2 md:col-span-2 md:grid-cols-2">
            <ScienceNews />
          </div>
        </div>
      </section>

      {/* Middle East */}

      <MiddleeastLatest />
    </>
  );
}
