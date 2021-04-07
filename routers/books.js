const { Router } = require("express");
const Book = require("../models").book;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newBook = await Book.create({
      uniqueId: req.body.uniqueId,
      title: req.body.title,
      imageURL: req.body.imageURL,
      description: req.body.description,
    });
    console.log("create book", newBook.dataValues);
    res.status(201).send({ message: "Book Created", newBook });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "you have this book in your book list." });
  }
});

module.exports = router;
