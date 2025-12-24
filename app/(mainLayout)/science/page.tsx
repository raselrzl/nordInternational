import { trackRoute } from "@/app/utils/routeTracker";
import AllScienceArticles from "./AllScienceArticles";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { List } from "lucide-react";
import { UltimateTwo } from "@/components/allAdvertisement/UltimateTwo";
import TechnologyNews from "./TechnonogyNews";
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
            <List className="h-5 w-5 mr-2" /> Science News
          </div>

          <div className="p-1 md:p-4">
            <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllScienceArticles currentPage={currentPage} />
            </Suspense>
          </div>
        </div>
        <div id="Technology" className="col-span-3 md:col-span-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {/* <img
                src="/flags/netherlands.webp"
                alt="Natherlands flag"
                width={28}
                height={18}
                className="rounded-sm"
              /> */}
              
              <h1 className="font-extrabold text-xl border-l-10 border-orange-600 pl-2 uppercase">Technology</h1>
            </div>
            <TechnologyNews />
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
