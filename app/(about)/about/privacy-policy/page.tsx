import { trackRoute } from "@/app/utils/routeTracker";
import React from "react";

export default async function PrivacyPolicyPage() {
  await trackRoute("PrivacyPolicy");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-200 leading-relaxed shadow bg-[#202020]">
      <h1 className="text-xl md:text-2xl font-bold mb-2 text-center uppercase">
        Privacy Policy
      </h1>

      <p className="text-center text-sm mb-6">
        <strong>GlobalEye Press</strong>
      </p>

      <p className="text-xs md:text-sm mb-8 text-center">
        <strong>Last updated:</strong> 2025 <br />
        <strong>Operating from:</strong> Portugal
      </p>

        <p className="mb-4 text-xs md:text-sm">
        Souveral News respects your privacy and is committed to protecting
        personal data in accordance with the General Data Protection Regulation
        (GDPR) and applicable Portuguese law.
      </p>
      <p className="mb-4 text-xs md:text-sm">
        This Privacy Policy explains how personal data is collected, used, and
        protected when you visit our website or use our services.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Data We May Collect
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        Depending on how you interact with our website, we may collect:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>Contact information (e.g. name, email) if you contact us</li>
        <li>Technical data (IP address, browser type, device information)</li>
        <li>Usage data (pages visited, interaction data)</li>
        <li>Cookie and analytics data</li>
      </ul>
      <p className="mb-4 text-xs md:text-sm">
        We do not knowingly collect sensitive personal data.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Purpose of Data Processing
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        Personal data is processed for the following purposes:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>Website operation and security</li>
        <li>Responding to inquiries</li>
        <li>Improving content and user experience</li>
        <li>Legal and regulatory compliance</li>
      </ul>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Legal Basis
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        Data is processed based on:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>User consent (where applicable)</li>
        <li>Legitimate interest (website functionality and security)</li>
        <li>Legal obligations under EU law</li>
      </ul>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Cookies
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        We may use essential and analytical cookies to improve website
        performance. Where required, cookie consent mechanisms are provided.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Data Sharing
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        We do not sell personal data. Data may be shared only with trusted service
        providers (e.g. hosting, analytics) where necessary and under appropriate
        safeguards.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Data Retention
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        Personal data is retained only for as long as necessary to fulfill its
        purpose or comply with legal obligations.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Your Rights (GDPR)
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        You have the right to:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>Access your data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion</li>
        <li>Restrict or object to processing</li>
        <li>Withdraw consent where applicable</li>
      </ul>
      <p className="mb-4 text-xs md:text-sm">
        Requests can be made via our contact details listed on the website.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Data Security
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        Appropriate technical and organizational measures are used to protect
        personal data against unauthorized access, loss, or misuse.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Changes
      </h2>
      <p className="mb-6 text-xs md:text-sm">
        This policy may be updated periodically. Updates will be published on
        this page.
      </p>
    </div>
  );
}
