const nodemailer = require("nodemailer");
const { email, secretOrKey } = require("../config/keys");

const username = process.env.EMAIL;
const pswd = process.env.EMAIL_PSWD;

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: pswd,
  },
});

let details = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: "test test",
  text: "www.google.com LETS GOOOOOOOOOO",
};

mailTransporter.sendMail(details, (err) => {
  if (err) {
    console.log("it has an error", err);
  } else {
    console.log("email has sent");
  }
});
