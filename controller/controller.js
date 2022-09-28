const router = require("express").Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("../middleware/middleware");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Book = require('../models/bookModel');

// Define create login-token endpoint
router.post("/api/v1/login", (req, res) => {
  const user = {
    id: Date.now(),
    userEmail: req.body.userEmail,
    password: req.body.password,
  };

  jwt.sign({ user }, "secretKey", (err, token) => {
    res.json({
      token,
    });
  });
});

// Define login endpoint
router.get("/api/v1/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "You are logged in to Cyberdyne Systems",
        userData: authData,
      });
    }
  });
});

// Define CRUD endpoints
router.get("/api/v1/listallbooks", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Book.find((err, books) => {
        res.json(books);
      });
    }
  });
});

router.get("/api/v1/listbook/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Book.findById(req.params.id, (err, books) => {
        res.json(books);
      });
    }
  });
});

router.post("/api/v1/createbook", verifyToken, async (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        yearOfRelease: req.body.yearOfRelease,
      });

      book.save((err) => {
        res.json(book);
      });
    }
  });
});

router.put("/api/v1/updatebook/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Book.findByIdAndUpdate(req.params.id, req.body, (err) => {
        res.json({ message: `updating book ${req.params.id}` });
      });
    }
  });
});

router.delete("/api/v1/deletebook/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Book.findByIdAndDelete(req.params.id, (err) => {
        res.json({ message: `deleting book ${req.params.id}` });
      });
    }
  });
});

module.exports = router;
