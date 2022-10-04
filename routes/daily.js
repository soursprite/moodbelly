const express = require('express') 
const router = express.Router() 
const dailyController = require('../controllers/daily') 
const { ensureAuth } = require('../middleware/auth')
const sendMain = require('../middleware/sendMain')

router.get('/', ensureAuth, dailyController.getDays) // when on the main page, make sure theyre logged in, then send post data from controller

router.post('/postDaily', dailyController.postDaily) // when user submits post it routes to create daily controller.

router.get('/deleteDay/:id', dailyController.deleteDay) //

router.get('/getDayData', dailyController.getDayData) //trying to make api route for main.js

module.exports = router