// app/(admin)/post-an-article/poll/page.tsx
import { requireUser } from "@/app/utils/requireUser";
import { requireArticlePoster } from "@/app/utils/NewsReporter";
import PollForm from "./PollForm";

export default async function AdminPollPage() {
   const session = await requireUser();
    await requireArticlePoster();

  return (
    <div className="">
      <h1 className="text-xl font-bold bg-accent-foreground/5 p-2 mb-8">Write a Poll Question?</h1>
      <PollForm />
    </div>
  );
}
