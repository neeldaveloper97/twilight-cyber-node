# Twilight Cyber Backend
- I use the DeHashed API in this and call that API via Axios
- To manage the Data for that API I used the MongoDB 
## Install the Dependencies
 - Run `npm install`
## Run the Application
 - Run `npm run start` to start the application in the *`development mode`*
## URL for the Application
- For API the connection URL is `http://localhost:{{port}}`

## Environment Variables

- `PORT` - Port Number 
- `MONGO_URL` - Mongo DB connection URL
- `AUTH_TOKEN` - Static token which is used to authenticate the API call
- `DEHASHED_API_URL` - DeHasehes API Base URL - https://api.dehashed.com/search 
- `DEHASHED_TOKEN` - Token For the DeHashed Which is generated based on the `API_KEY` and the `username` 
