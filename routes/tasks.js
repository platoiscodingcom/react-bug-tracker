const router = require('express').Router()
const taskController = require('../controllers/task')
const { taskValidationRules, validate } = require('./validator.js')

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  taskController.list
)
router.get(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  taskController.details
)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  taskValidationRules(),
  validate,
  taskController.create
)
router.put(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  taskValidationRules(),
  validate,
  taskController.update
)
router.delete(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  taskController.delete
)
router.put(
  '/:_id/:event',
  passport.authenticate('jwt', { session: false }),
  taskController.statusEvent
)

module.exports = router
