require("dotenv").config();
const nodemailer = require("nodemailer");
const { email, emailPswd } = require("./index.js");

module.exports = function (tripDetails) {
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
    to: tripDetails.newMemberEmail,
    subject: `Weaver Trip Invitation: ${tripDetails.ownerName}'s ${tripDetails.tripName} `,
    text: `Hi ${tripDetails.newMemberFirstName},\n ${tripDetails.ownerName} will like to invite you to their upcoming trip: ${tripDetails.tripName}.  If you wish to participate please accept your invitation below: \n https://weavetravel.onrender.com/trips/${tripDetails.tripId}/invite`,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log("it has an error", err);
    } else {
      console.log("email has sent");
    }
  });
};
