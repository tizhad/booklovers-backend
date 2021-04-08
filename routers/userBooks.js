const { Router } = require("express");
const Book = require("../models").book;
const User = require("../models").user;
const UserBook = require("../models").userBook;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/", authMiddleware, async (req, res) => {
  console.log(req.user);
  try {
    const userBooks = await UserBook.findAll({
      attributes: ["userId", "bookId", "status", "progress"],
    });

    console.log("userBooks", userBooks);
    res.status(201).send({ message: "book fetched", userBooks });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "yechizi hast" });
  }
});

module.exports = router;
