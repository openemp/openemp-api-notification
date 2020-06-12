# openemp-api-notification
OpenEMP Notification Service API
## Setup
### Requirements
* git
* node

### Build
To build the notification API run the following:
```bash
git clone https://github.com/openemp/openemp-api-notification
cd openemp-api-notification
npm i
```

Make **.env** file and use the **.env.example** as guide.

### Start
To start the server run either `npm run start` or `npm run dev` (nodemon watch).

### Services
Store notification:
* **Description:** Send a notification to a list of profiles
* **URL:** `/api/v1/notifications` **Method:** `POST`
* **Body:**
```json
{
  "uuid": "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "id": 1,
  "sender": 1,
  "receiver": 2,
  "creationDate": "2020-08-29T09:12:33.001Z",
  "read": false,
  "updateDate": "2020-08-29T09:13:32.021Z",
  "retired": false
}
```
* **Response:** 
```
201 - notifications sent
400 - invalid input, object invalid
```

Get notifications:
* **Description:** By passing a JWT and profile ID you can get a list of notifications, by passing in the appropriate options, you can search for available inventory in the system
* **URL:** `/api/v1/notifications` **Method:** `GET`
* **Params:**
```
user - pass an optional search string to specify the profile ID  for which the notifications will be fetched (only work for admin users)
read - set to true to also include seen notifications
```
* **Response:** 
```
200 - search results matching criteria
400 - bad input parameter
```