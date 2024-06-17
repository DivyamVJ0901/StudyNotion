const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')
const emailTemplate = require("../mail/templates/emailVerificationTemplate")
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp : {
    type: String,
    required: true
  },
  createdAt: {
    type: Date, 
    default: Date.now(),
    expires: 5 * 60
  }
})

// Code for mail sending
async function sendVerificationEmail (email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      emailTemplate(otp),
      "Verification Email from StudyNotion",
    )
    console.log('Email sent successfully : ', mailResponse.response)
  } catch (error) {
    console.log('error occured while sending email : ', error)
    throw error;
  }
}

// Post-save hook to send email after the document has been saved 
otpSchema.pre('save', async function (next) {
  if(this.isNew)
  {
    await sendVerificationEmail(this.email, this.otp)
  }
  next()
})

// Always before module exports and after schema
module.exports = mongoose.model('OTP', otpSchema)

