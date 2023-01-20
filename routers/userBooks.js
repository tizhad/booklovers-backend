const { Router } = require("express");
const Book = require("../models").book;
const User = require("../models").user;
const UserBook = require("../models").userBook;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const userBooks = await UserBook.findAll({
      attributes: ["status", "progress"],
      where: {
        userId: userId,
      },
      include: {
        model: Book,
        attributes: [
          "googleID",
          "title",
          "categories",
          "author",
          "rate",
          "imageURL",
          "description",
        ],
      },
    });
    const response = userBooks.map((item) => {
      let newItem = {
        ...item.dataValues.book.dataValues,
        progress: item.progress,
        status: item.status,
      };
      return newItem;
    });
    res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ });
  }
});

module.exports = router;
