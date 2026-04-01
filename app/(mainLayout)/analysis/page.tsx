import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";
import { List } from "lucide-react";
import { UltimateTwo } from "@/components/allAdvertisement/UltimateTwo";
import BulgariaNews from "../crime/BulgariaNews";
import AllAnalysisNewsArticleList from "./AllAnalysisNewsArticleList";
import NewsByCountry from "@/components/general/NewsFilterByCountry";
import { NewsCountry } from "@prisma/client";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Analysis({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Analysis");
  const country: NewsCountry = "Sweden";
  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <div className="flex items-center justify-between pb-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-black dark:bg-white p-1.5 rounded-sm">
                <List className="h-4 w-4 text-white dark:text-black" />
              </div>
              <h2 className="text-lg md:text-xl font-bold tracking-tight">
                Analysis
              </h2>
            </div>
          </div>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllAnalysisNewsArticleList currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="BulgariaNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              {/*  <img
                src="/flags/bulgaria.webp"
                alt="Bulgaria flag"
                width={28}
                height={18}
                className="rounded-sm"
              /> */}
            </div>
            <NewsByCountry country={country} />
          </div>{" "}
          <div className="px-2">
            {" "}
            <UltimateTwo />
          </div>
        </div>
      </div>
    </>
  );
}
