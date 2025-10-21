// app/(admin)/post-an-article/poll/page.tsx
import { requireUser } from "@/app/utils/requireUser";
import { requireArticlePoster } from "@/app/utils/NewsReporter";
import PollForm from "./PollForm";

export default async function AdminPollPage() {
   const session = await requireUser();
    await requireArticlePoster();

  return (
    <div className="p-6">
      <PollForm />
    </div>
  );
}
