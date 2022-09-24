// Setup the server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

// Import JWT middle-ware
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-qfuag1j4.eu.auth0.com/.well-known/jwks.json'
}),

audience: 'https://auth-demo',
issuer: 'https://dev-qfuag1j4.eu.auth0.com/',
algorithms: ['RS256']
});


/* app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
}); */



// Create a Schema 
const schemaBook = {
  title: String,
  author: String,
  yearOfRelease: String
};

// Create a model
const Book = mongoose.model("Books", schemaBook);

// Define CRUD endpoints
app.get('/listallbooks', (req, res) => {
  Book.find((err, books) => {
    res.json(books)
  })
})

app.get('/listbook/:id', (req, res) => {
  Book.findById(req.params.id, (err, books) => {
    res.json(books)
  })
})

app.use(jwtCheck);

app.post("/createbook", async (req, res) => {
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

app.put('/updatebook/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err) => {
    res.json( {message: `updating book ${req.params.id}`} )
  })
})

app.delete('/deletebook/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id, (err) => {
    res.json( {message: `deleting book ${req.params.id}` })
  })
})

// Set up port to listen to
app.listen(PORT, function () {
  console.log("Your node js server is running on PORT:", PORT);
});
