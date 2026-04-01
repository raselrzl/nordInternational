"use client";

import { useState } from "react";
import { OpinionForm } from "./OpinionForm";

export default function ComplaintPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full flex">
        <button
          onClick={() => setOpen(true)}
          className="hover:underline text-foreground/90 text-sm"
        >
          Complaint
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* Modal Box */}
          <div className="bg-white dark:bg-black w-full max-w-2xl mx-4 rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white text-xl"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4 text-center">
              Opinion / Complaint
            </h2>

            {/* Form */}
            <div className="max-h-[70vh] overflow-y-auto pr-2">
              <OpinionForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
