"use client";
import { useState, useEffect } from "react";
import { submitPollVote, getLatestPoll } from "@/app/actions";

export default function LivePoll() {
  const [pollData, setPollData] = useState<any>(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const loadPoll = async () => {
      const data = await getLatestPoll();
      setPollData(data);
    };
    loadPoll();
  }, []);

  if (!pollData) return <p>Loading poll...</p>;

  const { poll, results } = pollData;

  // Safely handle no poll scenario
  if (!poll) {
    return (
      <div className="p-4 border rounded max-w-md mx-auto text-center">
        <p>No poll available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <h2 className="font-bold mb-3">{poll.question}</h2>

      {["YES", "NO", "NO_OPINION"].map((opt) => (
        <label key={opt} className="block mb-2">
          <input
            type="radio"
            name="answer"
            value={opt}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
            className="mr-2"
          />
          {opt.replace("_", " ")}
        </label>
      ))}

      <button
        onClick={async () => {
          if (!selected) return alert("Select an option");
          const formData = new FormData();
          formData.append("pollQuestionId", poll.id.toString());
          formData.append("answer", selected);

          await submitPollVote(formData);

          // Reload results
          const data = await getLatestPoll();
          setPollData(data);
          setSelected("");
        }}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 mt-2"
      >
        Submit Vote
      </button>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Live Results:</h3>
        <ul>
          <li>Yes: {results.YES}</li>
          <li>No: {results.NO}</li>
          <li>No Opinion: {results.NO_OPINION}</li>
        </ul>
      </div>
    </div>
  );
}
