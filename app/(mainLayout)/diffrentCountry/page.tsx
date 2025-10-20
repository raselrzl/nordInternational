import { prisma } from "@/app/utils/db";
import { isJson } from "@/app/utils/isJson";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import { EmptyState } from "@/components/general/EmptyState";
import { JsonToHtml } from "@/components/richTextEditor/JsonToHtml";
import Image from "next/image";
import Link from "next/link";

const euCountries = [
  { name: "Austria", flag: "/flags/Austria.png" },
  { name: "Bangladesh", flag: "/flags/bangladesh.jpg" },
  { name: "Belgium", flag: "/flags/belgium.webp" },
  { name: "Bulgaria", flag: "/flags/bulgaria.webp" },
  { name: "Croatia", flag: "/flags/croatia.webp" },
  { name: "Cyprus", flag: "/flags/cyprus.jpg" },
  { name: "Czech Republic", flag: "/flags/czech-republic.png" },
  { name: "Denmark", flag: "/flags/denmark.jpg" },
  { name: "Estonia", flag: "/flags/estonia.jpeg" },
  { name: "Finland", flag: "/flags/finland.jpg" },
  { name: "France", flag: "/flags/france.jpg" },
  { name: "Germany", flag: "/flags/germany.jpg" },
  { name: "Greece", flag: "/flags/greece.webp" },
  { name: "Hungary", flag: "/flags/hungary.png" },
  { name: "Ireland", flag: "/flags/ireland.webp" },
  { name: "Italy", flag: "/flags/italy.webp" },
  { name: "Latvia", flag: "/flags/latvia.jpg" },
  { name: "Lithuania", flag: "/flags/lithuania.jpg" },
  { name: "Luxembourg", flag: "/flags/luxembourg.webp" },
  { name: "Malta", flag: "/flags/malta.jpg" },
  { name: "Netherlands", flag: "/flags/netherlands.webp" },
  { name: "Poland", flag: "/flags/poland.jpeg" },
  { name: "Portugal", flag: "/flags/portugal.webp" },
  { name: "Romania", flag: "/flags/romania.png" },
  { name: "Slovakia", flag: "/flags/slovakia.jpg" },
  { name: "Slovenia", flag: "/flags/slovenia.jpeg" },
  { name: "Spain", flag: "/flags/spain.svg" },
  { name: "Sweden", flag: "/flags/swedish.png" },
  { name: "Uk", flag: "/flags/uk.png" },
  { name: "Switzerland", flag: "/flags/switzerland.jpg" },
  { name: "Usa", flag: "/flags/usa.webp" },
  { name: "Canada", flag: "/flags/canada.jpg" },
  { name: "Australia", flag: "/flags/australia.jpg" },
];

 async function getCountryNews(country: string) {
  const dbCountry = country;
  const allArticles = await prisma.newsArticle.findMany({
    where: {
      newsArticleStatus: "ACTIVE",
      newsLocation: dbCountry as any,
    },
    orderBy: { createdAt: "desc" },
    take: 9,
  });

  const lastFeaturedArticle = await prisma.newsArticle.findFirst({
    where: {
      newsArticleStatus: "ACTIVE",
      isFeatured: true,
      newsLocation: dbCountry as any,
    },
    orderBy: { createdAt: "desc" },
  });

  return { allArticles, lastFeaturedArticle };
}

export default async function CountryNews({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>;
}) {
  const params = await searchParams;
  const country = params?.country || "Sweden";

  const { allArticles, lastFeaturedArticle } = await getCountryNews(country);

  const activeCountry = euCountries.find(
    (c) => c.name.toLowerCase() === country.toLowerCase()
  ) ?? {
    name: country,
    flag: "/flags/default.png",
  };

  return (
    <>
      <div className="grid grid-cols-5 mt-4 md:mt-8">
        <div className="col-span-5 md:col-span-1 pr-1">
          <div className="hidden md:block sticky top-40 max-h-[400px] overflow-y-auto pb-4 border-2 px-2">
            <div className="pb-2 mb-6 pt-4">
              <div className="flex flex-wrap gap-2">
                {euCountries.map((c) => (
                  <Link
                    key={c.name}
                    href={`?country=${encodeURIComponent(c.name)}`}
                    className={`flex items-center gap-2 border rounded-lg px-3 py-1 transition-all ${
                      c.name === country
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Image
                      src={c.flag}
                      alt={`${c.name} flag`}
                      width={18}
                      height={12}
                      className="rounded-sm"
                    />
                    <span className="text-xs font-semibold">{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 md:col-span-3">
          <div className="flex items-center gap-2 pl-2 mb-2">
            <Image
              src={activeCountry.flag}
              alt={`${activeCountry.name} flag`}
              width={28}
              height={18}
              className="rounded-sm"
            />
            <h1 className="font-extrabold">{activeCountry.name} Latest</h1>
          </div>

          {lastFeaturedArticle ? (
            <div className="mb-6 max-h-[320px] md:border-1 md:p-2">
              <Link href={`/newsDetails/${lastFeaturedArticle.id}`}>
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

                    {isJson(lastFeaturedArticle.newsDetails) ? (
                      <div className="text-sm md:text-lg text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2">
                        <JsonToHtml
                          json={JSON.parse(lastFeaturedArticle.newsDetails)}
                        />
                      </div>
                    ) : (
                      <p className="text-sm md:text-lg text-accent-foreground/80 mb-2 md:mt-2 line-clamp-1 md:line-clamp-3 pl-2">
                        {lastFeaturedArticle.newsDetails}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <EmptyState
              title="Oops! There's nothing to show yet."
              description="No featured article available yet."
              buttonText="Homepage"
              href="/"
            />
          )}

          <div className="px-2 md:px-0">
            <SuperOne country={country} />
          </div>

          {allArticles?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-6 px-2 border-y-1 md:border-1 my-10">
              {allArticles
                .filter((a) => a.id !== lastFeaturedArticle?.id)
                .map((article) => (
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
              description="No article available yet. Stay tuned!"
              buttonText="Homepage"
              href="/"
            />
          )}
        </div>

        <div className="col-span-5 md:col-span-1 px-2 pt-3">
          <SuperOne country={country} />
          <SuperOne country={country} />
        </div>
      </div>

      <SuperOne country={country} />
    </>
  );
}
