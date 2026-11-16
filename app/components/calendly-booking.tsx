"use client";
import { useRef } from "react";
import Script from "next/script";

const bookingUrl = "https://calendly.com/devhabib2005/30min?hide_event_type_details=1&hide_gdpr_banner=1";

export default function CalendlyBooking() {
  const container = useRef<HTMLDivElement>(null);
  function initialize() {
    const calendly = (window as Window & {
      Calendly?: { initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void };
    }).Calendly;
    if (container.current && calendly && !container.current.querySelector("iframe")) {
      calendly.initInlineWidget({ url: bookingUrl, parentElement: container.current });
    }
  }
  return (
    <>
      <div ref={container} className="w-full" style={{ minWidth: "320px", height: 700 }} aria-label="Schedule a call with Habibur Rahman" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" onReady={initialize} />
    </>
  );
}
