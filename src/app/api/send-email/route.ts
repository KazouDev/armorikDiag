import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { from, subject, message } = body;

    console.log("RECU :", body);

    if (!from || !message) {
      return NextResponse.json({ success: false, error: "Email et message requis" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SMTP_HOST,
      port: Number(process.env.MAIL_SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.MAIL_SMTP_USER,
        pass: process.env.MAIL_SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_SMTP_USER,
      to: process.env.API_MAIL_DEST || process.env.MAIL_SMTP_USER,
      replyTo: from,
      subject: `[Contact Armorik] ${subject || 'Demande'}`,
      text: message,
      html: `<strong>${message.replace(/\n/g, '<br>')}</strong>`,
    };

    //await transporter.sendMail(mailOptions);
    console.log(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("ERREUR SMTP :", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
