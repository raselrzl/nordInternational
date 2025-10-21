"use server";

import { prisma } from "@/app/utils/db";
import { z } from "zod";

const PollVoteSchema = z.object({
  pollQuestionId: z.string(),
  answer: z.enum(["YES", "NO", "NO_OPINION"]),
  visitorId: z.string(),
});

export async function submitPollVote(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = PollVoteSchema.safeParse(raw);

  if (!parsed.success) throw new Error("Invalid vote data");

  // Prevent duplicate vote per visitor
  const existing = await prisma.pollAnswer.findFirst({
    where: {
      pollQuestionId: parseInt(parsed.data.pollQuestionId),
      answer: parsed.data.answer,
    },
  });

  if (existing) return { success: false, message: "You already voted" };

  await prisma.pollAnswer.create({
    data: {
      pollQuestionId: parseInt(parsed.data.pollQuestionId),
      answer: parsed.data.answer,
    },
  });

  return { success: true };
}
