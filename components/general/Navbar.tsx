import Link from "next/link";
import { buttonVariants } from "../ui/button";

import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropdown";
import DropDownMenuList from "./dropDownMenuList";
import { Loader2, User2 } from "lucide-react";
import { Suspense } from "react";
import { DeluxeOneAdvertise } from "../allAdvertisement/DeluxeOne";
import DropDownCountryList from "./DropDownCountryList";

export default async function Navbar() {
  const user = await auth();

  return (
    <nav className="flex items-center justify-between pr-2">
      <Link href="/" className="flex items-center p-2">
        <div className="w-[120px] h-[60px] sm:w-[140px] sm:h-[70px] md:w-[160px] md:h-[80px] bg-[url('/n1w.png')] dark:bg-[url('/n1b.png')] bg-cover bg-center" />
      </Link>

      <div className="hidden md:block w-full">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <DeluxeOneAdvertise />
        </Suspense>
      </div>

      {/*  desktop navigation */}

      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
       {/*  <DropDownMenuList /> */}
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
      <div className="md:hidden flex items-center gap-2">
        <div className="size-sm">
          <ThemeToggle />
        </div>
        {/* <DropDownMenuList /> */}
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
