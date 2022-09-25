// Setup the server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const path = require('path');

const jwt = require('jsonwebtoken');

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

// Create schema for collection
const schemaBook = {
  title: String,
  author: String,
  yearOfRelease: String
};

// Create a model
const Book = mongoose.model("Books", schemaBook);

// Define create login-token endpoint
app.post('/api/v1/login', (req, res) => {

  const user = {
    id:Date.now(),
    userEmail: req.body.userEmail,
    password: req.body.password
  }

  jwt.sign({user}, 'secretKey', (err, token) => {
    res.json({
      token
    })
  })
})

// Define login endpoint
app.get('/api/v1/profile', verifyToken, (req,res) => {

  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      res.sendStatus(403);  
    }
    else {
      res.json({
        message: "You are logged in to Cyberdyne Systems",
        userData: authData
      })
    }
  })
})

// Implement middle-ware-function for verifying token
function verifyToken(req, res, next) {
  
  const bearerHeader =  req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}

app.get('/api/v1/home', (req, res) => { 
  res.sendFile(path.join(__dirname, '/index.html'));
})

// Define CRUD endpoints
app.get('/api/v1/listallbooks', (req, res) => {
  Book.find((err, books) => {
    res.json(books)
  })
})

app.get('/api/v1/listbook/:id', (req, res) => {
  Book.findById(req.params.id, (err, books) => {
    res.json(books)
  })
})

app.post("/api/v1/createbook", async (req, res) => {
  console.log("inside post function...");

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    yearOfRelease: req.body.yearOfRelease
  })

  book.save((err) => {
    res.json(book)
  })
})

app.put('/api/v1/updatebook/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err) => {
    res.json( {message: `updating book ${req.params.id}`} )
  })
})

app.delete('/api/v1/deletebook/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id, (err) => {
    res.json( {message: `deleting book ${req.params.id}` })
  })
})

// Set up port to listen to
app.listen(PORT, function () {
  console.log("Your node js server is running on PORT:", PORT);
});
