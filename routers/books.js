const { Router } = require("express");
const Book = require("../models").book;
const UserBook = require("../models").userBook;
const authMiddleWare = require("../auth/middleware");

const router = new Router();

router.post("/", authMiddleWare, async (req, res) => {
  const bookGoogleId = req.body.googleID;
  const userId = req.user.id;
  const status = req.body.status;

  try {
    // search for the book
    let book = await Book.findOne({
      where: {
        googleID: bookGoogleId,
      },
    });

    if (book === null) {
      // then we'll create the book
      book = await Book.create({
        googleID: req.body.googleID,
        categories: req.body.categories,
        title: req.body.title,
        author: req.body.authors,
        imageURL: req.body.imageURL,
        description: req.body.description,
        rate: req.body.rate,
      });
    }

    let userBook = await UserBook.findOne({
      where: {
        userId: userId,
        bookId: book.id,
      },
    });

    if (userBook === null) {
      userBook = await UserBook.create({
        userId: userId,
        bookId: book.id,
        status: status,
      });
    } else {
      userBook.status = req.body.status;
      userBook.progress = req.body.progress;
      await userBook.save();
    }

    return res.status(201).send(userBook);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Some thing went wrong" });
  }
});

module.exports = router;
