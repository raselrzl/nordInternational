import { trackRoute } from "@/app/utils/routeTracker";
import React from "react";

export default async function CommentPolicyPage() {
  await trackRoute("CommentPolicy");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-200 bg-[#202020] shadow">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-center uppercase">
        Comment Policy
      </h1>

      <p className="mb-4 text-xs md:text-sm">
        <strong>Global Eye</strong> respects readers' opinions and freedom of expression. 
        However, to ensure a constructive and safe online environment, we follow some specific guidelines.
      </p>

      {/* ===== Policy Items with Big Dot ===== */}
      <div className="space-y-6">
        {[
          {
            title: "Maintain Respect",
            text: "Personal attacks, abusive language, or hateful comments are not acceptable. Please be respectful towards one another."
          },
          {
            title: "Hate Speech and Incitement Prohibited",
            text: "Comments promoting hatred based on religion, ethnicity, gender, or personal identity are not allowed. No comments inciting violence or hatred will be published."
          },
          {
            title: "Spam and Advertising Prohibited",
            text: "Any form of advertisement, promotion, or commercial links in comments is unacceptable. Automated bot comments or repeated identical comments are also prohibited."
          },
          {
            title: "Comment Review and Moderation",
            text: "All comments go through a moderation process. Global Eye reserves the right to delete or reject inappropriate comments."
          },
          {
            title: "Responsibility",
            text: "Comments reflect the opinions of the readers themselves. Global Eye is not responsible for any comment content."
          },
          {
            title: "Changes",
            text: "This policy may be updated at any time. New rules will be posted on this page."
          },
        ].map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="mt-1 h-3 w-3 bg-gray-200 rounded-full flex-shrink-0"></span>
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h2>
              <p className="mb-0 text-xs md:text-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-2 text-xs md:text-sm">
        For any questions or complaints about this policy, please contact us:
      </p>
      <ul className="text-xs md:text-sm mb-4">
        <li>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:contact@globaleye.press"
            className="text-primary hover:underline"
          >
            contact@globaleye.press
          </a>
        </li>
      </ul>

      <p className="text-xs md:text-sm italic">
        We believe constructive discussion plays a vital role in building a conscious society.
      </p>
    </div>
  );
}
