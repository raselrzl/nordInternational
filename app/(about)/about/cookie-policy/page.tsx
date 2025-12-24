import { trackRoute } from "@/app/utils/routeTracker";
import React from "react";

export default async function CookiePolicyPage() {
  await trackRoute("CookiePolicy");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-200 leading-relaxed shadow bg-[#202020]">
      <h1 className="text-xl md:text-2xl font-bold mb-2 text-center uppercase">
        Cookie Policy
      </h1>

      <p className="text-center text-sm mb-6">
        <strong>GlobalEye Press</strong>
      </p>

      <p className="text-xs md:text-sm mb-8 text-center">
        <strong>Last updated:</strong> 2025 <br />
        <strong>Operating from:</strong> Portugal
      </p>

      {/* Intro */}
      <p className="mb-4 text-xs md:text-sm">
        This Cookie Policy explains how GlobalEye Press uses cookies and similar
        technologies to ensure proper website functionality, enhance user
        experience, and protect our platform.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • What Are Cookies
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        Cookies are small text files stored on your device when you visit a
        website. They help websites function properly, understand how users
        interact with content, and improve overall experience.
      </p>
      <p className="mb-4 text-xs md:text-sm">
        Cookies do not give us access to your device or personal files.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • How We Use Cookies
      </h2>
      <p className="mb-2 text-xs md:text-sm">
        GlobalEye Press uses cookies only for purposes necessary to operate and
        improve the website. These purposes may include:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs md:text-sm">
        <li>Ensuring the website functions correctly</li>
        <li>Improving performance and usability</li>
        <li>Understanding how visitors use our content</li>
        <li>Protecting the website from misuse or abuse</li>
      </ul>
      <p className="mb-4 text-xs md:text-sm">
        We do not use cookies to identify you personally without your consent.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Types of Cookies We May Use
      </h2>

      <p className="mb-2 text-xs md:text-sm font-semibold">
        Essential Cookies
      </p>
      <p className="mb-4 text-xs md:text-sm">
        These cookies are required for the basic operation of the website.
        Without them, certain features may not function properly.
      </p>

      <p className="mb-2 text-xs md:text-sm font-semibold">
        Analytics Cookies
      </p>
      <p className="mb-4 text-xs md:text-sm">
        These cookies help us understand how visitors interact with our website,
        such as pages visited or time spent on the site. The data collected is
        aggregated and used only to improve our services.
      </p>

      <p className="mb-2 text-xs md:text-sm font-semibold">
        Third-Party Cookies
      </p>
      <p className="mb-4 text-xs md:text-sm">
        Some features may rely on trusted third-party services, such as analytics
        or embedded content. These providers may set cookies according to their
        own privacy and cookie policies.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Legal Basis
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        Where required under EU law, cookies are used based on user consent.
        Essential cookies are used based on legitimate interest to ensure website
        functionality and security.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Cookie Choices & Control
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        You can manage or disable cookies through your browser settings at any
        time. Please note that disabling certain cookies may affect website
        performance or functionality.
      </p>
      <p className="mb-4 text-xs md:text-sm">
        Where applicable, cookie consent tools are provided to allow you to
        manage your preferences.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Data Protection
      </h2>
      <p className="mb-4 text-xs md:text-sm">
        Any data collected through cookies is handled in accordance with our
        Privacy Policy and applicable European data protection regulations.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Changes to This Policy
      </h2>
      <p className="mb-6 text-xs md:text-sm">
        This Cookie Policy may be updated from time to time to reflect changes in
        technology, law, or website functionality. Updates will be published on
        this page.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
        • Contact
      </h2>
      <p className="mb-6 text-xs md:text-sm">
        If you have questions about how cookies are used, please contact us using
        the details provided on our website.
      </p>
    </div>
  );
}
