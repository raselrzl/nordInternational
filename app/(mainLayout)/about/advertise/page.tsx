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
    <div className="py-10">
      <div className="max-w-3xl mx-auto bg-background rounded-lg shadow-md text-foreground font-[Noto_Sans_Bengali]">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-600 px-4">
          Nord International
        </h2>
        <p className="mb-6  px-4">
          A fast-growing and reader-favorite online news platform that reaches thousands of conscious and responsible individuals every day. We can be the most reliable and effective advertising platform for your brand, product, or service.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-orange-700 px-4">
          Why advertise with us?
        </h3>
        <ul className="space-y-4 mb-6  px-4">
          <li className="flex items-start gap-3">
            <Target className="text-orange-500 mt-1" />
            <span>
              <strong>Targeted Audience:</strong> Our readership is aware, active in decision-making, and influential in society.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Users className="text-orange-500 mt-1" />
            <span>
              <strong>High Reach & Engagement:</strong> Thousands of daily visitors and followers across our website and social media.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="text-orange-500 mt-1" />
            <span>
              <strong>Trusted Platform:</strong> Our core strength lies in public trust due to fact-based and unbiased journalism.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Globe className="text-orange-500 mt-1" />
            <span>
              <strong>Multi-platform Coverage:</strong> Your ads reach the right audience across our website, Facebook, Instagram, YouTube, and more.
            </span>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-4 text-orange-700 px-4">Advertising Services:</h3>
        <ul className="space-y-4 mb-6 px-4">
          <li className="flex items-center gap-3">
            <Layout className="text-orange-600" /> Banner Ads (Website)
          </li>
          <li className="flex items-center gap-3">
            <Users className="text-orange-600" /> Sponsored Posts (Social Media)
          </li>
          <li className="flex items-center gap-3">
            <Video className="text-orange-600" /> Video & Reel Advertising
          </li>
          <li className="flex items-center gap-3">
            <FileText className="text-orange-600" /> Branded Content & Promotion
          </li>
          <li className="flex items-center gap-3">
            <Calendar className="text-orange-600" /> Event Coverage & Sponsorship
          </li>
          <li className="flex items-center gap-3">
            <FileText className="text-orange-600" /> Press Releases & Feature Reports
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 text-orange-700  px-4">Get in Touch:</h3>
        <p className="mb-8 flex items-center gap-2 px-4">
          <Mail className="text-orange-500" />
          Contact us to book your ad or to inquire about pricing
        </p>

        <h4 className="text-lg font-semibold text-orange-600 mb-4 px-4">
          Or fill out the form below
        </h4>

        <AdvertiseForm />
      </div>
    </div>
  );
}
