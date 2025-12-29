"use server";
import Link from "next/link";

import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropdown";
import { Loader2, User2 } from "lucide-react";
import { Suspense } from "react";
import { DeluxeOneAdvertise } from "../allAdvertisement/DeluxeOne";
import DropDownCountryList from "./DropDownCountryList";
import DropDownMenuList from "./dropDownMenuList";

export default async function Navbar() {
  const user = await auth();

  return (
    <nav className="flex items-center justify-between pr-2 max-w-7xl  border-l-4 border-black">
      <Link href="/" className="flex items-center">
        <div
          className="m-1/2
      w-[90px] h-[50px] 
      md:w-[135px] md:h-[60px] 
      bg-[url('/logo/gepb.png')] 
      dark:bg-[url('/logo/gepw.png')] 
      bg-cover bg-center
    "
        />
      </Link>

      <div className="hidden sm:block">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <DeluxeOneAdvertise />
        </Suspense>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <ThemeToggle />
        <DropDownCountryList />
        <DropDownMenuList />

        <div>
          {" "}
          {user?.user ? (
            <UserDropdown
              email={user.user.email as string}
              name={user.user.name as string}
              image={user.user.image as string}
            />
          ) : (
            <Link
              href="/login"
              className="px-3 py-1 pt-1.5 uppercase bg-black text-white text-md rounded-2xl flex items-center justify-center"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-1">
        <ThemeToggle />
        <DropDownCountryList />
        <div className="mr-2">
          <DropDownMenuList />
        </div>
        {user?.user ? (
          <UserDropdown
            email={user.user.email as string}
            name={user.user.name as string}
            image={user.user.image as string}
          />
        ) : (
         <Link
              href="/login"
              className="px-2 py-1 pt-1.5 uppercase bg-black text-white text-xs rounded-2xl flex items-center justify-center"
            >
              Sign in
            </Link>
        )}
      </div>
    </nav>
  );
}
