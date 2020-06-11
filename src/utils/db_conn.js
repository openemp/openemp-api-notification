const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const validator = require("../models/notification.schema");

const events = require('events');
const event = new events.EventEmitter();

const env = process.env

// Connection URL
const url = `mongodb://${env.DB_HOST}:${env.DB_PORT}`

// Database Name
const dbName = env.DB_NAME

// Create a new MongoClient
const client = new MongoClient(url, {useUnifiedTopology: true});

let _db;


// Connecting to the Database
client.connect((err) => {
    assert.strictEqual(null, err);
    _db = client.db(dbName)

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