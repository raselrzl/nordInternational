import { trackRoute } from "@/app/utils/routeTracker";
import OpinionsList from "@/components/general/OpinionList";

export default async function OpinionsPage() {
  await trackRoute("Opinions");
  return (
    <main id="UserComplaints" className="min-h-screen py-6 px-2 md:px-0">
      
      <div className="shadow"><h1 className="text-xl uppercase font-bold text-center mb-8">User Complaints</h1><OpinionsList /></div>
    </main>
  );
}
