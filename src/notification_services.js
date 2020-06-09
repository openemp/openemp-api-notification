const assert = require('assert');

const insertNotification = function(db, data, callback) {
    // Get the documents collection
    const collection = db.collection('notifications');
    // Insert some documents
    collection.insertOne( data, function(err, result) {
        console.log("Insert Notification into the collection");
        callback(result);
    });
}

module.exports = {
    insertNotification
}
