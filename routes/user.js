const router = require('express').Router()
const passport = require('passport')
const { passwordResetValidationRules, validate } = require('./validator.js')

const userController = require('../controllers/user')
router.get('/', userController.list)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post(
  '/requestPasswordReset',
  passwordResetValidationRules(),
  validate,
  userController.requestPasswordReset
)

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  userController.me
)

//token, email-verfication
router.put('/confirmation/:token', userController.confirmRegistration)
router.post('/resetPassword/:token', userController.resetPassword)
router.post('/resend', userController.resendTokenPost)

module.exports = router
