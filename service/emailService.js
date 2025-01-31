const nodemailer = require('nodemailer');

let sendersEmail = '241covid19.info@gmail.com';
let password = 'Qwerty@123';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sendersEmail,
    pass: password
  }
});

const mailOptions = (to, subject, content) => ({
  from: sendersEmail,
  to: to,
  subject: subject,
  html: content
});

const sendMail = async (to, subject, content) => {
  let info;
  try {
     info = await transporter.sendMail(mailOptions(to, subject, content));
  } catch (e) {
    console.log(e);
    return {success: false};
  }
  console.log(info);
  return {success: true};
};

module.exports = sendMail;

