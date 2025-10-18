import LoadingSpinner from "@/components/general/LoadingSpinner";
import AllEntertainmentArticles from "./AllEntertainmentArticles";
import AllArticleList from "@/components/general/homepageArticleList";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import SpainNews from "./SpainNews";
import Image from "next/image";
import { List } from "lucide-react";
type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Entertainment({
  searchParams,
}: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Entertainment");
  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <div className="font-extrabold pl-2 mb-2 flex items-center">
          
            <List className="h-5 w-5 mr-2"/> Entertainment News
          </div>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllEntertainmentArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="SpainNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/spain.svg"
                alt="Spain flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Spain Latest</h1>
            </div>
            <SpainNews />
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
