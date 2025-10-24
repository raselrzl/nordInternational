import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/general/Navbar";
import Sidebar from "./Sidebar";
import { LogOut } from "lucide-react";
import { signOut } from "@/app/utils/auth";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex">
      {/* Sidebar (Client Component) */}
      <Card className=" hidden md:flex sticky top-24 h-[80%] py-0 rounded-none">
        <Sidebar />

        <form
          className="bg-gray-600 p-4"
          action={async () => {
            "use server";
            await signOut({
              redirectTo: "/",
            });
          }}
        >
          <button className="flex w-full items-center justify-center gap-2 cursor-pointer">
            <LogOut size={16} strokeWidth={2} className="opacity-60" />
            <span>Logout</span>
          </button>
        </form>
      </Card>

      {/* Main content */}
      <div className="flex-1 overflow-auto relative min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md max-w-7xl mx-auto">
          <Navbar />
        </div>
        <div className="mt-24"></div>
        <h1 className="md:hidden text-xl font-bold bg-gray-600 text-center text-primary p-2">
          Admin Panel
        </h1>
        <div className="p-2 md:px-4 border-1 mb-10 shadow">{children}</div>
      </div>
    </div>
  );
}
