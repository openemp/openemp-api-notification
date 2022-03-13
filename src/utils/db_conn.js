const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const validator = require("../models/notification.schema");
const {DB_URL,DB_NAME} = require('./../utils/constant')

const events = require('events');
const event = new events.EventEmitter();


// Create a new MongoClient
const client = new MongoClient(DB_URL, {useUnifiedTopology: true});

let _db;

// Connecting to the Database
client.connect((err) => {
    assert.strictEqual(null, err);
    _db = client.db(DB_NAME)

    _db.createCollection('notifications',
        {validator: validator, validationLevel: "strict", validationAction: "error"}
    ).then(() => {
        console.log("Connected successfully to Database")
        event.emit('connect');
    }).catch((err) => {
        console.log(err)
        event.emit('error');
    })

})

exports.get = function(fn) {
    if(_db) {
        fn(_db);
    } else {
        event.on('connect', function() {
            fn(_db);
        });
    }
};