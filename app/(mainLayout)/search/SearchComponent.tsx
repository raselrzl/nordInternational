"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <div className="flex items-center border border-primary/10 rounded-2xl overflow-hidden h-8">
      <input
        type="text"
        placeholder="Search on GEP..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="px-2 text-sm outline-none bg-transparent w-40 rounded-2xl"
      />
      <button
        onClick={handleSearch}
        className="px-2 flex items-center justify-center bg-primary p-4 text-white"
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
}
