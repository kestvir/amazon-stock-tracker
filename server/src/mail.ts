import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
});

export async function runSendMail(title: string, url: string) {
  try {
    await smtpTransport.sendMail({
      from: process.env.EMAIL,
      to: "v.kestutis123@gmail.com",
      subject: `${title} is in store.`,
      html: `${title} is in store! ${url}>`,
    });
  } catch (err) {
    console.log(err);
  }
}
