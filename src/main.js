const express = require('express')
var cors = require('cors')
require('dotenv').config()

var bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.SERVER_PORT || 4000
const BASE_URL = '/api/v1/notifications'

/**
 * By passing a JWT and profile ID you can get a list of notifications
 * By passing in the appropriate options, you can search for available inventory in the system
 * @param user - pass an optional search string to specify the profile ID
 * for which the notifications will be fetched (only work for admin users)
 * @param read - set to true to also include seen notifications
 * @return search results matching criteria || bad input parameter
 */
app.get(BASE_URL, function (req, res) {
    let {user, read} = req.query

    if (user === undefined || user === '') {
        res.send({error: 'bad input parameter'})
        return
    }

    if (read === undefined) read = false

    //TODO get notification by user from DB

    // if OK
    const notification = {
        "uuid": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "id": 1,
        "sender": 1,
        "receiver": 2,
        "creationDate": "2020-08-29T09:12:33.001Z",
        "read": false,
        "updateDate": "2020-08-29T09:13:32.021Z",
        "retired": false
    }
    res.send(notification)
})

/**
 * Send a notification to a list of profiles
 */
app.post(BASE_URL, function (req, res) {
    let {content, receivers} = req.body
    console.log(req.body)
    if (content === undefined || receivers === undefined) {
        res.send({error: 'object invalid'})
        return
    }

    if (content === '' || receivers.length === 0) {
        res.send({error: 'bad input parameter'})
        return
    }

    //TODO add {content} in DB to {receivers}

    // if OK
    res.send({message: 'notifications sent'})
})

app.listen(PORT , function () {
    console.log('App listening on port '+PORT)
})
