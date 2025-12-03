"use server";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

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
    <nav className="flex items-center justify-between pr-2 py-2">
      <Link href="/" className="flex items-center pl-2">
        <div
          className="m-1/2
      w-[90px] h-[50px] 
      md:w-[135px] md:h-[60px] 
      bg-[url('/gl1.png')] 
      dark:bg-[url('/gl1.png')] 
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
        <DropDownMenuList />
        <DropDownCountryList />

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
              className={`${buttonVariants({
                variant: "outline",
                size: "sm",
              })}`}
            >
              <User2 />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-1">
        <ThemeToggle />

        <DropDownMenuList />
        <DropDownCountryList />
        {user?.user ? (
          <UserDropdown
            email={user.user.email as string}
            name={user.user.name as string}
            image={user.user.image as string}
          />
        ) : (
          <Link
            href="/login"
            className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
          >
            <User2 />
          </Link>
        )}
      </div>
    </nav>
  );
}
