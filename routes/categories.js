const router = require('express').Router()
const categoryController = require('../controllers/category')
const { categoryValidationRules, validate } = require('./validator.js')
const passport = require('passport')

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  categoryController.list
)
router.get(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  categoryController.details
)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  categoryValidationRules(),
  validate,
  categoryController.create
)
router.put(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  categoryValidationRules(),
  validate,
  categoryController.update
)
router.delete(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  categoryController.delete
)

module.exports = router
