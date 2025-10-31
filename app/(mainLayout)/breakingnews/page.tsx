import LiveUpdateComponent from "./LiveUpdateComponent";


type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function NewsPage({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  return (
    <div className="p-6">
      <LiveUpdateComponent currentPage={currentPage} />
    </div>
  );
}
