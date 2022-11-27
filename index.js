const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 8082

// result Access-Control-Allow-Origin
app.use(cors())

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extends: false }))

// parser application/json
app.use(bodyParser.json())

// const testRouter = require('./routes/test')
const userRouter = require('./routes/user')

const server = app.listen(port, () => {
  console.log(`port->${port} has been done`)
})
// app.use('/', testRouter)
app.use('/user', userRouter)
