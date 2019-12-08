const router = require('express').Router()

const taskController = require('../controllers/task')

router.get('/', taskController.list)
router.get('/:_id', taskController.details)
router.post('/', taskController.create)
router.put('/:_id', taskController.update)
router.delete('/:_id', taskController.delete)

/*one-to-many*/
router.get('/tasksByProject/:_id', taskController.tasksByProject)

router.put('/:_id/:event', taskController.statusEvent)

module.exports = router