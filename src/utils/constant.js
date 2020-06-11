// route for notifications
const BASE_URL_NOTIFICATION = '/api/v1/notifications'

const env = process.env

// Connection URL
const DB_URL = `mongodb://${env.DB_HOST}:${env.DB_PORT}`

// Database Name
const DB_NAME = env.DB_NAME

module.exports = {BASE_URL_NOTIFICATION,DB_URL,DB_NAME}