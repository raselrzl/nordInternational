import { trackRoute } from "@/app/utils/routeTracker";
import AdvertiseForm from "./AdvertsieContactForm";
import { Mail } from "lucide-react";

export default async function AdvertisePage() {
  await trackRoute("Advertise");

  return (
    <div className="py-10 bg-[#202020] min-h-screen text-gray-200">
      <div className="max-w-3xl mx-auto p-6 text-gray-200 leading-relaxed">
        {/* Header */}
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-200">
          GlobalEye Press
        </h2>

        <p className="mb-4 text-sm">
          GlobalEye Press offers advertising and sponsorship opportunities
          designed for brands, organizations, and institutions seeking
          visibility alongside independent, responsible journalism.
        </p>

        <p className="mb-4 text-sm">
          Our advertising solutions are built to respect editorial integrity,
          audience trust, and transparency. Commercial relationships do not
          influence editorial decisions, coverage priorities, or newsroom
          operations.
        </p>

        <p className="mb-6 text-sm">
          Advertising placements are subject to review and must comply with our
          Advertising Guidelines. For inquiries, please contact us using the
          official contact information listed below.
        </p>

        {/* Contact */}
        <div className="mb-8 flex items-center gap-2 text-sm">
          <Mail className="shrink-0 text-gray-200" />
          <span>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contacts@globaleye.press"
              className="underline hover:text-white"
            >
              contacts@globaleye.press
            </a>
          </span>
        </div>

        {/* Optional Form */}
        <h4 className="text-sm font-semibold text-gray-200 mb-4">
          Or submit an inquiry using the form below
        </h4>

        <AdvertiseForm />
      </div>
    </div>
  );
}
