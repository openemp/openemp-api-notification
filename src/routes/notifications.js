const db = require("./../utils/db_conn");
const {BASE_URL_NOTIFICATION} = require('./../utils/constant')
const {insertNotification, getNotification} = require("../services/notifications");

module.exports = app => {
    /**
     * By passing a JWT and profile ID you can get a list of notifications
     * By passing in the appropriate options, you can search for available inventory in the system
     * @param user - pass an optional search string to specify the profile ID
     * for which the notifications will be fetched (only work for admin users)
     * @param read - set to true to also include seen notifications
     * @return search results matching criteria || bad input parameter
     */
    app.get(BASE_URL_NOTIFICATION,async function (req, res) {
        let {uuid, read} = req.query

        if (uuid === undefined || uuid === '') {
            res.send({error: 'bad input parameter'})
            return
        }

        if (read === undefined) read = false

        await db.get(function (_db) {
            getNotification(_db, {uuid}, (msg) => {
                if (msg)
                    res.send({message: msg})
                else
                    res.send({message: 'An error has occurred'})
            })
        });

    })

    /**
     * Send a notification to a list of profiles
     */
    app.post(BASE_URL_NOTIFICATION, async function (req, res) {
        let {content, receiver} = req.body

        if (content === undefined || receiver === undefined) {
            res.send({error: 'object invalid'})
            return
        }

        if (content === '' || receiver.length === 0) {
            res.send({error: 'bad input parameter'})
            return
        }

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

        await db.get(function (_db) {
            insertNotification(_db, data, (msg) => {
                if (msg)
                    res.send({message: 'notifications sent'})
                else
                    res.send({message: 'An error has occurred'})
            })
        });

    })
}