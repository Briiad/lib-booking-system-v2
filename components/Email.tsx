const nodemailer = require('nodemailer');

export async function sendEmail (subject: String, toEmail: String, textOtp: String) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_KEY,
    },
  })

  const mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: toEmail,
    subject: subject,
    html: textOtp,
  }

  transporter.sendMail(mailOptions, function(error: String) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent')
    }
  })
}