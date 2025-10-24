"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  BookPlus,
  FileQuestion,
  Layers2,
  Megaphone,
  MessagesSquare,
  Newspaper,
  Package,
  PoundSterling,
  Settings2,
  Table,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const links = [
  { href: "/post-an-article/poll", icon: FileQuestion, label: "Write Poll Question" },
  { href: "/post-an-article", icon: BookPlus, label: "Write News Article" },
  { href: "/post-an-article/my-article", icon: Newspaper, label: "My Published Articles" },
  { href: "/post-an-article/alluseropinion/opiniontable", icon: Settings2, label: "Manage Complaints" },
  { href: "/post-an-article/alaarticles", icon: Layers2, label: "Manage All Articles" },
  { href: "/post-an-article/post-advertisement", icon: Megaphone, label: "Post Advertisement" },
  { href: "/post-an-article/post-advertisement/advertisementPackage", icon: Package, label: "Advertisement Packages" },
  { href: "/post-an-article/post-advertisement/alladvertise", icon: PoundSterling, label: "Manage Advertisements" },
  { href: "/post-an-article/advertise/allcontactinfo", icon: MessagesSquare, label: "All Advertisement Requests" },
  { href: "/post-an-article/post-a-video", icon: Settings2, label: "Post YouTube Video" },
  { href: "/post-an-article/post-a-video/allvideos", icon: BarChart, label: "Manage All Videos" },
  { href: "/post-an-article/routeTrack", icon: Table, label: "Dashboard" },
  { href: "/post-an-article/allusers", icon: Users, label: "All Users" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Card className="hidden md:flex w-54 rounded-none flex-col pt-0 shadow-none border-none">
      <h1 className="text-xl font-bold bg-gray-600 text-center text-primary p-2">
        Admin Panel
      </h1>

      <nav className="flex-1 flex flex-col gap-2 text-xs overflow-y-auto px-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 p-1 text-md transition-colors duration-150 rounded-xs ${
                isActive
                  ? "bg-gray-400 dark:text-black font-semibold"
                  : "bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-200 dark:bg-gray-600"
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </Card>
  );
}
