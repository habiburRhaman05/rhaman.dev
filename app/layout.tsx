import type React from "react";
import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/header";
import AdHeader from "./components/ad-header";
import { Suspense } from "react";
import Loading from "./components/loading";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habibur Rhaman - Software Developer",
  description: "Portfolio website of Habibur Rhaman , a Software Developer",
  icons: {
    icon: [
      { url: "/haquedot.svg", sizes: "any", type: "image/x-icon" },
      { url: "/haquedot.svg", sizes: "16x16", type: "image/png" },
      { url: "/haquedot.svg", sizes: "32x32", type: "image/png" },
    ],
    apple: "/haquedot.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            <AdHeader
            isExternal={true}
              title={"Opportune Hub"}
              description={"A modern website for a charitable organization, highlighting their mission, donation options, and community impact with a smooth UI/UX experience."}
              buttonText={"Visit Now"}
              href={"https://opportune-hub.vercel.app"}
            />

            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} HABIB. All rights reserved.
            </footer>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
