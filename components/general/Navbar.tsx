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
      <div className="flex justify-center items-center">
        <DropDownMenuList />

        <Link href="/" className="flex items-center">
          <div
            className="
        w-[70px] h-[32px]'
         md:w-[80px] h-[40px]
        bg-[url('/gepb.png')]
        dark:bg-[url('/gepw.png')]
        bg-cover bg-center
      "
          />
        </Link>
      </div>

      <div className="hidden sm:block">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <DeluxeOneAdvertise />
        </Suspense>
      </div>

      <div className="hidden md:flex items-center gap-1">
        <ThemeToggle />
{/*         <DropDownCountryList /> */}

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
              className="px-3 py-0.5 pt-1 shdow text-black shadow shadow-black dark:text-white text-md rounded-xs flex items-center justify-center"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-1">
        <ThemeToggle />
       {/*  <DropDownCountryList /> */}

        {user?.user ? (
          <UserDropdown
            email={user.user.email as string}
            name={user.user.name as string}
            image={user.user.image as string}
          />
        ) : (
          <Link
            href="/login"
            className="px-2 py-0.5 pt-0.5 shadow shadow-black y-50 dark:text-white text-black text-xs rounded-xs flex items-center justify-center mr-4"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
