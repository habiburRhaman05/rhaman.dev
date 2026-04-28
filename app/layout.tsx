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

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Habibur Rhaman — Full-Stack Software Engineer",
  description:
    "Portfolio of Habibur Rhaman — Full-Stack Developer specializing in MERN, Next.js, and scalable web applications.",
     icons: {
    icon: '/habib.svg', 
   
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            <main>{children}</main>
            <Footer />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
