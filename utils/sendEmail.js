const nodeMailer = require('nodemailer')

const messageConfig = {
  host: 'smtp.qq.com',
  port: '465',
  auth: {
    user: '964480899@qq.com',
    pass: 'mceswjpykaqjbeje'
  }
}

function sendMessage(data) {
  const optionConfig = {
    from: '"peris" <964480899@qq.com>',
    to: '1793478491@qq.com',
    subject: 'nodemailer test!!',
    html: '<a href="#">click me!</a>'
  }
  const transporter = nodeMailer.createTransport(messageConfig)
  transporter.sendMail(optionConfig, (err, info) => {
    if (err) {
      return console.log(err)
    }
    // console.log('send messages success!!!', info.messageId)
  })
}
module.exports = sendMessage
