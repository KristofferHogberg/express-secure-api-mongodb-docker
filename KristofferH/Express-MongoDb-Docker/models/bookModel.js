const mongoose = require("mongoose");

// Create schema for collection
const schemaBook = {
  title: String,
  author: String,
  yearOfRelease: String,
};

// Create a model
const Book = mongoose.model("Books", schemaBook);

// Export the model
module.exports = Book;
