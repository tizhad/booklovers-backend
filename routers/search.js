const { Router } = require("express");
const axios = require("axios").default;
const Book = require("../models").book;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/", async (req, res) => {
  const query = req.query.q;

  try {
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    const response = await axios.get(URL);
    const googleResponse = response.data.items;
    console.log(googleResponse.length);
    const googleEnBooks = googleResponse.filter((item) => {
      if (item.volumeInfo.language == "en") {
        return true;
      }
      return false;
    });
    console.log(googleEnBooks.length);
    res.status(201).send(googleEnBooks);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "something went wrong" });
  }
});

module.exports = router;
