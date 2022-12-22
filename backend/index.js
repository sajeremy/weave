require("dotenv").config();

const email = process.env.EMAIL;
const emailPswd = process.env.EMAIL_PSWD;

module.exports = Object.freeze({
  email: email,
  emailPswd: emailPswd,
});
