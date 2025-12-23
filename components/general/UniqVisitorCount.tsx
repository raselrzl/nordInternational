"use client";

import { useEffect, useState } from "react";
import { getTotalNewUsers } from "@/app/actions"; // keep your current server/database action

export default function UniqueVisitorCountView() {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    async function fetchTotalUsers() {
      const res = await getTotalNewUsers();
      setTotalUsers(res.count);
    }

    fetchTotalUsers();
  }, []);

  return <div>{totalUsers}</div>;
}
