import { trackRoute } from "@/app/utils/routeTracker";
import React from "react";

export default async function PrivacyPolicyPage() {
  await trackRoute("PrivacyPolicy");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="mb-4 text-base">
        <strong>Last Updated:</strong> {new Date().toLocaleDateString("en-US")}
      </p>

      <p className="mb-4 text-base">
        <strong>Nord International</strong> highly values your privacy. This policy explains how we collect, use, and store your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information Collection</h2>
      <ul className="list-disc ml-6 mb-4 text-base">
        <li>Name, email, phone number (if you provide them)</li>
        <li>Your browsing data, such as the pages you visit</li>
        <li>Device information via cookies and other tracking technologies</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Information</h2>
      <p className="mb-4 text-base">
        We use your information to provide better service, communicate with you, improve content, and analyze our operations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Information Security</h2>
      <p className="mb-4 text-base">
        We implement various technical and administrative measures to protect your data. However, 100% security on the internet cannot be guaranteed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Information Sharing</h2>
      <p className="mb-4 text-base">
        We do not sell your data to third parties. In some cases, limited data may be shared with service providers or for legal purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. External Links</h2>
      <p className="mb-4 text-base">
        Our website may contain links to third-party websites. Their privacy policies are beyond Nord International's control.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. User Rights</h2>
      <p className="mb-4 text-base">
        You may view, modify, or delete your personal information by contacting us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Policy Changes</h2>
      <p className="mb-4 text-base">
        We may update this privacy policy as needed. All changes will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact</h2>
      <p className="mb-4 text-base">
        For any questions regarding privacy, please contact us:
      </p>
      <ul className="list-none mb-6 text-base">
        <li><strong>Email:</strong> <a href="mailto:info@nordinternational.com" className="text-primary hover:underline">info@nordinternational.com</a></li>
      </ul>

      <p className="text-base italic">
        Thank you for being with Nord International.
      </p>
    </div>
  );
}
