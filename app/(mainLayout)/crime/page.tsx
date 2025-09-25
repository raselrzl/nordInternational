import LoadingSpinner from "@/components/general/LoadingSpinner";
import AllArticleList from "@/components/general/homepageArticleList";
import AllCrimeNewsArticleList from "./AllCrimeNewsArticleList";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";

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
      <div className="col-span-3 md:col-span-2">
        <AllArticleList />
      </div>
    </div>
  );
}
