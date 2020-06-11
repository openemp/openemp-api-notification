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

const getNotification = function (db, data, callback) {

    // Get the documents collection
    const collection = db.collection('notifications')

    // Insert some documents
    collection.find(data).toArray(function (err, result) {
        if (err) {
            console.log(err)
            callback(null)
        } else {
            console.log("Found Notification")
            callback(result)
        }
    })
}

module.exports = {
    insertNotification, getNotification
}
