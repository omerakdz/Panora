import nodemailer from "nodemailer";
import type { EmailData } from "@/types";
import {
  generateCustomerEmailHTML,
  generateInternalEmailHTML,
  generateCustomerEmailText,
  generateInternalEmailText,
} from "@/lib/mail";

const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || "PANORA <matija@panora.be>",
  internalEmail: process.env.INTERNAL_EMAIL || "matija@panora.be",
};

export async function sendBookingEmails(emailData: EmailData) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const dateLabel = new Date(emailData.selectedDate).toLocaleDateString("nl-BE");

  await transporter.sendMail({
    from: EMAIL_CONFIG.from,
    to: emailData.customerEmail,
    subject: `Bevestiging Afspraak - PANORA - ${dateLabel}`,
    text: generateCustomerEmailText(emailData),
    html: generateCustomerEmailHTML(emailData),
  });

  await transporter.sendMail({
    from: EMAIL_CONFIG.from,
    to: EMAIL_CONFIG.internalEmail,
    subject: `🔔 Nieuwe Boeking - ${emailData.customerName} - ${dateLabel}`,
    text: generateInternalEmailText(emailData),
    html: generateInternalEmailHTML(emailData),
  });
}

