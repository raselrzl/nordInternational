"use client";

import { ReactNode, useState, useEffect } from "react";
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
import { signOut } from "@/app/utils/auth";
import { Card } from "@/components/ui/card";

interface AdminLayoutProps {
  children: ReactNode;
}

const links = [
  {
    href: "/post-an-article/poll",
    icon: FileQuestion,
    label: "Write Poll Question",
  },
  { href: "/post-an-article", icon: BookPlus, label: "Write News Article" },
  {
    href: "/post-an-article/my-article",
    icon: Newspaper,
    label: "My Published Articles",
  },
  {
    href: "/post-an-article/alluseropinion/opiniontable",
    icon: Settings2,
    label: "Manage Complaints",
  },
  {
    href: "/post-an-article/alaarticles",
    icon: Layers2,
    label: "Manage All Articles",
  },
  {
    href: "/post-an-article/post-advertisement",
    icon: Megaphone,
    label: "Post Advertisement",
  },
  {
    href: "/post-an-article/post-advertisement/advertisementPackage",
    icon: Package,
    label: "Advertisement Packages",
  },
  {
    href: "/post-an-article/post-advertisement/alladvertise",
    icon: PoundSterling,
    label: "Manage Advertisements",
  },
  {
    href: "/post-an-article/advertise/allcontactinfo",
    icon: MessagesSquare,
    label: "All Advertisement Requests",
  },
  {
    href: "/post-an-article/post-a-video",
    icon: Settings2,
    label: "Post YouTube Video",
  },
  {
    href: "/post-an-article/post-a-video/allvideos",
    icon: BarChart,
    label: "Manage All Videos",
  },
  { href: "/post-an-article/routeTrack", icon: Table, label: "Dashboard" },
  { href: "/post-an-article/allusers", icon: Users, label: "All Users" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Show loader for page transitions
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 200); // minimal delay
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className=" flex">
      {/* Sidebar - hidden on small screens */}
      <Card className="hidden md:flex w-54  rounded-none flex-col sticky top-40 h-screen">
        <h1 className="text-xl font-bold bg-accent-foreground text-center text-primary p-1">
          Admin Panel
        </h1>

        <nav className="flex-1 flex flex-col gap-2 text-xs overflow-y-auto px-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 p-1 text-md hover:bg-gray-100 ${
                  isActive ? "bg-gray-300 dark:text-black font-semibold" : ""
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </Card>

      {/* Main content */}
      <div className="flex-1 overflow-auto relative min-h-screen shadow">
        <h1 className="text-xl font-bold bg-accent-foreground text-center text-primary p-1 mt-6">
          Admin Panel
        </h1>
        <div className="p-2 md:px-4">{children}</div>
      </div>
    </div>
  );
}
