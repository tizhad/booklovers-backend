const { Router } = require("express");
const Book = require("../models").book;
const UserBook = require("../models").userBook;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", authMiddleware, async (req, res) => {
  const bookGoogleId = req.body.googleID;
  const userId = req.body.userId;
  const status = req.body.status;
  const progress = req.body.progress;
  console.log(userId);

  try {
    // search for the book
    // used let because I want to change its value later if I don't find the book in the table
    let book = await Book.findOne({
      where: {
        googleID: bookGoogleId,
      },
    });

    if (book === null) {
      // then we'll create the book
      book = await Book.create({
        googleID: req.body.googleID,
        title: req.body.title,
        author: req.body.author,
        imageURL: req.body.imageURL,
        description: req.body.description,
      });
      const bookInUserBook = await UserBook.create({
        userId: userId,
        bookId: book.id,
        status: "reading",
        progress: 0,
      });
      console.log("Book in userBook table", bookInUserBook);
    }

    console.log(book);

    return res.status(201).send({ message: "new book added" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Some thing went wrong" });
  }
});

module.exports = router;
