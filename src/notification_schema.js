const schema = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["uuid", "sender", "content", "receiver", "read", "retired", "creationDate", "updateDate"],
            properties: {
                uuid: {
                    bsonType: "string",
                    description: "Must be a string and is required"
                },
                sender: {
                    bsonType: "string",
                    description: "Must be a string and is required"
                },
                content: {
                    bsonType: "string",
                    description: "Must be a string and is required"
                },
                receiver: {
                    bsonType: "string",
                    description: "Must be a string and is required"
                },
                read: {
                    bsonType: "string",
                    description: "Must be a string and is required"
                },
                retired: {
                    bsonType: "string",
                    description: "Must be a string and is required"
                },
                creationDate: {
                    bsonType: "date",
                    description: "Date when it was created"
                },
                updateDate: {
                    bsonType: "date",
                    description: "Date when it was updated"
                }
            }
        },
    }
};
module.export = { schema }