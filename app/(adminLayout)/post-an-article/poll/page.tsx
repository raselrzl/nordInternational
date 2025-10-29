import { requireUser } from "@/app/utils/requireUser";
import { requireRoleAccess } from "../roleBaseAccess";
import PollForm from "./PollForm";
import { prisma } from "@/app/utils/db";
import { PaginationComponent } from "@/components/general/PaginationComponent";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

// Type definitions matching your Prisma schema
type PollAnswerType = {
  id: number;
  pollQuestionId: number;
  answer: "YES" | "NO" | "NO_OPINION" | string;
  createdAt: Date;
};

type PollType = {
  id: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
  answers: PollAnswerType[];
};

async function getAllPolls(
  page: number = 1,
  pageSize: number = 7
): Promise<{ polls: PollType[]; totalCount: number; totalPages: number }> {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    prisma.pollQuestion.findMany({
      take: pageSize,
      skip,
      orderBy: { createdAt: "desc" },
      include: {
        answers: true, // include all answers
      },
    }),
    prisma.pollQuestion.count(),
  ]);

  return {
    polls: data as PollType[],
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminPollPage({ searchParams }: SearchParamsProps) {
  await requireUser();
  const rewuireUserToAccessPage = await requireRoleAccess(["EDITOR", "SUPERADMIN"]);

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { polls, totalPages, totalCount } = await getAllPolls(currentPage);

  return (
    <div className="">
      <div className="flex items-center justify-between text-xl font-bold bg-accent-foreground/5 p-2 mb-8">
        <h1>Write a Poll Question?</h1>
        <div className="text-sm bg-primary text-white px-3 py-1 rounded-md">
          Total: {totalCount}
        </div>
      </div>

      <PollForm />

      {polls.length > 0 ? (
        <Card className="rounded-xs mt-3">
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>YES</TableHead>
                  <TableHead>NO</TableHead>
                  <TableHead>NO_OPINION</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {polls.map((poll) => {
                  // Count answers
                  const answerCounts = { YES: 0, NO: 0, NO_OPINION: 0 };
                  poll.answers.forEach((a) => {
                    if (a.answer in answerCounts) {
                      answerCounts[a.answer as keyof typeof answerCounts]++;
                    }
                  });

                  return (
                    <TableRow key={poll.id}>
                      <TableCell>{poll.question ?? "N/A"}</TableCell>
                      <TableCell>{answerCounts.YES}</TableCell>
                      <TableCell>{answerCounts.NO}</TableCell>
                      <TableCell>{answerCounts.NO_OPINION}</TableCell>
                      <TableCell>
                        {new Date(poll.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-gray-500 py-4">
          <p className="font-medium text-lg">No Poll Questions Yet</p>
          <p>Create a poll question above to see it listed here.</p>
        </div>
      )}

      {polls.length > 0 && (
        <PaginationComponent totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
