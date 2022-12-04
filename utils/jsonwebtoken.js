const jsonwebtoken = require('jsonwebtoken')
const privateKey = 'peris'
exports.sign = (data, outTime) => {
  console.log(data)
  const token = jsonwebtoken.sign(data, privateKey, {
    expiresIn: outTime
  })
  return token
}

exports.verify = (token) => {
  const verifyResult = jsonwebtoken.verify(token, privateKey)
  return verifyResult
}
