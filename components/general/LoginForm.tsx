import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { auth, signIn } from "@/app/utils/auth";
import { redirect } from "next/navigation";
import ButtonGoogle from "./Button-Google";
import Link from "next/link";

export default async function LoginForm() {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }
  return (
    <div className=" flex flex-col gap-6">
      <Card>
        <Link href="/" className="flex items-center gap-2 self-center">
          <Image src="/n1w.png" height={70} width={170} alt="logo image" />
        </Link>
        <CardHeader className="text-center ">
          <CardTitle className="text-xl">
            <span className="text-red-800">Welcome to</span>Nord International
          </CardTitle>
          <CardDescription className="text-xs">
            Log in with Google or create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("google", {
                  redirectTo: "/onboarding",
                });
              }}
              className="cursor-pointer"
            >
              <ButtonGoogle
                width="w-full"
                variant="default"
                text="Log in with Google"
                icon={
                  <Image
                    src="/google_icon.svg"
                    height={20}
                    width={20}
                    alt="logo image"
                  />
                }
              />
            </form>
          </div>
        </CardContent>
        <div className="text-center text-xs text-green-500 text-balance">
          By clicking continue, you agree to our{" "}
          <Link href="/about/privacy-policy">
            <span className="text-primary underline">Terms of Service</span>
          </Link>{" "}
          and Privacy Policy.
        </div>

        <Link href="/" className="text-center gap-2 text-primary underline">
          Home Page
        </Link>
      </Card>
    </div>
  );
}
