import { trackRoute } from "@/app/utils/routeTracker";
import LiveUpdateComponent from "./LiveUpdateComponent";
import CategoryNewsSlider from "@/components/general/CategoryNewsSlider";

type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function NewsPage({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  await trackRoute("Breaking");
  return (
    <div className="pt-2">
      <LiveUpdateComponent currentPage={currentPage} />
      <CategoryNewsSlider />
    </div>
  );
}
