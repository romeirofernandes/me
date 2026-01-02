// SMTP utility for sending emails using nodemailer
import nodemailer from 'nodemailer';

export function createTransporter({ host, port, user, pass }) {
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: { user, pass },
  });
}

export async function sendMail({ transporter, to, subject, html, text }) {
  return transporter.sendMail({
    from: transporter.options.auth.user,
    to,
    subject,
    html,
    text,
  });
}
