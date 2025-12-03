import {
  Activity,
  BrainCircuit,
  Coins,
  Component,
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

export default function DropDownMenuList() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="">
            <Component className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="p-4 w-auto min-w-[350px] md:min-w-[500px]"
        >
          {/* GRID MENU */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mx-auto">
            <Link href="/latest" className="flex flex-col items-center gap-1">
              <Search size={20} className="opacity-60" />
              <span className="text-sm">Latest</span>
            </Link>

            <Link href="/national" className="flex flex-col items-center gap-1">
              <Landmark size={20} className="opacity-60" />
              <span className="text-sm">National</span>
            </Link>

            <Link href="/politics" className="flex flex-col items-center gap-1">
              <Megaphone size={20} className="opacity-60" />
              <span className="text-sm">Politics</span>
            </Link>

            <Link
              href="/countrywide"
              className="flex flex-col items-center gap-1"
            >
              <TentTree size={20} className="opacity-60" />
              <span className="text-sm">Country</span>
            </Link>

            <Link
              href="/international"
              className="flex flex-col items-center gap-1"
            >
              <Globe size={20} className="opacity-60" />
              <span className="text-sm">International</span>
            </Link>

            <Link href="/sports" className="flex flex-col items-center gap-1">
              <Activity size={20} className="opacity-60" />
              <span className="text-sm">Sports</span>
            </Link>

            <Link
              href="/education"
              className="flex flex-col items-center gap-1"
            >
              <School size={20} className="opacity-60" />
              <span className="text-sm">Education</span>
            </Link>

            <Link href="/health" className="flex flex-col items-center gap-1">
              <HeartPulse size={20} className="opacity-60" />
              <span className="text-sm">Health</span>
            </Link>

            <Link href="/opinion" className="flex flex-col items-center gap-1">
              <BrainCircuit size={20} className="opacity-60" />
              <span className="text-sm">Opinion</span>
            </Link>

            <Link href="/religion" className="flex flex-col items-center gap-1">
              <Star size={20} className="opacity-60" />
              <span className="text-sm">Religion</span>
            </Link>

            <Link href="/crime" className="flex flex-col items-center gap-1">
              <ShieldAlert size={20} className="opacity-60" />
              <span className="text-sm">Crime</span>
            </Link>

            <Link
              href="/technology"
              className="flex flex-col items-center gap-1"
            >
              <Rocket size={20} className="opacity-60" />
              <span className="text-sm">Technology</span>
            </Link>

            <Link
              href="/entertainment"
              className="flex flex-col items-center gap-1"
            >
              <Film size={20} className="opacity-60" />
              <span className="text-sm">Entertainment</span>
            </Link>

            <Link href="/economy" className="flex flex-col items-center gap-1">
              <Coins size={20} className="opacity-60" />
              <span className="text-sm">Economy</span>
            </Link>

            <Link
              href="/law-and-justice"
              className="flex flex-col items-center gap-1"
            >
              <Gavel size={20} className="opacity-60" />
              <span className="text-sm">Law & Justice</span>
            </Link>

            <Link
              href="/environment"
              className="flex flex-col items-center gap-1"
            >
              <Leaf size={20} className="opacity-60" />
              <span className="text-sm">Environment</span>
            </Link>

            <Link href="/science" className="flex flex-col items-center gap-1">
              <Microscope size={20} className="opacity-60" />
              <span className="text-sm">Science</span>
            </Link>
          </div>

          {/* ---- COMPACT CONTACT + SOCIAL ---- */}
          <div className="mt-5 border-t pt-3 text-center">
            {/* Advertising Link */}
            {/* Advertising Link */}
            <p className="text-sm text-gray-600 font-semibold block">
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

            {/* Email */}
            <a
              href="mailto:contact@globaleye.press"
              className="text-xs text-gray-600 dark:text-gray-300 hover:underline block mt-1"
            >
              contact@globaleye.press
            </a>

            {/* Social Icons */}
            <p className="mt-2">Follow us on</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <a
                href="https://www.instagram.com/globaleye.press"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="w-7 h-7 rounded-full"
                />
              </a>

              <a
                href="https://web.facebook.com/globaleye.press/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/facebook.png"
                  alt="Facebook"
                  className="w-8 h-8 rounded-full"
                />
              </a>

              <a
                href="https://www.youtube.com/@globaleyepressofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/youtube.png"
                  alt="YouTube"
                  className="w-7 h-7 rounded-full"
                />
              </a>

              <a
                href="https://www.tiktok.com/@globaleye.press"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/tiktokk.png"
                  alt="TikTok"
                  className="w-7 h-7 rounded-full"
                />
              </a>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
