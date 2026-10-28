
import type { Metadata } from "next";
import Script from "next/script";
import {
  Geist,
  Geist_Mono,
  Inter,
  Noto_Sans_Bengali,
  Tiro_Bangla,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/general/theme-provider";
import NewUserTracker from "@/components/general/NewUserTracker";

// ---------------------- FONTS ----------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali"],
  display: "swap",
});

const tiroBangla = Tiro_Bangla({
  weight: ["400"],
  subsets: ["bengali"],
  variable: "--font-tiro-bangla",
  display: "swap",
});

// ---------------------- WEBSITE CONFIG ----------------------

const SITE_URL = "https://gepnews.com";
const SITE_NAME = "GEP News";

// ---------------------- SEO METADATA ----------------------

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "GEP News | Breaking News, World News, Politics, Business & Analysis",
    template: "%s | GEP News",
  },

  description:
    "GEP News brings you breaking news, world headlines, politics, business, technology, science, climate, crime reports, and in-depth analysis from around the world through responsible journalism.",

  applicationName: SITE_NAME,

  keywords: [
    "GEP News",
    "gepnews.com",
    "breaking news",
    "latest news",
    "world news",
    "international news",
    "political news",
    "business news",
    "technology news",
    "science news",
    "climate news",
    "crime news",
    "investigative journalism",
    "news analysis",
    "global headlines",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "news",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "GEP News | Breaking News, World News, Politics, Business & Analysis",
    description:
      "Stay informed with breaking news, world headlines, politics, business, technology, science, climate, crime reports, and in-depth analysis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GEP News — Breaking News and World Headlines",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "GEP News | Breaking News, World News, Politics, Business & Analysis",
    description:
      "Read the latest breaking news, international headlines, politics, business, technology, science, climate, and analysis on GEP News.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Add your actual Google Search Console verification code here
  // if you use HTML-tag verification.
  //
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
};

// ---------------------- ROOT LAYOUT ----------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Impact site verification */}

        <meta
          name="impact-site-verification"
          content="bfb46410-0651-45ca-b8dd-b2704df55aea"
        />
      </head>

      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${notoSansBengali.variable} ${tiroBangla.variable} antialiased`}
      >
        {/* Google AdSense */}

        <Script
          id="google-adsense"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5945782633100386"
          crossOrigin="anonymous"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NewUserTracker />

          <div className="mx-auto max-w-7xl">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
