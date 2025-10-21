import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import LivePoll from "@/components/LivePoll/LivePoll";
import { BesicOneAdvertise } from "../allAdvertisement/BesicOne";

export default function Poll() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Divider line */}
      <div className="border-y-2 my-2 border-primary"></div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10">
        {/* Left: Poll */}
        <div className="order-1 md:order-1 col-span-2 md:col-span-1 p-2">
          <LivePoll />
        </div>

        {/* Right: Advertisement */}
        <div className="order-2 md:order-2 col-span-2 md:col-span-1 p-2">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin text-primary" size={28} />
              </div>
            }
          >
            <BesicOneAdvertise />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
