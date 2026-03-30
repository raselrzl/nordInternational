import { prisma } from "@/app/utils/db";
import Image from "next/image";
import { EmptyState } from "./EmptyState";
import Link from "next/link";
import { isJson } from "@/app/utils/isJson";
import { JsonToHtml } from "../richTextEditor/JsonToHtml";
import { SuperOne } from "../allAdvertisement/SuperOne";
import { List } from "lucide-react";

// getAllArticles.ts
export async function getAllArticles() {
  return await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE" },
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
}

export async function getBinodonNews() {
  return await prisma.newsArticle.findMany({
    where: { newsCategory: "ENTERTAINMENT" },
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
}

// getLastFeaturedArticle.ts
export async function getLastFeaturedArticle() {
  return await prisma.newsArticle.findFirst({
    where: {
      newsArticleStatus: "ACTIVE",
      isFeatured: true,
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// getLatestNews.ts
export async function getLatestNews() {
  return await prisma.newsArticle.findMany({
    where: { newsCategory: "LATEST" },
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
}

export async function getScienceNews() {
  return await prisma.newsArticle.findMany({
    where: {
      newsCategory: {
        in: ["SCIENCE", "TECHNOLOGY"],
      },
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
}

export async function getScienceNewsHead() {
  return await prisma.newsArticle.findMany({
    where: {
      newsCategory: {
        in: ["SCIENCE", "TECHNOLOGY"],
      },
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
}
// getEnvironmentNews.ts
export async function getEnvironmentNews() {
  return await prisma.newsArticle.findFirst({
    where: {
      newsCategory: "ENVIRONMENT",
      isFeatured: true,
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// getPoliticsNews.ts
export async function getPoliticsNews() {
  return await prisma.newsArticle.findMany({
    where: { newsCategory: "POLITICS" },
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
}

export default async function AllArticleList() {
  const allArticles = await getAllArticles();
  const lastFeaturedArticle = await getLastFeaturedArticle();

  return (
    <>
      {lastFeaturedArticle && Object.keys(lastFeaturedArticle).length > 0 ? (
        <div className="mb-6 max-h-[320px] md:border-1 md:p-2 ">
          {lastFeaturedArticle && (
            <Link
              href={`/newsDetails/${lastFeaturedArticle.id}`}
              className="mb-10"
            >
              <div className="grid grid-cols-5">
                <div className="w-full max-h-[240px] md:max-h-[270px] border md:rounded-xl overflow-hidden col-span-5 md:col-span-3 mt-10 md:mt-0">
                  <img
                    src={lastFeaturedArticle.newsPicture}
                    alt="picture"
                    width={500}
                    height={270}
                    className="w-full h-full object-fit"
                  />
                </div>
                <div className="pl-1 md:pl-4 col-span-5 md:col-span-2">
                  <h2 className="text-lg md:text-2xl font-semibold mt-2 pl-2 md:pl-0">
                    {lastFeaturedArticle.newsHeading}
                  </h2>
                  {/*     <p className="text-[14px] text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2 md:p">
                    {lastFeaturedArticle.newsDetails}
                  </p> */}

                  {isJson(lastFeaturedArticle.newsDetails) ? (
                    <div className="text-[14px] text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2 md:p">
                      <JsonToHtml
                        json={JSON.parse(lastFeaturedArticle.newsDetails)}
                      />
                    </div>
                  ) : (
                    <p className="text-[14px] text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2 md:p">
                      {lastFeaturedArticle.newsDetails}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )}
        </div>
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
      <div className="px-2 md:px-0">
        <SuperOne country="Sweden" />
      </div>

      {allArticles && Object.keys(allArticles).length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-6 px-2 border-y-1 md:border-1 my-10">
          {allArticles.slice(1, 7).map((article) => (
            <Link href={`/newsDetails/${article.id}`} key={article.id}>
              <div className="max-w-md w-full mx-auto my-1 sm:max-w-xs md:max-w-md lg:max-w-lg">
                <div className="w-auto h-[110px] md:h-[150px] border-1 rounded-xl overflow-hidden">
                  <img
                    src={article.newsPicture}
                    alt="picture"
                    width={190}
                    height={140}
                    className="w-full h-full md:h-[150px] object-fit"
                  />
                </div>

                <div className="pt-4">
                  <h2 className="text-[15px] font-semibold leading-[1.5] px-1 font-stretch-extra-condensed">
                    {article.newsHeading}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}

export async function RecentNews() {
  const latestNews = await getLatestNews();

  return (
    <>
      <div className="order-3 md:order-1 md:col-span-1 p-2 border-1">
        <div className="font-extrabold pl-2 mb-2 flex text-md uppercase my-4">
          Top News
        </div>
        {latestNews && latestNews.length > 0 ? (
          latestNews.map((item) => (
            <Link key={item.id} href={`/newsDetails/${item.id}`}>
              <div className="grid grid-cols-3 border-b py-2">
                <div className="col-span-1">
                  <img
                    src={item.newsPicture}
                    alt="Card Image"
                    className="w-32 h-16 object-cover border"
                  />
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-semibold ml-2">
                    {item.newsHeading}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <EmptyState
            title="Oops! There's nothing to show yet."
            description="Nothing has been added yet. Stay tuned!"
            buttonText="Homepage"
            href="/"
          />
        )}
      </div>
    </>
  );
}

export async function CrimeHEadings() {
  const Environment = await getEnvironmentNews();
  return (
    <>
      {Environment && Object.keys(Environment).length > 0 ? (
        <Link href={`/newsDetails/${Environment.id}`}>
          <div className="max-w-sm rounded-lg overflow-hidden shadow-md border mt-2">
            <div className="p-1">
              <h2 className="text-lg font-semibold ">
                {Environment.newsHeading}
              </h2>
            </div>
            <img
              src={Environment.newsPicture}
              alt="Card image"
              className="w-full h-40 object-cover"
            />
          </div>
        </Link>
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}

export async function ShirShoNewsHeadings() {
  const Politics = await getPoliticsNews();

  return (
    <>
      {Politics && Object.keys(Politics).length > 0 ? (
        <div className="bg-primary/55 dark:bg-gray-700 mt-6 border border-primary/55 dark:border-gray-600 shadow-md mx-2 md:mx-0">
          {/* Header */}
          <div className="flex items-center justify-center py-3 gap-2 border-b border-primary/55 dark:border-gray-600">
            <h1 className="font-bold text-md uppercase text-gray-900 dark:text-gray-100 tracking-wide">
              Important & Trending
            </h1>
          </div>

          {/* Scrollable content */}
          <div className="relative h-82 md:h-92 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-transparent px-4 py-3">
            <div className="space-y-3">
              {Politics.map((article) => (
                <Link key={article.id} href={`/newsDetails/${article.id}`}>
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
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}

export async function GututtoPurnoAlochito() {
  const guruttopurno = await getPoliticsNews();

  return (
    <>
      {guruttopurno && Object.keys(guruttopurno).length > 0 ? (
        <div className="py-2">
          {guruttopurno.map((article) => (
            <Link href={`/newsDetails/${article.id}`} key={article.id}>
              <div className="max-w-sm rounded-lg overflow-hidden shadow-md border m-2 px-2 py-1 hover:bg-accent-foreground/5 transition-opacity">
                <div className="p-1">
                  <h2 className="text-lg text-accent-foreground font-semibold line-clamp-1">
                    {article.newsHeading}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}

export async function SamprotikBisoy() {
  const samprotik = await getLatestNews();

  return (
    <>
      <div className="py-2 bg-amber-50">
        {samprotik && samprotik.length > 0 ? (
          samprotik.map((item) => (
            <Link key={item.id} href={`/newsDetails/${item.id}`}>
              <div className="max-w-sm rounded-lg overflow-hidden shadow-md border m-2 px-2 py-1 hover:bg-accent-foreground/5 transition-opacity">
                <div className="p-1">
                  <h2 className="text-lg text-accent-foreground font-semibold line-clamp-1">
                    {item.newsHeading}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <EmptyState
            title="Oops! There's nothing to show yet."
            description="Nothing has been added yet. Stay tuned!"
            buttonText="Homepage"
            href="/"
          />
        )}
      </div>
    </>
  );
}

export async function ScienceNews() {
  const science = await getScienceNews();

  return (
    <>
      {science && science.length > 0 ? (
        science.slice(1).map((item) => (
          <Link key={item.id} href={`/newsDetails/${item.id}`}>
            <div className="shadow-xl my-2 border-2">
              <div className="flex">
                {/* Image: Half width */}
                <div className="w-1/2 pr-2">
                  <img
                    src={item.newsPicture}
                    alt="Card Image"
                    className="w-full h-28 object-cover"
                  />
                </div>
                {/* Text: Half width */}
                <div className="w-1/2 flex items-center">
                  <h3 className="text-sm font-semibold">{item.newsHeading}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}

export async function ScienceNewsHeadPost() {
  const scienceheadpost = await getScienceNewsHead();

  return (
    <>
      <div className="flex flex-row items-center space-x-2 ">
        {/*    <img
          src="/clock.gif"
          alt="YouTube GIF"
          width={50} // adjust as needed
          height={50}
          className="object-contain"
        /> */}
        <h2 className="flex items-center gap-2 text-lg md:text-xl font-extrabold uppercase border-l-8 pl-2 border-primary">
          Science and Tech
        </h2>
        {/* <p className="font-bold text-2xl uppercase"></p> */}
      </div>
      {scienceheadpost && scienceheadpost.length > 0 ? (
        scienceheadpost.map((item) => (
          <Link key={item.id} href={`/newsDetails/${item.id}`}>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-md border mt-2">
              <div className="p-1">
                <h2 className="text-lg font-semibold ">{item.newsHeading}</h2>
              </div>
              <img
                src={item.newsPicture}
                alt="Card image"
                className="w-full h-40 object-cover"
              />
            </div>
          </Link>
        ))
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}

export async function Bachaikreto() {
  const Bachaikreto = await getEnvironmentNews();
  return (
    <>
      <div className="flex flex-row items-center space-x-2">
        <img
          src="/clock.gif"
          alt="YouTube GIF"
          width={50} // adjust as needed
          height={50}
          className="object-contain"
        />
        <p className="font-bold text-2xl">Selected</p>
      </div>
      {Bachaikreto && Object.keys(Bachaikreto).length > 0 ? (
        <Link href={`/newsDetails/${Bachaikreto.id}`}>
          <div className="w-full rounded-lg shadow-md border flex flex-col justify-between mt-2">
            <div className="pt-2">
              <h2 className="text-lg font-semibold text-center">
                {Bachaikreto.newsHeading}
              </h2>
            </div>
            <img
              src={Bachaikreto.newsPicture}
              alt="Card image"
              className="w-full h-40 object-cover"
            />
          </div>
        </Link>
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}

export async function Binodon() {
  const Binodon = await getBinodonNews();
  return (
    <>
      {Binodon && Object.keys(Binodon).length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6 px-2 my-10">
          {Binodon.map((article) => (
            <Link href={`/newsDetails/${article.id}`} key={article.id}>
              <div className="max-w-md w-full">
                {/* Image Container */}
                <div className="relative w-auto h-70 md:h-85 border rounded-xl overflow-hidden">
                  <img
                    src={article.newsPicture}
                    alt="picture"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay (bottom dark) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Text on Image */}
                  <div className="absolute bottom-0 p-3">
                    <h2 className="text-white text-sm md:text-lg font-semibold leading-[1.4] line-clamp-2">
                      {article.newsHeading}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Oops! There's nothing to show yet."
          description="Nothing has been added yet. Stay tuned!"
          buttonText="Homepage"
          href="/"
        />
      )}
    </>
  );
}

// getsorboseshnews
export async function getCrimeNews() {
  return await prisma.newsArticle.findMany({
    where: { newsCategory: "CRIME" },
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}
export async function Latest() {
  const crime = await getCrimeNews();

  return (
    <>
      <div className="min-h-[450px] overflow-y-auto">
        {crime && crime.length > 0 ? (
          crime.slice(0, 10).map((item) => (
            <Link key={item.id} href={`/newsDetails/${item.id}`}>
              <div className="max-w-sm text-start rounded-lg overflow-hidden m-6 px-2 py-1 hover:bg-accent-foreground/5 transition-opacity">
                <div className="p-1 flex gap-8 items-start">
                  {/* Big circle dot */}
                  <span className="mt-2 w-3 h-3 rounded-full bg-black dark:bg-white flex-shrink-0"></span>

                  <h2 className="text-md text-accent-foreground font-semibold line-clamp-3">
                    {item.newsHeading}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <EmptyState
            title="Oops! There's nothing to show yet."
            description="Nothing has been added yet. Stay tuned!"
            buttonText="Homepage"
            href="/"
          />
        )}
      </div>
    </>
  );
}

// getsorboseshnews
export async function getLatestPoliticsNews() {
  return await prisma.newsArticle.findMany({
    where: { newsCategory: "POLITICS" },
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
          speakerInfo: true,
          text: true,
        },
      },
      newsResource: true,
      newsPictureHeading: true,
      newsPictureCredit: true,
      newsLocation: true,
      newsReporter: true,
      newsArticleStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}
export async function PoliticsNews() {
  const politics = await getLatestPoliticsNews();

  return (
    <>
      <div className="min-h-[450px] overflow-y-auto">
        {politics && politics.length > 0 ? (
          politics.slice(0, 10).map((item) => (
            <Link key={item.id} href={`/newsDetails/${item.id}`}>
              <div className="max-w-sm rounded-lg overflow-hidden m-6 px-2 py-1 hover:bg-accent-foreground/5 transition-opacity">
                <div className="p-1 flex gap-8 items-start">
                  {/* Big circle dot */}
                  <span className="mt-2 w-3 h-3 rounded-full bg-black dark:bg-white flex-shrink-0"></span>

                  <h2 className="text-md text-accent-foreground font-semibold line-clamp-3">
                    {item.newsHeading}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <EmptyState
            title="Oops! There's nothing to show yet."
            description="Nothing has been added yet. Stay tuned!"
            buttonText="Homepage"
            href="/"
          />
        )}
      </div>
    </>
  );
}
