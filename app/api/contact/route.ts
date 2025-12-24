import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    console.log("📧 Contact form submission:", { name, email, phone });

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Alle velden zijn verplicht" },
        { status: 400 }
      );
    }

    //  transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `PANORA Website <${process.env.SMTP_USER}>`,
      to: process.env.INTERNAL_EMAIL,
      subject: `📬 Nieuw Contactformulier - ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="nl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nieuw Contactformulier</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #044D8E 0%, #1792D0 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">PANORA</h1>
                      <p style="margin: 10px 0 0; color: #9FCAE3; font-size: 16px;">Nieuw Contactformulier Bericht</p>
                    </td>
                  </tr>

                  <!-- Icon -->
                  <tr>
                    <td style="padding: 40px 30px 20px; text-align: center;">
                      <div style="width: 80px; height: 80px; background-color: #e3f2fd; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: #044D8E; font-size: 50px;">📬</span>
                      </div>
                      <h2 style="margin: 0 0 10px; color: #044D8E; font-size: 24px;">Nieuwe Vraag van Bezoeker</h2>
                    </td>
                  </tr>

                  <!-- Contact Details -->
                  <tr>
                    <td style="padding: 0 30px 30px;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                        <tr>
                          <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                            <strong style="color: #044D8E; display: block; margin-bottom: 5px;">👤 Naam</strong>
                            <span style="color: #0F61AC; font-size: 16px;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                            <strong style="color: #044D8E; display: block; margin-bottom: 5px;">📧 Email</strong>
                            <a href="mailto:${email}" style="color: #1792D0; font-size: 16px; text-decoration: none;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                            <strong style="color: #044D8E; display: block; margin-bottom: 5px;">📱 Telefoon</strong>
                            <a href="tel:${phone}" style="color: #1792D0; font-size: 16px; text-decoration: none;">${phone}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 15px 0;">
                            <strong style="color: #044D8E; display: block; margin-bottom: 10px;">💬 Bericht</strong>
                            <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; border-left: 4px solid #1792D0;">
                              <p style="margin: 0; color: #0F61AC; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Action Buttons -->
                  <tr>
                    <td style="padding: 0 30px 30px; text-align: center;">
                      <p style="color: #0F61AC; margin: 0 0 20px; font-size: 14px;">Reageer zo snel mogelijk:</p>
                      <a href="mailto:${email}" style="display: inline-block; padding: 15px 30px; background-color: #044D8E; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 0 10px 10px 0;">
                        📧 Stuur Email
                      </a>
                      <a href="tel:${phone}" style="display: inline-block; padding: 15px 30px; background-color: #1792D0; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 0 0 10px 0;">
                        📞 Bel Direct
                      </a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="margin: 0 0 10px; color: #044D8E; font-weight: bold; font-size: 18px;">PANORA</p>
                      <p style="margin: 0 0 5px; color: #6c757d; font-size: 14px;">Professionele ramenwasdienst</p>
                      <p style="margin: 0; color: #6c757d; font-size: 12px;">
                        Dit bericht is verzonden via het contactformulier op de website
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
    NIEUW CONTACTFORMULIER BERICHT

    Naam: ${name}
    Email: ${email}
    Telefoon: ${phone}

    Bericht:
    ${message}

---
Dit bericht is verzonden via het contactformulier op panora.be
      `,
    });

    console.log("✅ Contact email sent");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error sending contact email:", error);
    return NextResponse.json(
      { error: "Fout bij verzenden" },
      { status: 500 }
    );
  }
}