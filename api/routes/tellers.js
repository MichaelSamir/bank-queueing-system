const express = require('express');
const router = express.Router();

//Load teller controller 
const tellerController = require('../controllers/tellers');

//Pull customer from queue
router.delete('/nextcustomer', tellerController.pull_from_queue);

//Show ordered customers in the queue 
router.get('/showqueue', tellerController.show_queue);

module.exports = router;