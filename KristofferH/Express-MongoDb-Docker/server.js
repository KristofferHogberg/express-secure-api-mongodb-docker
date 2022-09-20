// Setup the server
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");

const config = require("./db");
const PORT = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add router in the Express app.
app.use("/", router);

router.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

router.post("/login", function (req, res) {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = " + user_name + ", password is " + password);
  res.end("yes");
});

// Connect to DB with mongoose
mongoose.connect(config.DB, function (err, db) {
  if (err) {
    console.log("database is not connected");
  } else {
    console.log("connected!!");
  }
});
/* app.get("/", function (req, res) {
  res.json({ title: "Ninjas from Space II" });
}); */

app.listen(PORT, function () {
  console.log("Your node js server is running on PORT:", PORT);
});
