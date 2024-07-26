// controllers/fruits.js

const book = require('../models/book');

const home = async (req, res)

const index = async (req, res) => {
  const foundCats = await book.find();
  res.render('books/index.ejs', { books: foundCats });
};

module.exports = {
  index,
};