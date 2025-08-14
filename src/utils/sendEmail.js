import nodemailer from 'nodemailer';
import { env } from './env.js';

const transport = nodemailer.createTransport({
  host: env('SMTP_HOST'),
  port: env('SMTP_PORT'),
  secure: false,
  auth: {
    user: env('SMTP_USER'),
    pass: env('SMTP_PASSWORD'),
  },
});

export function sendMail(to, subject, html) {
  return transport.sendMail({
    from: env('SMTP_FROM'),
    to,
    subject,
    html,
  });
}