
## Steps to run in local

1) Add a .env file in root of project with following environment vairables:
`PORT=5000`
`MONGO_URI="YOUR_MONGO_URI"`
`JWT_SECRET="YOUR_SECRET_KEY"`
`JWT_EXPIRES_IN=1d`
`GOOGLE_CLIENT_ID="YOUR_CLIENT_ID"`
`GOOGLE_CLIENT_SECRET="YOUR_CLIENT_SECRET"`
`GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback`

2) Run `npm install`

3) Run `npm run dev` to start the app in development mode.

4) Your server will be running on [http://localhost:5000](http://localhost:5000).