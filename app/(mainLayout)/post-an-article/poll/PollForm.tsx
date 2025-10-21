"use client";
import { useState } from "react";
import { createPollQuestion } from "@/app/actions";

export default function PollForm() {
  
  const [question, setQuestion] = useState("");

  return (
    <form
      action={async (formData: FormData) => {
        await createPollQuestion(formData);
        setQuestion("");
        alert("Poll created!");
      }}
      className="p-4 border border-primary rounded-lg max-w-md mx-auto"
    >
      <label className="block mb-2 font-semibold">Write a Poll Question?</label>
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 rounded-xs w-full mb-3"
        placeholder="Enter question"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-xs hover:bg-primary/90 cursor-pointer"
      >
        Create Poll
      </button>
    </form>
  );
}
