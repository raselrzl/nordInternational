"use client";
import { useState, useEffect } from "react";
import { submitPollVote, getLatestPoll } from "@/app/actions";
import { Banana, ThumbsDown, ThumbsUp } from "lucide-react";

export default function LivePoll() {
  const [pollData, setPollData] = useState<any>(null);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPoll = async () => {
      const data = await getLatestPoll();
      setPollData(data);
    };
    loadPoll();
  }, []);

  if (!pollData) return <p>Loading poll...</p>;

  const { poll, results } = pollData;

  if (!poll) {
    return (
      <div className="p-6 border rounded-lg max-w-md mx-auto text-center bg-white shadow">
        <p>No poll available at the moment.</p>
      </div>
    );
  }

  const handleVote = async () => {
    if (!selected) return alert("Select an option");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("pollQuestionId", poll.id.toString());
      formData.append("answer", selected);

      await submitPollVote(formData);

      const data = await getLatestPoll();
      setPollData(data);
      setSelected("");
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Failed to submit vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalVotes = results.YES + results.NO + results.NO_OPINION || 1;

  return (
    <div className="max-w-md mx-auto p-10 shadow-lg rounded-lg border">
      <h2 className="text-lg font-bold mb-4 text-center">{poll.question}</h2>

      <div className="space-y-3 mb-4">
        {["YES", "NO", "NO_OPINION"].map((opt) => (
          <label
            key={opt}
            className="flex items-center bg-gray-100 rounded px-3 py-2 cursor-pointer hover:bg-gray-200 transition"
          >
            <input
              type="radio"
              name="answer"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              disabled={loading}
              className="mr-3 w-4 h-4 accent-primary"
            />
            <span className="font-medium text-black">{opt.replace("_", " ")}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleVote}
        disabled={loading}
        className={`w-full text-white px-4 py-2 rounded-xs bg-primary hover:bg-primary/90 transition cursor-pointer ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Submit Vote"}
      </button>

      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-center">Live Results</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThumbsUp className="text-green-500" />
              <span>Yes</span>
            </div>
            <span>{results.YES}</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${(results.YES / totalVotes) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <ThumbsDown className="text-red-500" />
              <span>No</span>
            </div>
            <span>{results.NO}</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-red-500 h-2 rounded"
              style={{ width: `${(results.NO / totalVotes) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Banana className="text-yellow-500" />
              <span>No Opinion</span>
            </div>
            <span>{results.NO_OPINION}</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-yellow-400 h-2 rounded"
              style={{ width: `${(results.NO_OPINION / totalVotes) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
