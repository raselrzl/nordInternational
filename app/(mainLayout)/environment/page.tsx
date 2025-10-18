import { trackRoute } from "@/app/utils/routeTracker";
import AllEnvironmentArticles from "./AllEnvironmentArticles";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import CroatiaNews from "./CroatiaNews";
import Image from "next/image";
import { List } from "lucide-react";
type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Environment({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Environment");

  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <div className="font-extrabold pl-2 mb-2 flex items-center">
            <List className="h-5 w-5 mr-2"/> Environment News</div>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllEnvironmentArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="CroatiaNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/croatia.webp"
                alt="Croatia flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Croatia Latest</h1>
            </div>
            <CroatiaNews />
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
