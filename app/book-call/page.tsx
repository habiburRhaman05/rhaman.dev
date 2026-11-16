import type { Metadata } from "next";
import Link from "next/link";
import CalendlyBooking from "../components/calendly-booking";

export const metadata: Metadata = {
  title: "Book a Call | Habibur Rahman",
  alternates: { canonical: "/book-call" },
  openGraph: { title: "Book a Call | Habibur Rahman", description: "Discuss a website, app, AI agent or CRM automation project.", url: "/book-call" },
  description: "Discuss your website, app, AI agent or GoHighLevel automation project with Habibur Rahman.",
};

export default function BookCallPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Back to home</Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Let’s talk about your project.</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Building a website or app, exploring AI agents, or improving your GoHighLevel workflows? Choose a time below to discuss what you need.
        </p>
      </div>
      <CalendlyBooking />
      <p className="mt-5 text-center text-sm text-muted-foreground">
        Can’t see the calendar?{" "}
        <a href="https://calendly.com/devhabib2005/30min" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Open Calendly in a new tab</a>.
      </p>
    </section>
  );
}
