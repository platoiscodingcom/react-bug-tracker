const router = require('express').Router()

const taskController = require('../controllers/task')

router.get('/', taskController.list)
router.get('/:_id', taskController.details)
router.post('/', taskController.create)
router.put('/:_id', taskController.update)
router.delete('/:_id', taskController.delete)

/*one-to-many*/
router.get('/tasksByProject/:_id', taskController.tasksByProject)

router.put('/:_id/close', taskController.close)
router.put('/:_id/reopen', taskController.reopen)
router.put('/:_id/open', taskController.open)
router.put('/:_id/start', taskController.start)
router.put('/:_id/stop', taskController.stop)

module.exports = router