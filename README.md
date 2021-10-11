# MongoDB Workshop

## Purpose
This is a simple backend built using Node.js and Express.js. Purpose is to teach the method of connecting MongoDB to a backend.

## Setup
1. Clone repo
3. Create MongoDB account and database cluster
4. Get connection string which should look like `mongodb+srv://[USERNAME]:[PASSWORD]@cluster0.plteu.mongodb.net/[DATABASE_NAME]?retryWrites=true&w=majority`
5. Put it into a `.env` file with format `MONGODB_CONNECT=` connection string
6. Run `npm install`
7. Run `npm start`
8. Use a REST client to make requests to `localhost:9000`