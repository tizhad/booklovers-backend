const { Router } = require("express");
const axios = require("axios").default;
const UserBook = require("../models").userBook;
const Book = require("../models").book;
const authMiddleWare = require("../auth/middleware");

const router = new Router();

router.get("/", authMiddleWare, async (req, res) => {
  const query = req.query.q;
  const userId = req.user.id;

  try {
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    const response = await axios.get(URL);
    const googleResponse = response.data.items;
    const userBooks = await UserBook.findAll({
      where: {
        userId: userId,
      },
      include: Book,
    });

    const searchResult = googleResponse.map((googleBook) => {
      const filteredBooks = userBooks.filter((userBook) => {
        if (userBook.book.googleID === googleBook.id) {
          return true;
        } else {
          return false;
        }
      });

      let categories = null;
      if (
        googleBook.volumeInfo.categories !== undefined &&
        googleBook.volumeInfo.categories.length > 0
      ) {
        categories = googleBook.volumeInfo.categories[0];
      }

      if (filteredBooks.length > 0) {
        return {
          googleID: googleBook.id,
          categories: categories,
          title: googleBook.volumeInfo.title,
          authors: googleBook.volumeInfo.hasOwnProperty("authors")
            ? googleBook.volumeInfo.authors.join(", ")
            : "Unknown authors",
          rate: 1,
          imageURL: googleBook.volumeInfo.imageLinks.smallThumbnail,
          description: googleBook.volumeInfo.description,
          status: filteredBooks[0].status,
          progress: filteredBooks[0].progress,
        };
      } else {
        return {
          googleID: googleBook.id,
          categories: categories,
          title: googleBook.volumeInfo.title,
          authors: googleBook.volumeInfo.hasOwnProperty("authors")
            ? googleBook.volumeInfo.authors.join(", ")
            : "Unknown authors",
          rate: 1,
          imageURL: googleBook.volumeInfo.hasOwnProperty("imageLinks")
            ? googleBook.volumeInfo.imageLinks.smallThumbnail
            : "https://via.placeholder.com/150/45526c?Text=booklovers.com",
          description: googleBook.volumeInfo.description,
        };
      }
    });

    res.status(201).send(searchResult);
  } catch (error) {
    return res.status(500).send({ message: "something went wrong" });
  }
});

module.exports = router;
