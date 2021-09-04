const express = require('express')
const router = express.Router()

//Controller
const newController = require('../app/controllers/newsController')


router.use('/:slug', newController.show)
router.use('/', newController.index)


module.exports = router
