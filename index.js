const app = require('express')()
const port = 8082

const testRouter = require('./routes/test')

const server = app.listen(port, () => {
  console.log(`port->${port} has been done`)
})
app.get('/', testRouter)
