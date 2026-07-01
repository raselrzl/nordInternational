import type { Metadata } from "next";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tiroBangla = Tiro_Bangla({
  weight: ["400"],
  subsets: ["bengali"],
  variable: "--font-tiro-bangla",
});

export const metadata: Metadata = {
  title:
    "Breaking, World,  Politics, Business, Tech, Science,  Climate,  Analysis",
  description:
    "GlobalEye Press crime section brings you accurate and up-to-date information on recent crimes, investigations, and law enforcement actions across the country. We dive deep into each incident to uncover the truth and work to raise awareness through responsible journalism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
            <head>
              <meta name='impact-site-verification' content='bfb46410-0651-45ca-b8dd-b2704df55aea'></meta>

      </head>
      <body className={` ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NewUserTracker />
          <div className="max-w-7xl mx-auto">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
