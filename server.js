// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Book = require('./models/Books')
require('dotenv').config();


// Initialize the app
const app = express();
const PORT =  3000;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_URL = 'mongodb://localhost:27017/mydatabase';

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set view engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(DB_URL)
 .then(() => console.log('Connected to MongoDB'))
 .catch((error) => console.error(error));


// Routes

// Index Route
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.render('books/index', { books });
});

// New Route
app.get('/books/new', (req, res) => {
  res.render('books/new');
});

// Create Route
app.post('/books', async (req, res) => {
  const { title, author, description, publishedYear } = req.body;
  await Book.create({ title, author, description, publishedYear });
  res.redirect('/books');
});

// Show Route
app.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('books/show', { book });
});

// Edit Route
app.get('/books/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('books/edit', { book });
});

// Update Route
app.put('/books/:id', async (req, res) => {
  const { title, author, description, publishedYear } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, description, publishedYear });
  res.redirect(`/books/${req.params.id}`);
});

// Delete Route
app.delete('/books/:id', async (req, res) => {
  try {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/books');
  }catch (error) {
    console.log(error);
    res.status(500).send('Error deleting book');
  }
});

// Start server
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`);
});
