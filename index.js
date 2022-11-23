const app = require('express')()
const port = 8082

const server = app.listen(port, () => {
  console.log(`port->${port} has been done`)
})
app.get('/', (req, res) => {
  res.send('Hello World')
})
