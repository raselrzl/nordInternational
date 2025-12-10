"use client";

import { getTotalNewUsers, registerNewUser } from "@/app/actions";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NewUserTracker() {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    let userId = localStorage.getItem("userId");

    // Track session start
    const sessionStart = Date.now();

    // Track read time
    let readTime = 0;
    const interval = setInterval(() => {
      readTime += 1;
    }, 1000);

    async function trackUser() {
      if (!userId) {
        userId = uuidv4();
        localStorage.setItem("userId", userId);
      }

      const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screen: `${window.screen.width}x${window.screen.height}`,
      };

      const sendData = () => {
        const sessionTime = Math.floor((Date.now() - sessionStart) / 1000);

        registerNewUser(userId!, {
          ...browserInfo,
          readTime,
          sessionTime,
        });
      };

      // Send session data on page exit
      window.addEventListener("beforeunload", sendData);

      // fetch total users
      const res = await getTotalNewUsers();
      setTotalUsers(res.count);

      return () => {
        clearInterval(interval);
        window.removeEventListener("beforeunload", sendData);
      };
    }

    trackUser();
  }, []);

  return <div></div>;
}
