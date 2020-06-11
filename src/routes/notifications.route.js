const dbf = require("./../utils/db_conn");
const {insertNotification} = require("../services/notifications.service");

const BASE_URL = '/api/v1/notifications'


module.exports = app => {
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
            "sender": 1,
            "receiver": 2,
            "creationDate": "2020-08-29T09:12:33.001Z",
            "read": read,
            "updateDate": "2020-08-29T09:13:32.021Z",
            "retired": false
        }
        res.send(notification)
    })

    /**
     * Send a notification to a list of profiles
     */
    app.post(BASE_URL, async function (req, res) {
        let {content, receiver} = req.body

        if (content === undefined || receiver === undefined) {
            res.send({error: 'object invalid'})
            return
        }

        if (content === '' || receiver.length === 0) {
            res.send({error: 'bad input parameter'})
            return
        }

        console.log("*",req.body.uuid)

        let data = {
            "uuid": req.body.uuid,
            "sender": req.body.sender,
            "receiver": receiver,
            "content": content.toString(),
            "creationDate": new Date(),
            "read": req.body.read,
            "updateDate": new Date(),
            "retired": req.body.retired
        }

        let db;

        await dbf.get(function (_db) {
            db = _db
        });

        insertNotification(db, data, (msg) => {
            console.log(msg)
            if (msg)
                res.send({message: 'notifications sent'})
            else
                res.send({message: 'An error has occurred'})
        })
    })
}