require("dotenv").config(); //Configuration for .env files
const mongoose = require('mongoose');
const passport = require('passport');
const path = require("path");
const express = require("express");
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
let PORT = process.env.PORT || 4000;

// //models
const userModel = require("./models/user");

// //routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/team");
const fixtureRoutes = require("./routes/fixtures");
const searchRoutes = require("./routes/search");


const app = express();

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;

// Configure Mongoose to Connect to MongoDB
mongoose.connect("mongodb://imizallah:imizallah1990@ds311538.mlab.com:11538/mock-premier-league", {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(response => console.log(`MOCK APPLICATION CONNECTED AT: ${process.env.DB_CONNECT}`))
  .catch(err => console.log(`PRO-INTERNS DATABASE ERROR: ${err.message}`));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// This parses all json request so we can access
// its contents via 'req.body' object
app.use(express.json());

// =================================== REDIS Session =====================================================
// Create a static directory for our uploads
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start a session; we use Redis for the session store.
// "secret" will be used to create the session ID hash (the cookie id and the redis key value)
// "name" will show up as your cookie name in the browser
// "cookie" is provided by default; you can add it to add additional personalized options
// The "store" ttl is the expiration time for each Redis session ID, in seconds
app.use(session({
  secret: 'osdfhihdih89Dh89dghH908--_8sdsd',
  name: '_redisMockPremierLeague',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}));
// ============================================================================================

app.use("/", (req, res) => {
  res.send("Welcome to the homepage");
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/fixture", fixtureRoutes);
app.use("/api/search", searchRoutes);

app.use((req, res, next) => {
  res.json({ msg: "Page not found" });
});

app.listen(PORT, () => console.log(`Mock Application running on ${PORT}`))