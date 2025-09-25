import AllNewsArticleList from "@/app/(mainLayout)/latest/AllNewsArticleList";
import AllOpinionArticles from "./AllNationalArticles";
import AllArticleList from "@/components/general/homepageArticleList";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";
import { trackRoute } from "@/app/utils/routeTracker";


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
    <div className="grid grid-cols-3 mt-10">
      <div className="col-span-3 md:col-span-1">
        <h1 className="font-extrabold pl-2 mb-2">{`>>>`}Opinion</h1>

        <Suspense key={currentPage} fallback={<LoadingSpinner />}>
                      <AllOpinionArticles currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="col-span-3 md:col-span-2">
        <AllArticleList />
      </div>
    </div>
  );
}
