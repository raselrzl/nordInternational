import { trackRoute } from "@/app/utils/routeTracker";
import AllInternationalArticles from "./AllInternationalArticles";
import AllArticleList from "@/components/general/homepageArticleList";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import AustrianNews from "./AustrianNews";
import Image from "next/image";

type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function International({
  searchParams,
}: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("International");

  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <h1 className="font-extrabold pl-2 mb-2">
            {`>>>`} Latest World News
          </h1>
          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllInternationalArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="AustriaNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/Austria.png"
                alt="Austria flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Austria Latest</h1>
            </div>
            <AustrianNews />
          </div>
        </div>
      </div>
      <div className="px-2">
        {" "}
        <SuperOne />
      </div>
    </>
  );
}
