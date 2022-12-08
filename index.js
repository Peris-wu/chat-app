const app = require('express')()
const bodyParser = require('body-parser')
var methodOverride = require('method-override')
const cors = require('cors')
const port = 8082

// result Access-Control-Allow-Origin
app.use(cors())

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extends: false }))

// parser application/json
app.use(bodyParser.json())

//
app.use(methodOverride())

// const testRouter = require('./routes/test')
const userRouter = require('./routes/user')
const testRouter = require('./routes/test')

const server = app.listen(port, () => {
  console.log(`port->${port} has been done`)
})

app.use('/', testRouter)

app.use('/user', userRouter)

// app.post('/test', (req, res, next) => {
//   const { testData } = req.body
//   if (testData) {
//     throw new Error('测试错误')
//   }
// })
app.use(function (err, req, res, next) {
  if (err) {
    console.log(`error->${err}`)
  }
})
