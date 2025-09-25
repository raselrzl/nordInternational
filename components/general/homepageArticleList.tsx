import { prisma } from "@/app/utils/db";
import Image from "next/image";
import { EmptyState } from "./EmptyState";
import SocialLinks from "./socialLink";
import Link from "next/link";
import { Clock } from "lucide-react";
import { isJson } from "@/app/utils/isJson";
import { JsonToHtml } from "../richTextEditor/JsonToHtml";
import { PremiarOne } from "./allAdvertisement/PremiarOne";
import { SuperOne } from "./allAdvertisement/SuperOne";
import { SizeOneAdvertise } from "./allAdvertisement/SizeOne";

/* async function getData() {
  const [allArticles, lastFeaturedArticle, latestNews, Environment, Politics] =
    await Promise.all([
      prisma.newsArticle.findMany({
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
      }),

      prisma.newsArticle.findFirst({
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
      }),

      prisma.newsArticle.findMany({
        where: { newsCategory: "EDUCATION" },
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
      }),

      prisma.newsArticle.findFirst({
        where: {
          newsCategory: "EDUCATION",
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
      }),

      prisma.newsArticle.findMany({
        where: { newsCategory: "EDUCATION" },
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
      }),
    ]);

  return {
    allArticles,
    lastFeaturedArticle,
    latestNews,
    Environment,
    Politics,
  };
} */
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
    take: 6,
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
    where: { newsCategory: "EDUCATION" },
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
    where: { newsCategory: "SCIENCE" },
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
    take: 6,
  });
}

export async function getScienceNewsHead() {
  return await prisma.newsArticle.findMany({
    where: { newsCategory: "SCIENCE" },
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
      newsCategory: "EDUCATION",
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
    where: { newsCategory: "EDUCATION" },
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
                  <Image
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
                    <span className="md:hidden sm:block">Details....</span>
                  </h2>
                  {/*     <p className="text-sm md:text-lg text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2 md:p">
                    {lastFeaturedArticle.newsDetails}
                  </p> */}

                  {isJson(lastFeaturedArticle.newsDetails) ? (
                    <div className="text-sm md:text-lg text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2 md:p">
                      <JsonToHtml
                        json={JSON.parse(lastFeaturedArticle.newsDetails)}
                      />
                    </div>
                  ) : (
                    <p className="text-sm md:text-lg text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2 md:p">
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
        <SuperOne />
      </div> 

      {allArticles && Object.keys(allArticles).length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-6 px-2 border-y-1 md:border-1 my-10">
          {allArticles.slice(1, 7).map((article) => (
            <Link href={`/newsDetails/${article.id}`} key={article.id}>
              <div className="max-w-md w-full mx-auto my-1 sm:max-w-xs md:max-w-md lg:max-w-lg">
                <div className="w-auto h-[110px] md:h-[150px] border-1 rounded-xl overflow-hidden">
                  <Image
                    src={article.newsPicture}
                    alt="picture"
                    width={190}
                    height={140}
                    className="w-full h-full md:h-[150px] object-fit"
                  />
                </div>

                <div className="pt-4">
                  <h2 className="text-[17px] font-semibold leading-[1.5] px-1 font-stretch-extra-condensed">
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

export async function SirshoNewsList() {
  const latestNews = await getLatestNews();

  return (
    <>
      <div className="order-3 md:order-1 md:col-span-1 p-2 border-1">
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
                  <h3 className="text-lg font-semibold ml-2">
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

        <SizeOneAdvertise />
        <div className="mt-10 text-left flex-col hidden sm:block">
          <p className="text-sm font-semibold text-primary text-justify">
            Follow our social media accounts for the latest updates and
            exclusive content.
          </p>
          <SocialLinks />
        </div>
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
        <div className="bg-primary-foreground dark:bg-accent-foreground/5 py-2">
          <h1 className="font-extrabold mb-2 pl-4 text-2xl">
            {" "}
            {`>>>`}Important and Trending
          </h1>
          <div className="rounded-xl py-2">
            {Politics.map((article) => (
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
                  <h3 className="text-lg font-semibold">{item.newsHeading}</h3>
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
      <div className="flex flex-row items-center space-x-2">
        <Image
          src="/clock.gif"
          alt="YouTube GIF"
          width={50} // adjust as needed
          height={50}
          className="object-contain"
        />
        <p className="font-bold text-2xl">Science and Research</p>
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
        <Image
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
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-2">
          <Image
            src="/binodon.gif"
            alt="YouTube GIF"
            width={50} // adjust as needed
            height={50}
            className="object-contain"
          />
          <p className="font-bold text-2xl">Entertainment</p>
        </div>
        <div className="md:block hidden">
          <Image
            src="/arrow.gif"
            alt="YouTube GIF"
            width={50} // adjust as needed
            height={50}
            className="object-contain "
          />
        </div>
      </div>
      {Binodon && Object.keys(Binodon).length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-6 px-2 border-y-1 md:border-1 my-10">
          {Binodon.map((article) => (
            <Link href={`/newsDetails/${article.id}`} key={article.id}>
              <div className="max-w-md w-full mx-auto my-1 sm:max-w-xs md:max-w-md lg:max-w-lg">
                <div className="w-auto h-[110px] md:h-[150px] border-1 rounded-xl overflow-hidden">
                  <Image
                    src={article.newsPicture}
                    alt="picture"
                    width={190}
                    height={140}
                    className="w-full h-full md:h-[150px] object-fit"
                  />
                </div>

                <div className="pt-4">
                  <h2 className="text-[17px] font-semibold leading-[1.5] px-1 font-stretch-extra-condensed line-clamp-2">
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

// getsorboseshnews
export async function getSorboseshNews() {
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
    take: 10,
  });
}
export async function SorboseshNews() {
  const sorbosesh = await getSorboseshNews();

  const convertToBanglaNumber = (number: number): string => {
    const banglaDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

  return (
    <>
      <div className="py-2 min-h-[450px] overflow-y-auto">
        {sorbosesh && sorbosesh.length > 0 ? (
          sorbosesh.slice(0, 10).map((item, index) => (
            <Link key={item.id} href={`/newsDetails/${item.id}`}>
              <div className="max-w-sm rounded-lg overflow-hidden shadow-md border m-2 px-2 py-1 hover:bg-accent-foreground/5 transition-opacity">
                <div className="p-1 flex gap-2 items-start">
                  <span className="text-lg font-bold text-primary">
                    {convertToBanglaNumber(index + 1)}.
                  </span>
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

// getsorboseshnews
export async function getJonoprioNews() {
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
    take: 10,
  });
}
export async function JonoprioNews() {
  const sorbosesh = await getJonoprioNews();

  const convertToBanglaNumber = (number: number): string => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

  return (
    <>
      <div className="py-2 min-h-[450px] overflow-y-auto">
        {sorbosesh && sorbosesh.length > 0 ? (
          sorbosesh.slice(0, 10).map((item, index) => (
            <Link key={item.id} href={`/newsDetails/${item.id}`}>
              <div className="max-w-sm rounded-lg overflow-hidden shadow-md border m-2 px-2 py-1 hover:bg-accent-foreground/5 transition-opacity">
                <div className="p-1 flex gap-2 items-start">
                  <span className="text-lg font-bold text-primary">
                    {convertToBanglaNumber(index + 1)}.
                  </span>
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
