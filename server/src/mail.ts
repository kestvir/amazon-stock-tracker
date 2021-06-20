import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
});

console.log({ user: process.env.EMAIL, pass: process.env.PASSWORD });

export async function runSendMail(title: string, url: string) {
  try {
    await smtpTransport.sendMail({
      from: "v.kestutis123@gmail.com",
      to: "v.kestutis123@gmail.com",
      subject: `${title} is in store.`,
      html: `${title} is in store! ${url}>`,
    });
  } catch (err) {
    console.log(err);
  }
}
