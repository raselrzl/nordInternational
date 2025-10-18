import AllNewsArticleList from "@/app/(mainLayout)/latest/AllNewsArticleList";
import { Suspense } from "react";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { ShirShoNewsHeadings } from "@/components/general/homepageArticleList";
import { trackRoute } from "@/app/utils/routeTracker";
import { PremiarOne } from "@/components/allAdvertisement/PremiarOne";
import { List } from "lucide-react";
type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};
export default async function Latest({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  await trackRoute("Latest");

  return (
    <div className="grid grid-cols-3 mt-10">
      <div className="col-span-3 md:col-span-2">
        <div className="font-extrabold pl-2 mb-2 flex items-center">
           <List className="h-5 w-5 mr-2"/>Latest News</div>
        <Suspense key={currentPage} fallback={<LoadingSpinner />}>
          <AllNewsArticleList currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="col-span-3 md:col-span-1 mt-8">
      {/* <img
          src="/shoe.gif"
          alt="gif image"
          className="w-full h-[270px] rounded-xl px-6 md:pt-0"
        /> */}
        <PremiarOne />
        <div className="p-6"><ShirShoNewsHeadings /></div>
      </div>
    </div>
  );
}
