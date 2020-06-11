module.exports = {
    // route for notifications
    BASE_URL_NOTIFICATION: '/api/v1/notifications',
    // Connection URL
    DB_URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
    // Database Name
    DB_NAME: process.env.DB_NAME
}