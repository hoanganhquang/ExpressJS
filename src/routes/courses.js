const express = require('express')
const router = express.Router()
const coursesController = require('../app/controllers/coursesController')

router.post('/newCourse', coursesController.newCourse)
router.get('/create', coursesController.create)
router.get('/:slug', coursesController.index)


module.exports = router


