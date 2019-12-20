const router = require('express').Router()
const projectController = require('../controllers/project')
const { projectValidationRules, validate } = require('./validator.js')

router.get('/', projectController.list)
router.get('/:_id', projectController.details)
router.post('/', projectValidationRules(), validate, projectController.create)
router.put('/:_id', projectValidationRules(), validate, projectController.update)
router.delete('/:_id', projectController.delete)

// /upload must be above /:event
router.put('/:_id/upload', projectController.upload)
router.put('/:_id/:event', projectController.statusEvent)

module.exports = router
