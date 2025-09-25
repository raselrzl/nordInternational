import { trackRoute } from "@/app/utils/routeTracker";
import AllInternationalArticles from "./AllInternationalArticles";
import AllArticleList from "@/components/general/homepageArticleList";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Suspense } from "react";

type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function International({
  searchParams,
}: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("International");

  return (
    <div className="grid grid-cols-3 mt-10">
      <div className="col-span-3 md:col-span-1">
        <h1 className="font-extrabold pl-2 mb-2">{`>>>`} Latest World News</h1>
        <div className="p-1 md:p-4">
          <Suspense key={currentPage} fallback={<LoadingSpinner />}>
            <AllInternationalArticles currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
      <div className="col-span-3 md:col-span-2">
        <AllArticleList />
      </div>
    </div>
  );
}
