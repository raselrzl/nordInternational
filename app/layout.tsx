import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_Bengali,
  Tiro_Bangla,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/general/theme-provider";
import Footer from "@/components/general/Footer";
import VisitorTracker from "@/components/general/VisitorTracker";
import CountryListLinks from "@/components/general/CountryListLinks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  weight: ["400", "700"],
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
});

const tiroBangla = Tiro_Bangla({
  weight: ["400"],
  subsets: ["bengali"],
  variable: "--font-tiro-bangla",
});

export const metadata: Metadata = {
  title:
    "Nord International | Crime Reports | Unbiased & Fact-Based Journalism",
  description:
    "Nord International's crime section brings you accurate and up-to-date information on recent crimes, investigations, and law enforcement actions across the country. We dive deep into each incident to uncover the truth and work to raise awareness through responsible journalism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700&family=Tiro+Bangla&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} ${tiroBangla.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-7xl mx-auto">{children}</div>

          <Footer />
          <VisitorTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
