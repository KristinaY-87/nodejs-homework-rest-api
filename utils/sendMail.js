const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    const mail = { ...data, form: "kristina.yermak@ukr.net" }
     await sgMail.send(mail);
    
  }
  catch (error) {
    return false
  }
}
module.exports = sendMail

