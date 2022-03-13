const db = require("./../utils/db_conn");
const {BASE_URL_NOTIFICATION} = require('./../utils/constant')
const {insertNotification, getNotification} = require("../services/notifications");
const {verifyToken} = require('./../utils/jwt_auth')
module.exports = app => {

    app.get(BASE_URL_NOTIFICATION, async function (req, res) {
        const authHeader = req.headers.authorization.replace("Bearer ", "");

        let tokenData;
        if (authHeader) {
            const vk = verifyToken(authHeader)
            if (!vk)
                return res.sendStatus(403);
            else
                tokenData = vk.sub
        } else
            return res.sendStatus(401);

        let {read} = req.query

        if (!tokenData) {
            res.send({error: 'bad input parameter'})
            return
        }

        if (read === undefined) read = false

        await db.get(function (_db) {
            getNotification(_db, {receiver: tokenData}, (msg) => {
                if (msg)
                    res.send({message: msg})
                else
                    res.send({message: 'An error has occurred'})
            })
        });

    })

    app.post(BASE_URL_NOTIFICATION, async function (req, res) {
        const authHeader = req.headers.authorization;

        let tokenData;
        if (authHeader) {
            const vk = verifyToken(authHeader)
            if (!vk)
                return res.sendStatus(403);
            else
                tokenData = vk.sub
        } else
            return res.sendStatus(401);

        let {content, receiver} = req.body

        if (content === undefined || receiver === undefined) {
            return res.send({error: 'object invalid'})

        }

        if (content === '' || receiver.length === 0) {
            return res.send({error: 'bad input parameter'})
        }

        let data = {
            "uuid": req.body.uuid,
            "sender": tokenData,
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