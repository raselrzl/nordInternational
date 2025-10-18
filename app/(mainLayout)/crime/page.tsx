import LoadingSpinner from "@/components/general/LoadingSpinner";
import AllCrimeNewsArticleList from "./AllCrimeNewsArticleList";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";
import BulgariaNews from "./BulgariaNews";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import Image from "next/image";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Crime({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Crime");

  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <h1 className="font-extrabold pl-2 mb-2">
            {`>>>`} Latest All Crime News
          </h1>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllCrimeNewsArticleList currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="BulgariaNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/bulgaria.webp"
                alt="Bulgaria flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Bulgaria Latest</h1>
            </div>
            <BulgariaNews />
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
