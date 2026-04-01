import { prisma } from "@/app/utils/db";
import { isJson } from "@/app/utils/isJson";
import { SizeOneAdvertise } from "@/components/allAdvertisement/SizeOne";
import { SizeTwoAdvertise } from "@/components/allAdvertisement/SizeTwo";
import { StandardOne } from "@/components/allAdvertisement/StandardOne";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import { SuperTwo } from "@/components/allAdvertisement/SuperTwo";
import { EmptyState } from "@/components/general/EmptyState";
import { RecentNews } from "@/components/general/homepageArticleList";
import { JsonToHtml } from "@/components/richTextEditor/JsonToHtml";
import { PaginationComponent } from "@/components/general/PaginationComponent";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";
import { trackRoute } from "@/app/utils/routeTracker";
import CategoryNewsSlider from "@/components/general/CategoryNewsSlider";

// ✅ Article type matching Prisma selection
type Article = {
  id: string;
  createdAt: Date;
  isFeatured: boolean;
  newsCategory: string;
  newsDetails: string;
  newsHeading: string;
  newsPicture: string;
  newsPictureHeading: string;
  newsPictureCredit: string;
  newsLocation: string | null;
  newsReporter: {
    id: string;
    reporterName: string | null;
    location: string;
    bio: string;
    profilePicture: string;
    phoneNumber: string;
    facebookProfileAddress: string | null;
    registered: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };
  newsArticleStatus: string;
  quotes: { speakerInfo: string; text: string }[];
};

// ✅ List of EU countries with flags
const euCountries = [
  { name: "Austria", flag: "/flags/Austria.png" },

  { name: "Belgium", flag: "/flags/belgium.webp" },
  { name: "Bulgaria", flag: "/flags/bulgaria.webp" },
  { name: "Croatia", flag: "/flags/croatia.webp" },
  { name: "Cyprus", flag: "/flags/cyprus.jpg" },
  { name: "CzechRepublic", flag: "/flags/czech-republic.png" },
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
  { name: "Norway", flag: "/flags/norway.webp" },
  { name: "Bangladesh", flag: "/flags/bangladesh.jpg" },

  { name: "Chaina", flag: "/flags/chaina.jpg" },
  { name: "Russia", flag: "/flags/russia.jpeg" },
  { name: "Afrika", flag: "/flags/afrika.png" },
  { name: "Asia", flag: "/flags/asia.jpg" },
  { name: "India", flag: "/flags/india.jpg" },
  { name: "Middleeast", flag: "/flags/middleeast.webp" },
  { name: "Southamerica", flag: "/flags/southamerica.jpg" },
  { name: "Pakistan", flag: "/flags/pakistan.jpg" },
];

// ✅ Map raw Prisma result to Article type
function mapPrismaArticle(a: any): Article {
  return {
    id: a.id,
    createdAt: a.createdAt,
    isFeatured: a.isFeatured,
    newsCategory: a.newsCategory,
    newsDetails: a.newsDetails,
    newsHeading: a.newsHeading,
    newsPicture: a.newsPicture,
    newsPictureHeading: a.newsPictureHeading,
    newsPictureCredit: a.newsPictureCredit,
    newsLocation: a.newsLocation ? String(a.newsLocation) : null,
    newsReporter: a.newsReporter,
    newsArticleStatus: a.newsArticleStatus,
    quotes: a.quotes,
  };
}

