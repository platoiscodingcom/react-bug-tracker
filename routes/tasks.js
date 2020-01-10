const router = require('express').Router()
const taskController = require('../controllers/task')
const { taskValidationRules, validate } = require('./validator.js')

router.get('/', taskController.list)
router.get('/:_id', taskController.details)
router.post('/', taskValidationRules(), validate, taskController.create)
router.put('/:_id', taskValidationRules(), validate, taskController.update)
router.delete('/:_id', taskController.delete)
router.put('/:_id/:event', taskController.statusEvent)

module.exports = router
