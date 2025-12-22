"use client";

import {
  Activity,
  BrainCircuit,
  Coins,
  Film,
  Gavel,
  Globe,
  HeartPulse,
  Landmark,
  Leaf,
  Megaphone,
  MenuIcon,
  Microscope,
  Rocket,
  School,
  Search,
  ShieldAlert,
  Star,
  TentTree,
} from "lucide-react";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function DropDownMenuList() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenuIcon className="h-6 w-6 cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="p-4 min-w-[350px] md:min-w-[500px]"
      >
        {/* GRID MENU */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mx-auto">
          <MenuItem href="/latest" icon={Search} label="Latest" />
          <MenuItem href="/national" icon={Landmark} label="National" />
          <MenuItem href="/politics" icon={Megaphone} label="Politics" />
          <MenuItem href="/countrywide" icon={TentTree} label="Country" />
          <MenuItem href="/international" icon={Globe} label="International" />
          <MenuItem href="/sports" icon={Activity} label="Sports" />
          <MenuItem href="/education" icon={School} label="Education" />
          <MenuItem href="/health" icon={HeartPulse} label="Health" />
          <MenuItem href="/opinion" icon={BrainCircuit} label="Opinion" />
          <MenuItem href="/religion" icon={Star} label="Religion" />
          <MenuItem href="/crime" icon={ShieldAlert} label="Crime" />
          <MenuItem href="/technology" icon={Rocket} label="Technology" />
          <MenuItem href="/entertainment" icon={Film} label="Entertainment" />
          <MenuItem href="/economy" icon={Coins} label="Economy" />
          <MenuItem href="/law-and-justice" icon={Gavel} label="Law & Justice" />
          <MenuItem href="/environment" icon={Leaf} label="Environment" />
          <MenuItem href="/science" icon={Microscope} label="Science" />
        </div>

        {/* FOOTER */}
        <div className="mt-5 border-t pt-3 text-center">
          <p className="text-sm text-gray-600 font-semibold">
            For advertisement fill up the{" "}
            <Link
              href="/about/advertise#advertiseForm"
              className="text-primary underline"
            >
              Form
            </Link>{" "}
            or{" "}
            <Link
              href="mailto:contact@globaleye.press"
              className="text-primary underline"
            >
              Email
            </Link>
          </p>

          <a
            href="mailto:contact@globaleye.press"
            className="text-xs text-gray-600 dark:text-gray-300 hover:underline block mt-1"
          >
            contact@globaleye.press
          </a>

          <p className="mt-2">Follow us on</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <SocialIcon href="https://www.instagram.com/globaleye.press" img="/instagram.png" alt="Instagram" />
            <SocialIcon href="https://web.facebook.com/globaleye.press/" img="/facebook.png" alt="Facebook" />
            <SocialIcon href="https://www.youtube.com/@globaleyepressofficial" img="/youtube.png" alt="YouTube" />
            <SocialIcon href="https://www.tiktok.com/@globaleye.press" img="/tiktokk.png" alt="TikTok" />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ----------------- SMALL REUSABLE COMPONENTS ----------------- */

function MenuItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <DropdownMenuItem asChild>
      <Link href={href} className="flex flex-col items-center gap-1">
        <Icon size={20} className="opacity-60" />
        <span className="text-sm">{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}

function SocialIcon({
  href,
  img,
  alt,
}: {
  href: string;
  img: string;
  alt: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={img} alt={alt} className="w-7 h-7 rounded-full" />
    </a>
  );
}
