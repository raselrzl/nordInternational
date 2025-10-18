import { trackRoute } from "@/app/utils/routeTracker";
import AllHealthArticles from "./AllHealthArticles";
import AllArticleList from "@/components/general/homepageArticleList";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import Image from "next/image";
import FinlandNews from "./FinlandNews";

type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Health({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Health");

  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <h1 className="font-extrabold pl-2 mb-2">
            {`>>>`} Latest Health News
          </h1>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllHealthArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="FinlandNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/finland.jpg"
                alt="Finland flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Finland Latest</h1>
            </div>
            <FinlandNews />
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
