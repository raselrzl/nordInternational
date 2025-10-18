import { trackRoute } from "@/app/utils/routeTracker";
import AllScienceArticles from "./AllScienceArticles";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import Image from "next/image";
import NatherlandsNews from "./NetherlandsNews";
import { List } from "lucide-react";
type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Science({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Science");

  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <div className="font-extrabold pl-2 mb-2 flex items-center">
          <List className="h-5 w-5 mr-2"/> Science News</div>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllScienceArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="NetherlandsNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/netherlands.webp"
                alt="Natherlands flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Natherlands Latest</h1>
            </div>
            <NatherlandsNews />
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
