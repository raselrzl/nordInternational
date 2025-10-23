import { trackRoute } from "@/app/utils/routeTracker";
import OpinionsList from "@/components/general/OpinionList";

export default async function OpinionsPage() {
  await trackRoute("Opinions");
  return (
    <main className="min-h-screen py-10">
      <h1 className="text-3xl uppercase font-bold text-center mb-8">User Complaints</h1>
      <div className=""><OpinionsList /></div>
    </main>
  );
}
