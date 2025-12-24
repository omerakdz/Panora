import { NextResponse } from "next/server";
import {
  generateCustomerEmailHTML,
  generateInternalEmailHTML,
  generateCustomerEmailText,
  generateInternalEmailText,
} from "@/lib/mail";
import nodemailer from "nodemailer";



const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || "PANORA <matija@panora.be>",
  internalEmail: process.env.INTERNAL_EMAIL || "matija@panora.be",
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("📧 Email API called for:", data.customerName);

     console.log("🔧 SMTP Config:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      passwordLength: process.env.SMTP_PASSWORD?.length,
      passwordFirstChars: process.env.SMTP_PASSWORD?.substring(0, 4) + '...',
    });

    // Validate required fields
    if (
      !data.customerName ||
      !data.customerEmail ||
      !data.customerPhone ||
      !data.customerAddress ||
      !data.selectedDate ||
      !data.selectedTime
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert selectedDate string to Date object
    const emailData = {
      ...data,
      selectedDate: new Date(data.selectedDate),
    };

    // Generate email content
    const customerEmailHTML = generateCustomerEmailHTML(emailData);
    const customerEmailText = generateCustomerEmailText(emailData);
    const internalEmailHTML = generateInternalEmailHTML(emailData);
    const internalEmailText = generateInternalEmailText(emailData);

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send customer email
    await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: data.customerEmail,
      subject: `Bevestiging Afspraak - PANORA - ${new Date(data.selectedDate).toLocaleDateString('nl-BE')}`,
      text: customerEmailText,
      html: customerEmailHTML,
    });

    // Send internal email
    await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.internalEmail,
      subject: `🔔 Nieuwe Boeking - ${data.customerName} - ${new Date(data.selectedDate).toLocaleDateString('nl-BE')}`,
      text: internalEmailText,
      html: internalEmailHTML,
    });

    

    console.log("✅ Emails sent successfully");
    console.log("Customer email sent to:", data.customerEmail);
    console.log("Internal email sent to:", EMAIL_CONFIG.internalEmail);

    return NextResponse.json(
      {
        success: true,
        message: "Emails sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
