import { trackRoute } from "@/app/utils/routeTracker";
import React from "react";

export default async function AdvertisingPolicyPage() {
  await trackRoute("AdvertisingPolicy");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-200 leading-relaxed shadow bg-[#202020]">
      <h1 className="text-xl md:text-2xl font-bold mb-2 text-center uppercase">
        Advertising Policy
      </h1>

      <p className="text-center text-sm mb-6">
        <strong>GlobalEye Press</strong>
      </p>

      <p className="text-xs md:text-sm mb-8 text-center">
        <strong>Last updated:</strong> 2025 <br />
        <strong>Operating from:</strong> Portugal
      </p>

      <p className="mb-4 text-xs md:text-sm">
        GlobalEye Press offers advertising and sponsorship opportunities designed
        to align with independent journalism and audience trust. Our advertising
        standards exist to protect editorial integrity, transparency, and reader
        confidence.
      </p>

      {/* Editorial Independence */}
      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Editorial Independence
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        Advertising and sponsored content are strictly separated from editorial
        operations.
      </p>
      <p className="mb-2 text-xs md:text-sm">Advertisers have:</p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>No influence over news selection</li>
        <li>No involvement in editorial decisions</li>
        <li>No right to preview or modify editorial content</li>
      </ul>
      <p className="mb-4 text-xs md:text-sm">
        All editorial judgments remain solely with GlobalEye Press.
      </p>

      {/* Transparency */}
      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Transparency & Labeling
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        All paid content is clearly identified using labels such as:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>Advertisement</li>
        <li>Sponsored</li>
        <li>Promoted Content</li>
      </ul>
      <p className="mb-4 text-xs md:text-sm">
        We do not publish undisclosed paid material or advertorials presented as
        independent journalism.
      </p>

      {/* Acceptable Advertising */}
      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Acceptable Advertising
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        We may accept advertising related to:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>Business and technology</li>
        <li>Consumer products and services</li>
        <li>Education and professional services</li>
        <li>Digital platforms and applications</li>
      </ul>
      <p className="mb-4 text-xs md:text-sm">
        Advertising must comply with applicable Portuguese and European Union
        laws, including consumer protection and data regulations.
      </p>

      {/* Restricted Advertising */}
      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Restricted or Prohibited Advertising
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        We reserve the right to reject or remove advertising that:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>Is misleading, deceptive, or unverifiable</li>
        <li>Promotes hate, discrimination, or violence</li>
        <li>Contains explicit, harmful, or unlawful material</li>
        <li>Conflicts with our editorial standards</li>
        <li>Creates a perception of editorial endorsement</li>
      </ul>
      <p className="mb-4 text-xs md:text-sm">
        Political advertising, where permitted by law, is subject to additional
        review and may be restricted or declined.
      </p>

      {/* Sponsored Content */}
      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Sponsored Content
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        Sponsored content, when accepted:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>Is clearly labeled</li>
        <li>Is reviewed for factual accuracy</li>
        <li>Does not imitate editorial tone or layout</li>
        <li>Does not express editorial opinion on behalf of GlobalEye Press</li>
      </ul>
      <p className="mb-4 text-xs md:text-sm">
        Sponsored content reflects the views of the sponsor, not the newsroom.
      </p>

      {/* Data Privacy */}
      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Data & User Privacy
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        Advertising activities on GlobalEye Press must respect user privacy and
        comply with GDPR and applicable Portuguese data protection laws. We do
        not allow advertising practices that require unlawful data collection
        or tracking.
      </p>

      {/* Right of Refusal */}
      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Right of Refusal
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        GlobalEye Press reserves the right to refuse or remove advertising at any
        time, update advertising standards as needed, and make decisions to
        protect editorial integrity and reader trust.
      </p>

      {/* No Endorsement */}
      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • No Endorsement
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        The appearance of advertising on GlobalEye Press does not constitute
        endorsement of any product, service, or organization.
      </p>

      {/* Advertise */}
      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Advertise With GlobalEye Press
      </h2>
      <p className="mb-6 text-xs md:text-sm">
        GlobalEye Press partners with brands and organizations seeking meaningful
        exposure within a trusted, independent news environment. Advertising
        partnerships are reviewed to ensure alignment with our values and
        audience trust. To explore opportunities, please contact us using the
        details provided on our website.
      </p>
    </div>
  );
}
