import LoadingSpinner from "@/components/general/LoadingSpinner";
import AllCountryNewsArticleList from "./countryNewsArticleList";
import AllArticleList from "@/components/general/homepageArticleList";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";


type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};


export default async function Country({ searchParams }: SearchParamsProps) {
const params = await searchParams;
const currentPage = Number(params.page) || 1;

await trackRoute("country");
  return (
    <div className="grid grid-cols-3 mt-10">
      <div className="col-span-3 md:col-span-1">
        <h1 className="font-extrabold pl-2 mb-2">
  {`>>>`}
  National News
</h1>

        <div className="p-1 md:p-4">
        <Suspense key={currentPage} fallback={<LoadingSpinner />}>
              <AllCountryNewsArticleList currentPage={currentPage} />
        </Suspense>
        </div>

      
      </div>
      <div className="col-span-3 md:col-span-2">
        <AllArticleList />
      </div>
    </div> 
  );
}
