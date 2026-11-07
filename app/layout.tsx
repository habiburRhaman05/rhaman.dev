import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rhaman.vercel.app"),
  title: "Habibur Rahman | Full-Stack Developer & AI Automation",
  description:
    "Habibur Rahman builds full-stack web and mobile applications, GoHighLevel and n8n automations, AI voice solutions, and cloud integrations. Explore selected engineering work and get in touch.",
  openGraph: {
    title: "Habibur Rahman | Software Engineering & Automation",
    description: "Full-stack software, AI automation, and thoughtful systems built for real business needs.",
    url: "https://rhaman.vercel.app",
    siteName: "Habibur Rahman Portfolio",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/habib.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
