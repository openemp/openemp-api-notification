const db = require("./../utils/db_conn");
const {BASE_URL_NOTIFICATION} = require('./../utils/constant')
const {insertNotification, getNotification} = require("../services/notifications");

module.exports = app => {

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
            "content": content,
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