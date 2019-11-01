const router = require('express').Router()

const projectController = require('../controllers/project')

router.get('/', projectController.list)
router.get('/:_id', projectController.details)
router.post('/', projectController.create)
router.put('/:_id', projectController.update)
router.delete('/:_id', projectController.delete)

module.exports = router