const assert = require('assert');

const insertNotification = function (db, data, callback) {
    // Get the documents collection
    const collection = db.collection('notifications')
    // Insert some documents
    collection.insertOne(data, function (err, result) {
        if (err) {
            console.log(err)
            callback(null)
        } else {
            console.log("Insert Notification into the collection")
            callback(result)
        }
    })
}

module.exports = {
    insertNotification
}
