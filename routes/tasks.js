const router = require('express').Router()
const { check } = require('express-validator')
const taskController = require('../controllers/task')

router.get('/', taskController.list)
router.get('/:_id', taskController.details)
router.post(
  '/',
  [
    check('title').isLength({ min: 4 }),
    check('status')
      .not()
      .isEmpty(),
    check('priority')
      .not()
      .isEmpty(),
    check('type')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 4 }),
    check('project')
      .not()
      .isEmpty()
  ],
  taskController.create
)
router.put(
  '/:_id',
  [
    check('title').isLength({ min: 4 }),
    check('status')
      .not()
      .isEmpty(),
    check('priority')
      .not()
      .isEmpty(),
    check('type')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 4 }),
    check('project')
      .not()
      .isEmpty()
  ],
  taskController.update
)
router.delete('/:_id', taskController.delete)

/* one-to-many */
router.get('/tasksByProject/:_id', taskController.tasksByProject)

router.put('/:_id/:event', taskController.statusEvent)

module.exports = router
