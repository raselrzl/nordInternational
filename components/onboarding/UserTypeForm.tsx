type UserSelectionType = "newsReporter" | "Advertiser";

interface UserTypeSelectionProps {
  onSelect: (type: UserSelectionType) => void;
}

import { Button } from "@/components/ui/button";
import { Building2, UserRound } from "lucide-react";
import Image from "next/image";

export default function UserTypeSelection({
  onSelect,
}: UserTypeSelectionProps) {
  return (
    <div className="space-y-8 px-4 w-[360px] border-1 py-4">
      {" "}
      {/* Add padding for mobile view */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <Image src="/n33.png" alt="logo image" width={300} height={100} />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Welcome, let's get started!</h2>
        <p className="text-gray-400 text-xs">
          Do you want to be a journalist or an advertiser? Please choose.
        </p>
      </div>
      <div className="grid gap-4 max-w-[300px]">
        {" "}
        {/* Limit width and center */}
        <Button
          onClick={() => onSelect("newsReporter")}
          variant={"outline"}
          className="w-full h-auto p-4 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer flex"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Journalist?</h3>
            <p className="text-gray-500 text-xs">
              Can you publish news on Nord International?
            </p>
          </div>
        </Button>
        <Button
          onClick={() => onSelect("Advertiser")}
          variant={"outline"}
          className="w-full h-auto p-4 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer flex"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserRound className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Advertiser?</h3>
            <p className="text-gray-500 text-xs">
              Can you register as an advertiser?
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}