// ✅ Fetch top 7 latest + featured article
async function getCountryNews(country: string) {
  const allArticlesRaw = await prisma.newsArticle.findMany({
    where: { newsArticleStatus: "ACTIVE", newsLocation: country as any },
    orderBy: { createdAt: "desc" },
    take: 7,
  });

  const lastFeaturedArticleRaw = await prisma.newsArticle.findFirst({
    where: {
      newsArticleStatus: "ACTIVE",
      isFeatured: true,
      newsLocation: country as any,
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    allArticles: allArticlesRaw.map(mapPrismaArticle),
    lastFeaturedArticle: lastFeaturedArticleRaw
      ? mapPrismaArticle(lastFeaturedArticleRaw)
      : null,
  };
}

// ✅ Fetch paginated articles starting after the first 7
async function getPaginatedCountryArticles(
  country: string,
  page: number = 1,
  pageSize: number = 10,
) {
  const skip = 7 + (page - 1) * pageSize;
  const [dataRaw, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { newsArticleStatus: "ACTIVE", newsLocation: country as any },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.newsArticle.count({
      where: { newsArticleStatus: "ACTIVE", newsLocation: country as any },
    }),
  ]);

  return {
    articles: dataRaw.map(mapPrismaArticle),
    totalPages: Math.ceil((totalCount - 7) / pageSize),
    totalCount,
  };
}

// ✅ Full Component
export default async function CountryNews({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; page?: string }>;
}) {
  const params = await searchParams;
  const country = params?.country || "Sweden";
  const currentPage = Number(params?.page) || 1;

  const { allArticles, lastFeaturedArticle } = await getCountryNews(country);
  const { articles, totalPages } = await getPaginatedCountryArticles(
    country,
    currentPage,
  );

  const activeCountry = euCountries.find(
    (c) => c.name.toLowerCase() === country.toLowerCase(),
  ) ?? {
    name: country,
    flag: "/flags/default.png",
  };

  await trackRoute(country);

  console.log(country);
  return (
    <>
      <div className="grid grid-cols-5 mt-4 md:mt-8">
        <div className="col-span-5 md:col-span-1 pr-1 mt-8">
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
                    <img
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
          <div className="items-center justify-center md:absolute my-4">
            <StandardOne country={country} />
          </div>
        </div>

        <div className="col-span-5 md:col-span-3 mt-10">
          <div className="flex items-center gap-2 pl-2 mb-2 uppercase">
            <img
              src={activeCountry.flag}
              alt={`${activeCountry.name} flag`}
              width={28}
              height={18}
              className="rounded-sm"
            />
            <h1 className="font-extrabold">{activeCountry.name}</h1>
          </div>

          {lastFeaturedArticle ? (
            <div className="mb-6 max-h-[320px] md:border-1 md:p-2">
              <Link href={`/newsDetails/${lastFeaturedArticle.id}`}>
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

          {allArticles.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-6 px-2 border-y-1 md:border-1 my-10">
              {allArticles
                .filter((a: Article) => a.id !== lastFeaturedArticle?.id)
                .map((article: Article) => (
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
              description="No article available yet. Stay tuned!"
              buttonText="Homepage"
              href="/"
            />
          )}

          <SuperTwo country={country} />

          {/* More from Country with pagination */}
          <div className="mt-10 border-t pt-6">
            <div className="flex items-center justify-between bg-primary px-4 rounded-md pb-1 mb-4">
              <h2 className="flex items-center font-extrabold text-[14px] border-l-8 border-gray-100 text-gray-100 pl-2 uppercase">
                {activeCountry.name}
              </h2>
              <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>

            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                {articles.map((article: Article) => (
                  <Link href={`/newsDetails/${article.id}`} key={article.id}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary relative grid grid-cols-3 border-0 px-2 py-2">
                      <div className="col-span-1">
                        <img
                          src={article.newsPicture}
                          alt={article.newsPictureHeading}
                          width={56}
                          height={60}
                          className="h-[60px] w-full object-fill rounded-xl"
                        />
                      </div>
                      <div className="col-span-2">
                        <h1 className="text-sm font-bold line-clamp-2">
                          {article.newsHeading}
                        </h1>
                        <p className="text-xs text-muted-foreground text-right font-bold italic pr-2">
                          {formatRelativeTime(article.createdAt)}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No more news yet."
                description="Please check again later."
                buttonText="Homepage"
                href="/"
              />
            )}
          </div>
           <CategoryNewsSlider />
        </div>

        <div className="col-span-5 md:col-span-1 px-2 pt-3 gap-4 mt-15">
          <SizeOneAdvertise country={country} />
          <div className="my-4">
            <RecentNews />
          </div>
          <div className="mt-4">
            <SizeTwoAdvertise country={country} />
          </div>
        </div>
      </div>
     
    </>
  );
}
