import React from "react";
import { prisma } from "@/app/utils/db";
import { EmptyState } from "@/components/general/EmptyState";
import {
  ShirShoNewsHeadings,
  RecentNews,
} from "@/components/general/homepageArticleList";
import { Clock, MapPin, User2 } from "lucide-react";
import { notFound } from "next/navigation";
import PrintNews from "@/components/general/printNews";
import { trackRoute } from "@/app/utils/routeTracker";
import { BesicTwoAdvertise } from "@/components/allAdvertisement/BesicTwo";
import type { Metadata } from "next";
import { StandardTwo } from "@/components/allAdvertisement/StandardTwo";
import { EnterPrizeTwo } from "@/components/allAdvertisement/EnterprizeTwo";
import { incrementArticleView } from "@/app/actions";
import NewUserTracker from "@/components/general/NewUserTracker";

// ------------------ HELPERS ------------------

type Quote = {
  id: string;
  createdAt: Date;
  text: string;
  speakerInfo: string;
  articleId: string;
};

async function getNewsArticle(articleId: string) {
  const newsArticle = await prisma.newsArticle.findUnique({
    where: { id: articleId },
    include: {
      quotes: true,
    },
  });

  if (!newsArticle) notFound();
  return newsArticle;
}

function toExcerpt(htmlOrText: string | null, max = 240) {
  const src = htmlOrText ?? "";
  const text = src
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length <= max
    ? text
    : text.slice(0, max).replace(/[,.;:!?]?\s+\S*$/, "") + "…";
}

// ------------------ METADATA ------------------

type PageParams = Promise<{ articleId: string }>;
type PageProps = { params: PageParams };

/* export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { articleId } = await params;
  const article = await getNewsArticle(articleId);

  const title = article.newsHeading ?? "News";
  const description = toExcerpt("For details click the link...");

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.globaleye.press";
  const pic = article.newsPicture ?? "/n2.png";
  const ogImage = pic.startsWith("http") ? pic : `${base}${pic}`;

  return {
    title,
    description,
    alternates: { canonical: `/newsDetails/${article.id}` },
    openGraph: {
      type: "article",
      url: "",
      title,
      description,
      siteName: "GlobalEye",
      images: [{ url: ogImage, alt: title }],
    },
  };
} */

/* export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { articleId } = await params;
  const article = await getNewsArticle(articleId);

  const title = article.newsHeading ?? "News";
  const description = toExcerpt(article.newsDetails);

  // 🔴 Must be full domain
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.globaleye.press";

  // 🔴 Ensure full image URL
  const pic = article.newsPicture || "/logo/gw.png";
  const ogImage = pic.startsWith("http") ? pic : `${base}${pic}`;

  const url = `${base}/newsDetails/${article.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "GlobalEye",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
} */

// ------------------ MAIN PAGE ------------------

type Params = Promise<{ articleId: string }>;

export default async function NewsDetailsPage({ params }: { params: Params }) {
  const { articleId } = await params;

  // Track route
  await trackRoute("NewsDetailsPage");
  // Increment view count
  await incrementArticleView(articleId);

  // Fetch updated article
  const data = await prisma.newsArticle.findUnique({
    where: { id: articleId },
    include: { quotes: true },
  });

  if (!data) {
    return (
      <EmptyState
        title="Oops! Nothing to show yet."
        description="Nothing has been added yet. Stay tuned!"
        buttonText="Homepage"
        href="/"
      />
    );
  }

  const formattedCreatedAt = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date is not available";
  <NewUserTracker />;
  return (
    <div className="grid grid-cols-5 gap-4 my-20 pt-10">
      {/* Left Sidebar */}
      <div className="col-span-5 md:col-span-1">
        <BesicTwoAdvertise />
        <div className="hidden md:block mt-10">
          <ShirShoNewsHeadings />
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-5 md:col-span-3 px-3">
        {/* Article Meta Info */}
        <div className="flex flex-col font-bold mb-1 text-xl">
          <div className="flex font-bold flex-row items-center">
            <p className="text-xl font-bold uppercase border-l-6 border-primary pl-2">
              {data.newsLocation}{" "}
              <span className="text-sm pl-2 font-light">
                {formattedCreatedAt}
              </span>
            </p>

            <NewUserTracker />
          </div>
        </div>
        {/* News Content using PrintNews */}
        <PrintNews
          id={data.id}
          newsDetails={data.newsDetails}
          newsResource={data.newsResource}
          newsPicture={data.newsPicture}
          newsLocation={data.newsLocation}
          newsPictureHeading={data.newsPictureHeading}
          newsPictureCredit={data.newsPictureCredit}
          newsHeading={data.newsHeading}
          newsSubHeading={data.newsSubHeading}
          newsReporterPublicName={data.newsReporterPublicName}
          createdAt={data.createdAt}
          quotes={data.quotes ?? []}
        />

        {/* View Counter */}
        <p className="text-sm text-gray-600 mb-3">
          👁‍🗨 Views: {data.viewCount ?? 0}
        </p>

        {/* Bottom Banner */}
        <div className="w-full mb-6">
          <StandardTwo />

          {/* Quotes */}
          {data.quotes && data.quotes.length > 0 && (
            <div className="mt-6 px-4 space-y-4">
              {data.quotes.map((quote: Quote) => (
                <div
                  key={quote.id}
                  className="flex flex-col border-l-4 border-primary pl-4 bg-accent-foreground/5 p-4 rounded-3xl min-h-[100px] text-justify"
                >
                  <p className="italic mb-6">"{quote.text}"</p>
                  <p className="text-right text-sm text-accent-foreground/60">
                    — {quote.speakerInfo}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-5 md:col-span-1">
        <div className="flex flex-col items-center rounded-2xl mx-auto">
          <div className="mt-16">
            <RecentNews />
          </div>
          <div className="block md:hidden mt-10 border-t-1 p-2">
            <ShirShoNewsHeadings />
          </div>
          <EnterPrizeTwo />
        </div>
      </div>
    </div>
  );
}
