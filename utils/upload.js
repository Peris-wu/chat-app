const multer = require('multer')

const { resolve } = require('path')
const storagePath = resolve(__dirname, '../upload/images')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const Regp = /\S+\./g
    let originalName = file.originalname
    const handleName = originalName.replace(Regp, '.')
    console.log(handleName)
    cb(null, `${uniqueSuffix}${handleName}`)
  }
})

const upload = multer({ storage })

module.exports = upload
