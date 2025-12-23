import { trackRoute } from "@/app/utils/routeTracker";
import AdvertiseForm from "./AdvertsieContactForm";
import {
  Target,
  Users,
  ShieldCheck,
  Globe,
  Layout,
  Video,
  FileText,
  Calendar,
  Mail,
} from "lucide-react";

export default async function AdvertisePage() {
  await trackRoute("Advertise");

  return (
    <div className="py-10 bg-[#202020] min-h-screen text-gray-200">
      <div className="max-w-3xl mx-auto p-6 font-[Noto_Sans_Bengali] text-gray-200">
        {/* Header */}
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-200">
          GlobalEye Press
        </h2>

        <p className="mb-6 text-sm">
          GlobalEye Press is an independent digital media company based in
          Portugal, delivering verified reporting and thoughtful analysis across
          global and regional stories. We can be the most reliable and effective
          advertising platform for your brand, product, or service.
        </p>

        {/* Why Advertise */}
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-200">
          Why advertise with us?
        </h3>
        <ul className="space-y-4 mb-6 text-sm">
          {[
            {
              icon: <Target className="text-gray-200 mt-1 shrink-0" />,
              text: "Targeted Audience: Our readership is aware, active in decision-making, and influential in society."
            },
            {
              icon: <Users className="text-gray-200 mt-1 shrink-0" />,
              text: "High Reach & Engagement: Thousands of daily visitors and followers across our website and social media."
            },
            {
              icon: <ShieldCheck className="text-gray-200 mt-1 shrink-0" />,
              text: "Trusted Platform: Our core strength lies in public trust due to fact-based and unbiased journalism."
            },
            {
              icon: <Globe className="text-gray-200 mt-1 shrink-0" />,
              text: "Multi-platform Coverage: Your ads reach the right audience across our website, Facebook, Instagram, YouTube, and more."
            },
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-1 h-3 w-3 bg-gray-200 rounded-full flex-shrink-0"></span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        {/* Services */}
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-200">
          Advertising Services
        </h3>
        <ul className="space-y-3 mb-6 text-sm">
          {[
            { icon: <Layout className="text-gray-200 shrink-0" />, text: "Banner Ads (Website)" },
            { icon: <Users className="text-gray-200 shrink-0" />, text: "Sponsored Posts (Social Media)" },
            { icon: <Video className="text-gray-200 shrink-0" />, text: "Video & Reel Advertising" },
            { icon: <FileText className="text-gray-200 shrink-0" />, text: "Branded Content & Promotion" },
            { icon: <Calendar className="text-gray-200 shrink-0" />, text: "Event Coverage & Sponsorship" },
            { icon: <FileText className="text-gray-200 shrink-0" />, text: "Press Releases & Feature Reports" },
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        {/* Contact */}
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-200">
          Get in Touch
        </h3>
        <p className="mb-8 flex items-center gap-2 text-sm">
          <Mail className="text-gray-200 shrink-0" />
          Contact us to book your ad or inquire about pricing.
        </p>

        <h4 className="text-sm font-semibold text-gray-200 mb-4">
          Or fill out the form below
        </h4>

        <AdvertiseForm />
      </div>
    </div>
  );
}
