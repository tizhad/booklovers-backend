const { Router } = require("express");
const axios = require("axios").default;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    let randomCategory = "Education";
    const URL = `https://www.googleapis.com/books/v1/volumes?q=subject:${randomCategory}`;
    const response = await axios.get(URL);
    const googleResponse = response.data.items;
    res.status(201).send(googleResponse);
  } catch (error) {
    return res.status(500).send({ message: "something went wrong" });
  }
});

module.exports = router;
