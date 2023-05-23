const express = require('express');
const router = express.Router();

// Custom DI
const listings = require('./listings');

router.get('/', async (req, res, next) => {
  res.json({ message: 'Welcome to Visual App!' });
});

router.use('/listings', listings);

module.exports = router;