import {
  Activity,
  BrainCircuit,
  ChevronDown,
  Coins,
  Film,
  Gavel,
  Globe,
  HeartPulse,
  Landmark,
  Leaf,
  Megaphone,
  Menu,
  Microscope,
  Rocket,
  School,
  Search,
  ShieldAlert,
  Star,
  TentTree,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

export default function DropDownCountryList() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="mr-2">
            <ChevronDown className="h-6 w-6" />
            <Globe />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-45">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/national#SwedishNews">
              <div className="flex items-center gap-2 pl-4">
                <Image
                  src="/flags/swedish.png"
                  alt="Swedish flag"
                  width={28}
                  height={18}
                  className="rounded-sm"
                />
                <h1 className="font-extrabold">Sweden</h1>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/politics#CyprusNews">
              <div className="flex items-center gap-2 pl-4">
                <Image
                  src="/flags/cyprus.jpg"
                  alt="Cyprus flag"
                  width={28}
                  height={18}
                  className="rounded-sm"
                />
                <h1 className="font-extrabold">Cyprus</h1>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/international#AustriaNews">
              <div className="flex items-center gap-2 pl-4">
                <Image
                  src="/flags/Austria.png"
                  alt="Austria flag"
                  width={28}
                  height={18}
                  className="rounded-sm"
                />
                <h1 className="font-extrabold">Austria</h1>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/countrywide#BelgiumNews">
              <div className="flex items-center gap-2 pl-4">
                <Image
                  src="/flags/belgium.webp"
                  alt="Belgium flag"
                  width={28}
                  height={18}
                  className="rounded-sm"
                />
                <h1 className="font-extrabold">Belgium</h1>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
