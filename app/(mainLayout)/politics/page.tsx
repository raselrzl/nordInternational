import { trackRoute } from "@/app/utils/routeTracker";
import AllPoliticalArticles from "./AllPoliticalArticles";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import CyprusNews from "./CyprusNews";
import Image from "next/image";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Politics({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Politics");

  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <h1 className="font-extrabold pl-2 mb-2 flex items-center">
            <List className="h-5 w-5 mr-2"/>
            <List className="h-5 w-5 mr-2"/> Latest Political News
          </h1>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllPoliticalArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="CyprusNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/cyprus.jpg"
                alt="Swedish flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Cyprus Latest</h1>
            </div>
            <CyprusNews />
          </div>
        </div>
      </div>
      <div className="px-2"> <SuperOne /></div>
    </>
  );
}
