import nodemailer from "nodemailer";
import { GMAIL_USER, GMAIL_PASSWORD } from '../../configurations/envKeys';

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${GMAIL_USER}`,
    pass: `${GMAIL_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


const sendMail = async (
  to: string, 
  message: string, 
  subject: string, 
  actionLink?: string, 
  actionText?: string
) => {
  try {
    const mailOptions = {
      from: `Eventyze`,
      to,
      subject,
      html: `
        <div style="width: 60%; margin: 0 auto; text-align: center; padding: 20px; border-radius: 10px; border: 2px solid gold; background-color: #fffaf0; font-family: Arial, sans-serif;">
          <h3 style="font-size: 24px; color: #d2691e; margin-bottom: 10px;">Welcome to Eventyze!!!</h3>
          <p style="font-size: 18px; color: #8b4513; margin: 10px 0;">
            ${message}
          </p>
          ${actionLink ? `<a href="${actionLink}" style="text-decoration: none; color: white; display: inline-block; background-color: #27AE60; padding: 10px 20px; border-radius: 10px;">${actionText}</a>` : ""}
          <p style="font-size: 18px; color: #2e8b57; margin: 10px 0;">
            Best regards,<br />
            <strong style="color: #ff4500;">The Eventyze Team</strong>
          </p>
        </div>
        `
    };

    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (err: any) {
    console.error('Error sending email:', err.message);
    throw new Error(err.message);
  }
};



  export default {
    sendMail
  }