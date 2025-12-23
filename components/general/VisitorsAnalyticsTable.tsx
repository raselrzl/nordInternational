"use client";
import { useEffect, useState } from "react";
import { getUserAnalytics } from "@/app/actions";

type SampleUser = {
  id: number;
  userId: string;
  language: string | null;
  ip: string | null;
};

type AnalyticsRow = {
  country: string;
  city: string;
  userCount: number;
  totalVisits: number;
  totalReadTime: number; // seconds
  totalSessionTime: number; // seconds
  sampleUsers: SampleUser[];
};

export default function UserAnalyticsTable() {
  const [data, setData] = useState<AnalyticsRow[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    getUserAnalytics().then((res) => setData(res));
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center uppercase">User Analytics</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-primary">
            <th className="border px-2 py-1">Country</th>
            <th className="border px-2 py-1">City</th>
            <th className="border px-2 py-1">User Count</th>
            <th className="border px-2 py-1">Total Visits</th>
            <th className="border px-2 py-1">Total Read Time (min)</th>
            <th className="border px-2 py-1">Total Session Time (min)</th>
           {/*  <th className="border px-2 py-1">Sample Users</th> */}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, idx) => (
            <tr key={idx} className="text-center">
              <td className="border px-2 py-1">{row.country}</td>
              <td className="border px-2 py-1">{row.city}</td>
              <td className="border px-2 py-1">{row.userCount}</td>
              <td className="border px-2 py-1">{row.totalVisits}</td>
              <td className="border px-2 py-1">{Math.floor(row.totalReadTime / 60)}</td>
              <td className="border px-2 py-1">{Math.floor(row.totalSessionTime / 60)}</td>
           {/*    <td className="border px-2 py-1">
                {row.sampleUsers.map((u) => u.userId).join(", ")}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          className="px-3 py-1 bg-primary rounded-xs disabled:opacity-50"
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          className="px-3 py-1 bg-primary rounded-xs disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
