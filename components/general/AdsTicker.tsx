// components/NewsTickerStatic.tsx
import React from "react";

export default function AdsTicker() {
  const message = "Contact us for advertisement contact@globaleye.press";

  // duplicate a few times so the ticker looks continuous
  const items = Array.from({ length: 6 }).map((_, i) => (
    <span key={i} className="pr-10">
      {message}
    </span>
  ));

  return (
    <div className="overflow-hidden bg-gray-50 text-green-600 font-bold">
      <div
        className="flex gap-10 items-center whitespace-nowrap [will-change:transform] animate-ticker text-xs"
        style={{ ["--ticker-speed" as any]: "300s" }}
        aria-label="Promotional headline ticker"
      >
        {items}
        {/* repeat again to make seamless loop */}
        {items}
      </div>
    </div>
  );
}
