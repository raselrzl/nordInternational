import Navbar from "@/components/general/Navbar";
import TodayDate from "@/components/general/TodayDate";
import React, { ReactNode } from "react";
import Link from "next/link";
import NavMenu from "@/components/general/NavMenu";
import { Toaster } from "sonner";
import NewsTicker from "@/components/general/NewsTicker";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md max-w-7xl mx-auto">
        <Navbar />
        <div className="flex justify-between items-center py-1 bg-primary-foreground">
          <Link
            href="/"
            className="font-extrabold text-primary border-b-4 hover:text-primary/75 border-primary border-r-2  px-2"
          >
            Now
          </Link>
          <TodayDate locale="en-US" withTime />
        </div>

        <NewsTicker />
      </div>
      <div className="mt-33 md:mt-41">
        <NavMenu />
      </div>
      {children}

      <Toaster closeButton richColors />
    </div>
  );
}
