"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  BookPlus,
  FileQuestion,
  Layers2,
  LogOut,
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
import { useEffect, useState } from "react";
import { getCurrentUserType } from "@/app/utils/getCurrentUserType";
import { ime } from "@/app/utils/ime";

interface SidebarProps {
  email: string;
  name: string;
  image: string;
}

export default function Sidebar({ email, name, image }: SidebarProps) {
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);
  const [mkrValue, setMkrValue] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUserType();
      setUserType(currentUser?.userType || null);
      setApprovalStatus(currentUser?.approvalStatus || null);
      setMkrValue(ime(email));
    };
    fetchData();
  }, [email]);

  const canSeeSection1 =
    (userType === "NEWSREPORTER" && approvalStatus === "APPROVED") ||
    userType === "SOMPANDOK" ||
    userType === "SUPERADMIN";

  const canSeeSection2 = userType === "SOMPANDOK" || userType === "SUPERADMIN";
  const canSeeSection3 = userType === "SUPERADMIN";

  const linksSection1 = [
    { href: "/alluseropinion", icon: MessagesSquare, label: "Complaints" },
  ];

  const linksSection2 = [
    { href: "/post-an-article/poll", icon: FileQuestion, label: "Write a Poll Question?" },
    { href: "/post-an-article", icon: BookPlus, label: "Write a News Article" },
    { href: "/post-an-article/my-article", icon: Newspaper, label: "List of My Published Articles" },
    { href: "/post-an-article/alluseropinion/opiniontable", icon: Settings2, label: "Manage All Complaints" },
  ];

  const linksSection3 = [
    { href: "/post-an-article/alaarticles", icon: Layers2, label: "Manage All Articles" },
    { href: "/post-an-article/post-advertisement", icon: Megaphone, label: "Post an Advertisement" },
    { href: "/post-an-article/post-advertisement/advertisementPackage", icon: Package, label: "Add an Advertisement Package" },
    { href: "/post-an-article/post-advertisement/alladvertise", icon: PoundSterling, label: "Manage All Advertisements" },
    { href: "/post-an-article/advertise/allcontactinfo", icon: MessagesSquare, label: "All Advertisement Requests" },
    { href: "/post-an-article/post-a-video", icon: Settings2, label: "Post a YouTube Video" },
    { href: "/post-an-article/post-a-video/allvideos", icon: BarChart, label: "Manage All Videos" },
    { href: "/post-an-article/routeTrack", icon: Table, label: "Dashboard" },
    { href: "/post-an-article/allusers", icon: Users, label: "All Users of the App" },
  ];

  const allVisibleLinks = [
    ...linksSection1,
    ...(canSeeSection1 || mkrValue ? linksSection2 : []),
    ...(canSeeSection2 ? linksSection3 : []),
  ];

  return (
    <Card className="hidden md:flex w-54 rounded-none flex-col pt-0 shadow-none border-none">
      <div className="px-4 pb-2">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
      <nav className="flex-1 flex flex-col gap-2 text-xs overflow-y-auto px-4">
        {allVisibleLinks.map((link) => {
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
