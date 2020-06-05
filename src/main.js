const express = require('express')
var cors = require('cors')
var bodyParser  = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
