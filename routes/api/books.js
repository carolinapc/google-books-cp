const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const axios = require("axios");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router.route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

// Matches with "/api/books/google/:query"
router.route("/google/:query")
  .get(function (req, res) {
    const KEY = process.env.REACT_APP_GBOOKS_API_KEY;
    const URL = "https://www.googleapis.com/books/v1/volumes?printType=books&key=" + KEY + "&q=";
    axios.get(URL + req.query)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  });

module.exports = router;
