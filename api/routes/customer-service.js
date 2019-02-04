const express = require('express');
const router = express.Router();

//Load customer service controller 
const csController = require('../controllers/customer-service');

//Pull customer from queue
router.delete('/nextcustomer', csController.pull_from_queue);

//Show ordered customers in the queue 
router.get('/showqueue', csController.show_queue);

module.exports = router;