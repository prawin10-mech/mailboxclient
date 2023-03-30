const nodemailer = require("nodemailer");

sendOtp = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "boppepraveen10@gmail.com",
      pass: process.env.SMTP_PASSWORD,
    },
  });
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 9);
  }

  transporter.sendMail({
    from: "mailBoxClient",
    to: email,
    subject: "Your Otp for Registration",
    text: `Your OTP is ${otp}`,
  });
  (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  };
  return otp;
};

module.exports = sendOtp;
