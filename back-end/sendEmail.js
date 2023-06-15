const nodemailer = require("nodemailer");
const {google} = require('googleapis')
require("dotenv").config();
 
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const accessToken = await oAuth2Client.getAccessToken()
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "scheduling@studentnest.com",
      clientId : CLIENT_ID,
      clientSecret:CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken
    },
    from: "scheduling@studentnest.com", 
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };
  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "scheduling@studentnest.com",
//     pass: "mwphhcgowifbkkhf",
   
//   },
//   // tls: {
//   //   rejectUnauthorized: false,
//   // },
// });

// const options = {
//   from: sent_from,
//   to: send_to,
//   replyTo: reply_to,
//   subject: subject,
//   html: message,
// };
// // console.log("message", message);
// // Send Email
// transporter.sendMail(options, function (err, info) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(info);
//   }
// });