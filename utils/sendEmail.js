const nodemailer = require("nodemailer");

async function sendEmail(subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: process.env.ALERT_EMAIL,
    subject,
    text
  });

  console.log("E-mail enviado com sucesso!");
}

module.exports = sendEmail;
