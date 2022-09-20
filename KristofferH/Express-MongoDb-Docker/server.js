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

 mongoose.connect(config.DB, {
  useNewUrlParser:true,
  useUnifiedTopology:true
}, function (err, db) {
  
  if (err) {
    console.log("database is not connected");
  } else {
    console.log("connected!!");
  }
});

// Schema
const sch={
  title:String,
  author:String,
  id:Number
}
const monmodel=mongoose.model("NEWCOL", sch);

// Post to db
app.post("/post", async(req, res) => {
  console.log('inside post function...');

  const data = new monmodel({
    title:req.body.title,
    author:req.body.author,
    id:req.body.id
  });

  // Save json-object and return to client
  const val = await data.save();
  res.json(val);

})

app.listen(PORT, function () {
  console.log("Your node js server is running on PORT:", PORT);
});
