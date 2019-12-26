const User = require('../models/User')
const Token = require('../models/Token')
mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var crypto = require('crypto')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const userService = require('./service/userService')


exports.list = (req, res) =>{
  userService.findAllUsers(res)
}

exports.register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exists'
      })
    } else {
      const newUser = userService.createNewUser(req)

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err)
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error('There was an error', err)
            else {
              newUser.password = hash
              newUser.save().then(user => {
                res.json(user)
              })
              userService.createTokenAndConfirmationMail(newUser)
            }
          })
        }
      })
    }
  })
}

exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }
    userService.comparePasswords(password, user, res)
  })
}

exports.me = (req, res) => {
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
}

/**
 * POST /confirmation
 */
exports.confirmRegistration = (req, res, next) => {

  Token.findOne({ token: req.params.token }, (err, token) => {
    if (!token) {
      return res.status(400).send({
        type: 'not-verified',
        msg: 'We were unable to find a valid token. Your token my have expired.'
      })
    }

    User.findOne({ _id: token._userId }, (err, user) => {
      userService.checkIfUserFoundOrAlreadyVerfied(user, res)
      userService.verfiyUser(user, res)
    })
  })
}

/**
 * POST /resend
 */
exports.resendTokenPost = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('email', 'Email cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  // Check for validation errors
  var errors = req.validationErrors()
  if (errors) return res.status(400).send(errors)

  User.findOne({ email: req.body.email }, function (err, user) {
    userService.checkIfUserFoundOrAlreadyVerfied(user, res)
    userService.createTokenAndConfirmationMail(user, res)
  })
}
