import type React from "react";
import type { Metadata } from "next/types";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/header";
import { Suspense } from "react";
import Loading from "./components/loading";
import { Analytics } from "@vercel/analytics/next";
import Footer from "./components/footer";
import { siteUrl, siteDescription } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Habibur Rahman | Software Developer & AI Automation",
  description: siteDescription,
  authors: [{ name: "Habibur Rahman", url: siteUrl }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", siteName: "Habibur Rahman", locale: "en_US", title: "Habibur Rahman | Software Developer & AI Automation", description: siteDescription },
  twitter: { card: "summary", title: "Habibur Rahman | Software Developer & AI Automation", description: siteDescription },
  icons: { icon: "/habib.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><link rel="describedby" href="/llms.txt" /></head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            <Header />
            {children}
            <Footer />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
