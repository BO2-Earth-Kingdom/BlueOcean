const express = require('express');
const router = express.Router();
const model = require('../models/books.js');

// -------------------------- Warning ------------------------
// No validation nor correct error handling!!!!!!

// Get all books, this will only return { bookId, title, author, cover_image }  
// Take queryStrings { sort=['date', 'latest'], ascending=false, pageCount=10, page=1 }
// Right now it has no validation, which is bad, but refactor later, push MVP
router.get('/', async(req, res) => {
  try {
    const result = await model.queryAllBooks(req.query);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Get book by ID, but also need user id
router.get('/id/:bookId/user/:userId', async(req, res) => {
  try {
    const result = await model.queryBookById(req.params);
    res.status(200).json(result); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Live search book by title
router.get('/title/:title', async(req, res) => {
  console.log(req.params.title);
  try {
    const result = await model.queryBooksByTitle(req.params.title);
    res.status(200).json(result); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Get book by User, implemented later
router.get('/user/:userId', async(req, res) => {
  try {
    const result = await model.queryBooksByUser(req.params.userId);
    res.status(200).json(result); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.put('/like', async(req, res) => {
  try {
    const result = await model.toggleBookLike(req.query);
    res.status(201).json(result); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
