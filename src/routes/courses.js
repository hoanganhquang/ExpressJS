const express = require('express')
const router = express.Router()
const coursesController = require('../app/controllers/coursesController')

router.post('/newCourse', coursesController.newCourse)
router.get('/create', coursesController.create)
router.get('/:slug', coursesController.index)
router.put('/:id', coursesController.update)
router.delete('/:id', coursesController.delete)
router.delete('/:id/force', coursesController.deleteForce)
router.get('/:id/edit', coursesController.edit)
router.patch('/:id/restore', coursesController.restore)



module.exports = router


