const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:  process.env.EMAIL,
      pass:  process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Node Auth",
    to: option.email,
    subject: option.subject,
    text: option.message,
    //html:
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
