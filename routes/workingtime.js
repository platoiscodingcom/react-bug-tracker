const router = require('express').Router()
const workingTimeController = require('../controllers/workingTime')
const { workingTimeValidationRules, validate } = require('./validator.js')
const passport = require('passport')

router.post(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  workingTimeValidationRules(),
  validate,
  workingTimeController.createLog
)

router.get(
  '/logs/:_id',
  passport.authenticate('jwt', { session: false }),
  workingTimeController.getLogs
)

module.exports = router