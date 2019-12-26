const router = require('express').Router()
const projectController = require('../controllers/project')
const { projectValidationRules, validate } = require('./validator.js')
const passport = require('passport')

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  projectController.list
)
router.get(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  projectController.details
)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  projectValidationRules(),
  validate,
  projectController.create
)
router.put(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  projectValidationRules(),
  validate,
  projectController.update
)
router.delete(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  projectController.delete
)

// /upload must be above /:event
router.put('/:_id/upload', projectController.upload)
router.put('/:_id/:event', projectController.statusEvent)

module.exports = router
