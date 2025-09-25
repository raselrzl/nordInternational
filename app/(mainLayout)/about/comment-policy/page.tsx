import { trackRoute } from "@/app/utils/routeTracker";
import React from "react";

export default async function CommentPolicyPage() {
  await trackRoute("CommentPolicy");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Comment Policy
      </h1>

      <p className="mb-4 text-base">
        Nord International respects readers' opinions and freedom of expression. However, to ensure a constructive and safe online environment, we follow some specific guidelines.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Maintain Respect</h2>
      <p className="mb-4 text-base">
        Personal attacks, abusive language, or hateful comments are not acceptable. Please be respectful towards one another.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Hate Speech and Incitement Prohibited</h2>
      <p className="mb-4 text-base">
        Comments promoting hatred based on religion, ethnicity, gender, or personal identity are not allowed. No comments inciting violence or hatred will be published.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Spam and Advertising Prohibited</h2>
      <p className="mb-4 text-base">
        Any form of advertisement, promotion, or commercial links in comments is unacceptable. Automated bot comments or repeated identical comments are also prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Comment Review and Moderation</h2>
      <p className="mb-4 text-base">
        All comments go through a moderation process. Nord International reserves the right to delete or reject inappropriate comments.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Responsibility</h2>
      <p className="mb-4 text-base">
        Comments reflect the opinions of the readers themselves. Nord International is not responsible for any comment content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes</h2>
      <p className="mb-4 text-base">
        This policy may be updated at any time. New rules will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-2 text-base">
        For any questions or complaints about this policy, please contact us:
      </p>
      <ul className="text-base mb-4">
        <li><strong>Email:</strong> <a href="mailto:info@nordinternational.com" className="text-primary hover:underline">info@nordinternational.com</a></li>
      </ul>

      <p className="text-base italic">
        We believe constructive discussion plays a vital role in building a conscious society.
      </p>
    </div>
  );
}
