import { trackRoute } from "@/app/utils/routeTracker";

export default async function Editor() {
  await trackRoute("Editor");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-200 leading-relaxed bg-[#202020]">
      <h1 className="text-xl md:text-2xl font-bold mb-2 text-center uppercase">
        Editorial Policy & Regulatory Compliance
      </h1>

      <p className="text-center text-sm mb-6">
        <strong>GlobalEye Press</strong>
      </p>

      <p className="text-center text-xs md:text-sm mb-8">
        <strong>Last updated:</strong> 2025 <br />
        <strong>Operating jurisdiction:</strong> Portugal / European Union
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        • About GlobalEye Press
      </h2>
      <p className="mb-4 text-sm">
        GlobalEye Press News is an independent, digital-first news organization operated
        from Portugal.
      </p>
      <p className="mb-4 text-sm">
        We are committed to verified reporting, clear analysis, and responsible
        journalism. Our work is grounded in facts, context, and accountability,
        with the aim of helping audiences understand events accurately and
        respons Presibly.
      </p>
      <p className="mb-4 text-sm">
        Global EYEs News is founder-led and editorially independent. We are not
        affiliated with, endorsed by, or officially recognized by any government,
        political entity, or European Union institution.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        • Editorial Mission
      </h2>
      <p className="mb-4 text-sm">
        Our mission is to inform, explain, and earn trust.
      </p>
      <p className="mb-4 text-sm">
        We believe journalism carries public responsibility. Every story we
        publish is intended to add clarity, not noise; understanding, not
        outrage.
      </p>
      <ul className="list-disc ml-6 mb-4 text-sm">
        <li>Accuracy over speed</li>
        <li>Context over sensationalism</li>
        <li>Credibility over clicks</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        • Editorial Standards
      </h2>

      <p className="font-medium mb-1 text-sm">Accuracy & Verification</p>
      <p className="mb-4 text-sm">
        All reporting is based on verified information from reliable sources.
        Facts are checked prior to publication, and uncertainty is clearly
        communicated when information is evolving.
      </p>
      <p className="mb-4 text-sm">
        Errors, when identified, are corrected promptly and transparently.
      </p>

      <p className="font-medium mb-1 text-sm">Independence</p>
      <p className="mb-4 text-sm">
        Editorial decisions are made independently of political, commercial, or
        personal influence. Advertising, sponsorships, or partnerships do not
        affect editorial judgment.
      </p>

      <p className="font-medium mb-1 text-sm">Context & Fairness</p>
      <p className="mb-4 text-sm">
        We provide proportion, background, and relevant context. Stories are
        reported fairly and responsibly, avoiding exaggeration or distortion.
      </p>

      <p className="font-medium mb-1 text-sm">
        Transparency & Accountability
      </p>
      <p className="mb-4 text-sm">
        We are accountable to our audience. Conflicts of interest are disclosed
        where applicable, and editorial standards are applied consistently.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        • Corrections & Right to Rectification
      </h2>
      <p className="mb-4 text-sm">
        In line with Portuguese and European journalistic practice, GlobalEye Press
        respects the right to correction and rectification.
      </p>
      <ul className="list-disc ml-6 mb-4 text-sm">
        <li>Corrections are made without undue delay</li>
        <li>Corrections are clearly indicated</li>
        <li>Updated information is presented transparently</li>
      </ul>
      <p className="mb-4 text-sm">
        Requests for correction are reviewed fairly and in good faith.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        • Regulatory Alignment (Portugal / EU)
      </h2>

      <p className="font-medium mb-1 text-sm">
        Media Freedom & Independence
      </p>
      <p className="mb-4 text-sm">
        GlobalEye Press voluntarily aligns its editorial practices with generally
        accepted European principles of media freedom and editorial independence.
      </p>
      <p className="mb-4 text-sm">
        This alignment reflects internal policies and commitments and does not
        constitute authorization, certification, or approval by Portuguese
        authorities or European Union institutions.
      </p>

      <p className="font-medium mb-1 text-sm">
        EU Digital Services Act (DSA)
      </p>
      <p className="mb-4 text-sm">
        GlobalEye Press operates in awareness of the principles established under
        the EU Digital Services Act.
      </p>
      <ul className="list-disc ml-6 mb-4 text-sm">
        <li>
          Clearly distinguish editorial content from advertising or sponsored
          material
        </li>
        <li>Avoid deceptive or manipulative content practices</li>
        <li>
          Apply reasonable moderation standards where user interaction is
          enabled
        </li>
        <li>Provide contact mechanisms for reporting concerns</li>
      </ul>
      <p className="mb-4 text-sm">
        Legal obligations under the DSA may vary depending on service size and
        reach.
      </p>

      <p className="font-medium mb-1 text-sm">GDPR & Data Protection</p>
      <p className="mb-4 text-sm">
        GlobalEye Press processes personal data in accordance with the General Data
        Protection Regulation (GDPR) and applicable Portuguese law.
      </p>
      <ul className="list-disc ml-6 mb-4 text-sm">
        <li>Collect only data necessary for defined purposes</li>
        <li>Process data lawfully and transparently</li>
        <li>Implement appropriate security measures</li>
        <li>Respect data subject rights</li>
      </ul>
      <p className="mb-4 text-sm">
        Journalistic activities are conducted under GDPR provisions related to
        freedom of expression and information, with proportionality and
        responsibility.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        • Conflicts of Interest
      </h2>
      <p className="mb-4 text-sm">
        Internal measures are maintained to identify and manage potential
        conflicts of interest. Editors and contributors are expected to disclose
        relevant interests that could reasonably affect editorial impartiality.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        • Public Responsibility
      </h2>
      <p className="mb-4 text-sm">
        We recognize the societal impact of information. Our reporting seeks to
        balance the public’s right to know with respect for individuals,
        communities, and legal considerations.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        • Disclaimer
      </h2>
      <p className="mb-6 text-sm">
        Statements regarding regulatory alignment or compliance reflect internal
        policies and operational commitments and do not imply official
        authorization, certification, or approval by any regulatory or
        governmental authority.
      </p>
    </div>
  );
}
