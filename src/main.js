const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


require('dotenv').config()

const env = process.env

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())


require('./routes/notifications')(app);

const PORT = env.SERVER_PORT || 4000
app.listen(PORT, function () {
    console.log('App listening on port ' + PORT)
})
