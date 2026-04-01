import Navbar from "@/components/general/Navbar";
import React, { ReactNode } from "react";
import Link from "next/link";
import { Toaster } from "sonner";
import NewsTicker from "@/components/general/NewsTicker";
import Footer from "@/components/general/Footer";
import VisitorTracker from "@/components/general/VisitorTracker";
import ScrollToTopButton from "@/components/general/ScrollToTopButton";
import NewUserTracker from "@/components/general/NewUserTracker";
import ContinentDropdown from "@/components/general/ContinentDropdown";
import Image from "next/image";
import IndiaLatest from "@/components/general/India";
import AfrikaLatest from "@/components/general/Afrika";
import AustraliaLatest from "@/components/general/Australia";
import SouthamericaLatest from "@/components/general/SouthamericaAmerica";
import SportsNews from "@/components/general/SportsNews";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto md:px-6 2xl:px-0">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md max-w-7xl mx-auto">
        <Navbar />
        <ContinentDropdown />
        <div className="flex justify-between items-center border-y border-x-4 border-black text-gray-200 bg-black">
          <Link href="/" className="inline-block">
            <Image
              src="/icon.png"
              alt="Logo"
              width={140}
              height={100}
              priority
            />
          </Link>
          <NewsTicker />
        </div>
      </div>
      <NewUserTracker />
      <div className="mt-22 md:mt-29 mb-20 sm:mb-40">{/*  <NavMenu /> */}</div>

      {children}
      <div className="grid grid-cols-1 md:grid-cols-4 mb-20">
        <IndiaLatest />
        <AfrikaLatest />
        <AustraliaLatest />
        <SouthamericaLatest />
      </div>
      <SportsNews />
      <Footer />
      <VisitorTracker />
      <ScrollToTopButton />
      <Toaster closeButton richColors />
    </div>
  );
}
