// Set up the server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const { verifyToken } = require('./middleware/middleware')

const jwt = require("jsonwebtoken");
const path = require("path");

const config = require("./db");
const PORT = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDb
mongoose.connect(
  config.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) {
      console.log("database is not connected");
    } else {
      console.log("connected!!");
    }
  }
);

// Define endpoint for index.html
app.get("/api/v1/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Add routes to the app
const  routes = require('./controller/controller')
app.use(routes);

// Set up port to listen to
app.listen(PORT, function () {
  console.log("Your node js server is running on PORT:", PORT);
});
