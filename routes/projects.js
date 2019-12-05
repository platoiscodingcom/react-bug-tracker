const router = require('express').Router()

const projectController = require('../controllers/project')

router.get('/', projectController.list)
router.get('/:_id', projectController.details)
router.post('/', projectController.create)
router.put('/:_id', projectController.update)
router.delete('/:_id', projectController.delete)

//handle status
console.log('in routes');
router.put('/:_id/close', projectController.close)
router.put('/:_id/reopen', projectController.reopen)
router.put('/:_id/open', projectController.open)
router.put('/:_id/start', projectController.start)

module.exports = router