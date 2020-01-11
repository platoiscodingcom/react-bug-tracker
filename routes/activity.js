const router = require('express').Router()
const actvityController = require('../controllers/activity')
const passport = require('passport')

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  actvityController.list
)
router.get(
  '/project/:id',
  passport.authenticate('jwt', { session: false }),
  actvityController.list
)
router.get(
  '/task/:id',
  passport.authenticate('jwt', { session: false }),
  actvityController.list
)
router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  actvityController.list
)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  actvityController.list
)



module.exports = router