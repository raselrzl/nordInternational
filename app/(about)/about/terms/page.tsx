import { trackRoute } from "@/app/utils/routeTracker";
import React from "react";

export default async function TermsPage() {
  await trackRoute("Terms");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-200 leading-relaxed bg-[#202020]">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center uppercase">
        Terms & Conditions
      </h1>

      <p className="text-center text-sm mb-6">
        <strong>GlobalEye Press</strong>
      </p>

      <p className="text-center text-xs md:text-sm mb-8">
        <strong>Last updated:</strong> 2025 <br />
        <strong>Jurisdiction:</strong> Portugal
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Use of Website
      </h2>
      <p className="mb-4 text-sm">
        By accessing this website, you agree to these Terms & Conditions. If you
        do not agree, please do not use the site.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Content
      </h2>
      <p className="mb-4 text-sm">
        All content is provided for informational purposes only.
      </p>
      <p className="mb-4 text-sm">
        While we strive for accuracy, Souveral News does not guarantee
        completeness or timeliness of information and shall not be held liable
        for decisions made based on published content.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Intellectual Property
      </h2>
      <p className="mb-4 text-sm">
        All original content, branding, and materials belong to Souveral News
        unless otherwise stated.
      </p>
      <p className="mb-4 text-sm">
        Content may not be reproduced, distributed, or reused without
        permission, except where legally permitted.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • External Links
      </h2>
      <p className="mb-4 text-sm">
        Our website may contain links to third-party websites. We are not
        responsible for external content, policies, or practices.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • User Conduct
      </h2>
      <p className="mb-2 text-sm">Users agree not to:</p>
      <ul className="list-disc ml-6 mb-4 text-sm">
        <li>Misuse content</li>
        <li>Attempt unauthorized access</li>
        <li>Disrupt website operations</li>
        <li>Use the site for unlawful purposes</li>
      </ul>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Limitation of Liability
      </h2>
      <p className="mb-4 text-sm">
        To the extent permitted by law, Souveral News shall not be liable for
        indirect or consequential damages arising from website use.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Changes
      </h2>
      <p className="mb-4 text-sm">
        These Terms may be updated without prior notice. Continued use
        constitutes acceptance of updated terms.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Governing Law
      </h2>
      <p className="mb-8 text-sm">
        These Terms are governed by the laws of Portugal, without prejudice to
        applicable EU consumer protections.
      </p>
    </div>
  );
}
