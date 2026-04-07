import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.FORM_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })


    // Email to you (original functionality)
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: 'devhabib2005@gmail.com',
      subject: `Habib | New message from ${name} (${email})`,
      text: message,
      html: `
      <h2>From Portfolio site</h2>
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    }

    await transporter.sendMail(mailOptionsToYou)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.log("error",error);
    
    console.error('Error sending email:', error)
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    )
  }
}