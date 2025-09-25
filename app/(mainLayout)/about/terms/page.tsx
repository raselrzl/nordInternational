import { trackRoute } from "@/app/utils/routeTracker";
import React from "react";

export default async function TermsPage() {
  await trackRoute("Terms");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

      <p className="mb-4 text-base">
        <strong>Last Updated:</strong> {new Date().toLocaleDateString("en-US")}
      </p>

      <p className="mb-4 text-base">
        By accessing or using the Nord International website, you agree to comply with these terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Service</h2>
      <p className="mb-4 text-base">
        You may use this website only for personal and non-commercial purposes. Any illegal activity using the website is strictly prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Content Ownership</h2>
      <p className="mb-4 text-base">
        All texts, images, videos, and other materials published on the website are the property of Nord International or licensed to it. Copying, publishing, or distributing content beyond personal use is prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Conduct</h2>
      <ul className="list-disc ml-6 mb-4 text-base">
        <li>Please refrain from posting offensive, defamatory, or hateful comments.</li>
        <li>Spreading false information or rumors is forbidden.</li>
        <li>Violation of others' privacy is not allowed.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Comment Policy</h2>
      <p className="mb-4 text-base">
        Readers are welcome to comment. However, we reserve the right to remove obscene, fabricated, or violent comments.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. External Links</h2>
      <p className="mb-4 text-base">
        Links to third-party sites on our website are not under Nord International’s control. We are not responsible for the content or security of those sites.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
      <p className="mb-4 text-base">
        We strive to keep all information accurate but Nord International is not liable for any errors, inaccuracies, or damages arising from the use of this website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes</h2>
      <p className="mb-4 text-base">
        These terms may be updated at any time. Any changes will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact</h2>
      <p className="mb-4 text-base">
        For questions or feedback regarding these terms, please contact us:
      </p>
      <ul className="list-none mb-6 text-base">
        <li><strong>Email:</strong> <a href="mailto:info@nordinternational.com" className="text-primary hover:underline">info@nordinternational.com</a></li>
      </ul>

      <p className="text-base italic">
        Thank you for being a member of the Nord International family.
      </p>
    </div>
  );
}
