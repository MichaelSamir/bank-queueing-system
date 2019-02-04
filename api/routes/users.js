const express = require('express');
const router = express.Router();

//Load Users Controller 
const UsersController = require('../controllers/users');

router.post('/book', UsersController.book_number);

module.exports = router;