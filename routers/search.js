const { Router } = require("express");
const axios = require("axios").default;
const UserBook = require("../models").userBook;
const Book = require("../models").book;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/", authMiddleware, async (req, res) => {
  const query = req.query.q;
  const userId = req.user.id;

  try {
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    const response = await axios.get(URL);
    const googleResponse = response.data.items;
    const googleEnBooks = googleResponse.filter((item) => {
      if (item.volumeInfo.language == "en") {
        return true;
      }
      return false;
    });
    const userBooks = await UserBook.findAll({
      where: {
        userId: userId,
      },
      include: Book,
    });
    console.log(userBooks);

    const searchResult = googleEnBooks.map((googleBook) => {
      const filteredBooks = userBooks.filter((userBook) => {
        if (userBook.book.googleID === googleBook.id) {
          return true;
        } else {
          return false;
        }
      });

      if (filteredBooks.length > 0) {
        return {
          googleID: googleBook.id,
          imageURL: googleBook.volumeInfo.imageLinks.smallThumbnail,
          title: googleBook.volumeInfo.title,
          description: googleBook.volumeInfo.description.substring(0, 200),
          rate: 1,
          status: filteredBooks[0].status,
          progress: filteredBooks[0].progress,
        };
      } else {
        return {
          googleID: googleBook.id,
          imageURL: googleBook.volumeInfo.imageLinks.smallThumbnail,
          title: googleBook.volumeInfo.title,
          description: googleBook.volumeInfo.description.substring(0, 200),
          rate: 1,
        };
      }
    });

    res.status(201).send(searchResult);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "something went wrong" });
  }
});

module.exports = router;
