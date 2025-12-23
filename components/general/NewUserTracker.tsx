"use client";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { registerNewUser } from "@/app/actions"; // keep your current server/database action

export default function NewUserTracker() {
  useEffect(() => {
    let userId = localStorage.getItem("userId");

    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }

    const sessionStart = Date.now();
    let readTime = 0;

    const interval = setInterval(() => {
      readTime += 1;
    }, 1000);

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

    window.addEventListener("beforeunload", sendData);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", sendData);
      sendData(); // send one last time on unmount
    };
  }, []);

  return null; // no UI
}
