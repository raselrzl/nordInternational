import LoadingSpinner from "@/components/general/LoadingSpinner";
import AllEducationArticles from "./AllEducationArticles";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import GermanyNews from "./GermanyNews";
import Image from "next/image";
import { List } from "lucide-react";
type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Education({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Education");

  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-1">
          <div className="font-extrabold pl-2 mb-2 flex items-center">
         
            <List className="h-5 w-5 mr-2"/> All the Latest Education News
          </div>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllEducationArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="GermanyNews" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 pl-2 mb-2">
              <Image
                src="/flags/germany.jpeg"
                alt="Germany flag"
                width={28}
                height={18}
                className="rounded-sm"
              />
              <h1 className="font-extrabold">Germany Latest</h1>
            </div>
            <GermanyNews />
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
