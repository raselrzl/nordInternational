import React from "react";
import { prisma } from "@/app/utils/db";
import { EmptyState } from "@/components/general/EmptyState";
import {
  ShirShoNewsHeadings,
  SirshoNewsList,
} from "@/components/general/homepageArticleList";
import { Clock, Notebook, User2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import PrintNews from "@/components/general/printNews";
import { PrintNewsDetailsClient } from "../../../../components/general/PrintNewsClient";
import { trackRoute } from "@/app/utils/routeTracker";
import { ProOneAdvertise } from "@/components/allAdvertisement/ProOne";
import { PremiarOne } from "@/components/allAdvertisement/PremiarOne";
import { BesicOneAdvertise } from "@/components/allAdvertisement/BesicOne";
import { BesicTwoAdvertise } from "@/components/allAdvertisement/BesicTwo";
import { SizeTwoAdvertise } from "@/components/allAdvertisement/SizeTwo";

async function getNewsArticle(articleId: string) {
  const newsArticle = await prisma.newsArticle.findUnique({
    where: {
      id: articleId,
    },
    select: {
      id: true,
      createdAt: true,
      isFeatured: true,
      newsCategory: true,
      newsDetails: true,
      newsHeading: true,
      newsPicture: true,
      quotes: {
        select: {
          id: true,
          createdAt: true,
          text: true,
          speakerInfo: true,
          articleId: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
  });

  if (!newsArticle) notFound();

  return newsArticle;
}




/* // app/newsDetails/[articleId]/page.tsx
import type { Metadata } from "next";

// if you already use this in the page:
type PageParams = Promise<{ articleId: string }>;
type PageProps = { params: PageParams };

function toExcerpt(htmlOrText: string | null, max = 240) {
  const src = htmlOrText ?? "";
  const text = src.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length <= max
    ? text
    : text.slice(0, max).replace(/[,.;:!?]?\s+\S*$/, "") + "…";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { articleId } = await params;              // ✅ await params
  const article = await getNewsArticle(articleId); // your existing fetch

  const title = article.newsHeading ?? "News";
  const description = toExcerpt(article.newsDetails, 240);

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jagrotobarta.com";
  const pic = article.newsPicture ?? "/og-default.jpg";
  const ogImage = pic.startsWith("http") ? pic : `${base}${pic}`;

  return {
    title,
    description,
    // with metadataBase set in root layout, a relative path is fine:
    alternates: { canonical: `/newsDetails/${article.id}` },
    openGraph: {
      type: "article",
      url: `/newsDetails/${article.id}`,
      title,
      description,
      siteName: "Nord Internation",
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}



 */



type Params = Promise<{ articleId: string }>;

export default async function NewsDetailsPage({ params }: { params: Params }) {
  const { articleId } = await params;
  const data = await getNewsArticle(articleId);
  await trackRoute("NewsDetailsPage");

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

  // Format the createdAt date before passing it to the UI
  const formattedCreatedAt = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "তারিখ পাওয়া যায়নি";

  return (
    <div className="grid grid-cols-5 gap-4 my-10">
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
        <div className="flex flex-row font-bold mb-1 md:text-xl">
          <div className="flex flex-row pl-2">
            <User2 className="size-4 md:size-5 pt-1" />
            <p>NORD Reporter</p>
          </div>
          <div className="flex flex-row  pl-2">
            <Clock className="size-4 md:size-5 pt-1" />
            <p className="font-bold">{formattedCreatedAt}</p>
          </div>
        </div>

        {/* News Content using PrintNews component */}
        <PrintNews
          id={data.id}
          newsDetails={data.newsDetails}
          newsResource={data.newsResource}
          newsPicture={data.newsPicture}
          newsLocation={data.newsLocation}
          newsPictureHeading={data.newsPictureHeading}
          newsPictureCredit={data.newsPictureCredit}
          newsHeading={data.newsHeading}
          createdAt={data.createdAt} // <--- Pass createdAt here
          quotes={data.quotes ?? []}
        />

        {/* Bottom Banner */}
        <div className="relative w-full h-[100px] md:h-[200px] px-10">
          <SizeTwoAdvertise />
        </div>

        {/* Quotes Section */}
        {data.quotes && data.quotes.length > 0 && (
          <div className="mt-6 px-4">
            <div className="space-y-4">
              {data.quotes.map((quote, index) => (
                <div
                  key={index}
                  className="relative border-l-4 border-primary pl-4 bg-accent-foreground/5 p-4 rounded-3xl min-h-[100px] text-justify"
                >
                  <p className="italic mb-6">"{quote.text}"</p>
                  <p className="absolute bottom-2 right-4 text-sm text-accent-foreground/60">
                    — {quote.speakerInfo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="col-span-5 md:col-span-1">
        <div className="flex flex-col items-center rounded-2xl mx-auto">
          <BesicOneAdvertise />
          <div className="border-t-1 p-2">
            <h1 className="font-extrabold mb-2 ml-6">{`>>>`}Recent News</h1>
            <SirshoNewsList />
          </div>
          <div className="block md:hidden mt-10 border-t-1 p-2">
            <ShirShoNewsHeadings />
          </div>
        </div>
      </div>
    </div>
  );
}
