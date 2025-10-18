import AllOpinionArticles from "./AllNationalArticles";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import Image from "next/image";
import FranceNews from "./FranceNews";
import { List } from "lucide-react";
type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};
export default async function Opinion({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Opinion");
  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <div className="font-extrabold pl-2 mb-2 flex items-center">
           <List className="h-5 w-5 mr-2"/>Opinion</div>

          <Suspense key={currentPage} fallback={<LoadingSpinner />}>
            <AllOpinionArticles currentPage={currentPage} />
          </Suspense>
        </div>
        <div id="FranceNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/france.jpg"
                alt="France flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">France Latest</h1>
            </div>
            <FranceNews />
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
