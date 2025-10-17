import AllNationalArticles from "./AllNationalArticles";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";
import SwedishNews from "./SwedishNews";
import Image from "next/image";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};
export default async function National({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("National");
  return (
    <>
      {" "}
      <div className="grid grid-cols-3 my-10">
        <div className="col-span-3 md:col-span-1">
          <h1 className="font-extrabold pl-2 mb-2">
            {`>>>`} Latest National News
          </h1>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllNationalArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/swedish.png"
                alt="Swedish flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Swedish Latest</h1>
            </div>

            <SwedishNews />
          </div>
        </div>
      </div>
    </>
  );
}
