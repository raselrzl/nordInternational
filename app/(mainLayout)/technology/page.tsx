import { trackRoute } from "@/app/utils/routeTracker";
import AllTechnologyArticles from "./AllTechnologyArticles";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import PolandNews from "./PolandNews";
import Image from "next/image";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Technology({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Technology");

  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <h1 className="font-extrabold pl-2 mb-2">{`>>>`}Technology News</h1>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllTechnologyArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="NetherlandsNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/poland.jpeg"
                alt="Poland flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Poland Latest</h1>
            </div>
            <PolandNews />
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
