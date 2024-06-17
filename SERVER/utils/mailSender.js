const nodemailer = require('nodemailer')
require('dotenv').config()

const mailSender = async (email, body, title) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    })

    let info = await transporter.sendMail({
      from: 'StudyNotion || DVJpoint - By Divyam Vijay',
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`
    })
    console.log(info)
    return info
  } catch (error) {
    console.log(error)
  }
}

module.exports = mailSender