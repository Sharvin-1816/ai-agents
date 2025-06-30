const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'SendGrid', 'Mailgun', etc.
      auth: {
        user: process.env.EMAIL_USER,    // your email
        pass: process.env.EMAIL_PASS     // app password or real password
      }
    });

    const mailOptions = {
      from: `"No-Reply" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Email failed: ${err.message}`);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
