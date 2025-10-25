// app/(admin)/post-an-article/poll/page.tsx
import { requireUser } from "@/app/utils/requireUser";
import { requireArticlePoster } from "@/app/utils/NewsReporter";
import PollForm from "./PollForm";
import { requireRoleAccess } from "../roleBaseAccess";

export default async function AdminPollPage() {
   const session = await requireUser();
    const rewuireUserToAccessPage = await requireRoleAccess([
           "SOMPANDOK",
           "SUPERADMIN"
         ]);

  return (
    <div className="">
      <h1 className="text-xl font-bold bg-accent-foreground/5 p-2 mb-8">Write a Poll Question?</h1>
      <PollForm />
    </div>
  );
}
