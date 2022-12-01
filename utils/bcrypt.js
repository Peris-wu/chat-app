const bcryptjs = require('bcryptjs')

exports.encrypt = (pwd) => {
  const hashPwd = bcryptjs.hashSync(pwd, 10)
  return hashPwd
}

exports.decrypt = (pwd, hashPwd) => {
  const comparePwd = bcryptjs.compareSync(pwd, hashPwd)
  return comparePwd
}
