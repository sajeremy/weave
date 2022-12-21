require("dotenv").config();
const nodemailer = require("nodemailer");
const { email, emailPswd } = require("./index.js");

module.exports = function () {
  const username = email;
  const pswd = emailPswd;

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: pswd,
    },
  });

  let details = {
    from: username,
    to: username,
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
};
