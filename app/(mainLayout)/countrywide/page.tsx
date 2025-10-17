import LoadingSpinner from "@/components/general/LoadingSpinner";
import AllCountryNewsArticleList from "./countryNewsArticleList";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import BelgiumNews from "./BelgiumNews";
import Image from "next/image";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Country({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  await trackRoute("country");
  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <h1 className="font-extrabold pl-2 mb-2">
            {`>>>`}
            Country News
          </h1>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllCountryNewsArticleList currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="BelgiumNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/belgium.webp"
                alt="Belgium flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Belgium Latest</h1>
            </div>
            <BelgiumNews />
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
