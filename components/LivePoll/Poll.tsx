
import LivePoll from "@/components/LivePoll/LivePoll";
import SportsNews from "../general/SportsNews";
import { OpinionForm } from "../general/OpinionForm";

export default function Poll() {
  return (
    <div className="max-w-7xl mx-auto bg-black text-white p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 items-center justify-center">
        <div className="order-1 md:order-1 col-span-2 md:col-span-1 py-10 px-4 md:px-0">
           <OpinionForm />
        </div>
        <div className="order-2 md:order-2 col-span-2 md:col-span-1 py-10 px-2">
          <SportsNews />
        </div>
      </div>
    </div>
  );
}
