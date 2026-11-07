import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message, projectType = "General inquiry", website = "" } = payload || {};

    // Honeypot field: successful-looking response reduces noisy bot retries.
    if (website) return NextResponse.json({ ok: true });

    if (typeof name !== "string" || typeof email !== "string" ||
        typeof message !== "string" || typeof projectType !== "string" ||
        name.trim().length < 2 || name.length > 120 || !isEmail(email) || email.length > 254 ||
        message.trim().length < 10 || message.length > 4000 || projectType.length > 100) {
      return NextResponse.json({ error: "Please check your name, email, and message." }, { status: 400 });
    }

    const sender = process.env.FORM_EMAIL;
    const password = process.env.GMAIL_APP_PASSWORD;
    if (!sender || !password) {
      console.error("Portfolio email configuration missing");
      return NextResponse.json({ error: "Contact email is temporarily unavailable. Please email me directly." }, { status: 503 });
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user: sender, pass: password },
    });

    await transport.sendMail({
      from: sender,
      to: process.env.CONTACT_TO_EMAIL || sender,
      replyTo: email.trim(),
      subject: `Portfolio inquiry: ${projectType.replace(/[\r\n]/g, " ")}`,
      text: `From: ${name.trim()}\nEmail: ${email.trim()}\nProject type: ${projectType}\n\n${message.trim()}`,
      html: `<h2>New portfolio inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name.trim())}</p><p><strong>Email:</strong> ${escapeHtml(email.trim())}</p><p><strong>Project type:</strong> ${escapeHtml(projectType)}</p><p style="white-space:pre-wrap">${escapeHtml(message.trim())}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Portfolio email delivery failed:", error);
    return NextResponse.json({ error: "Message could not be sent. Please email me directly." }, { status: 500 });
  }
}
