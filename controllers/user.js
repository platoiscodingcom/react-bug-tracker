const User = require('../models/User')
const Token = require('../models/Token')
mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var crypto = require('crypto')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const validateResetPasswordInput = require('../validation/reset-password')
const userService = require('./service/userService')

exports.list = (req, res) => {
  userService.findAllUsers(res)
}

exports.register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({
    email: req.body.email
  })
    .then(user => {
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
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      }
      userService.comparePasswords(password, user, res)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.requestPasswordReset = (req, res) => {
  const email = req.body.email

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).send({ email: 'unknown email' })
      }
      userService.sendEmailForPasswordReset(user, res)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.me = (req, res) => {
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
}

exports.resetPassword = (req, res) => {
  console.log('req.params.token', req.params.token)
  Token.findOne({ token: req.params.token }, (err, token) => {
    if (!token) {
      console.log('no token found')
      return res.status(400).send({
        msg: 'Unable to find a valid token. Token may have expired.'
      })
    }

    const { errors, isValid } = validateResetPasswordInput(req.body)
    console.log('req.body', req.body)
    if (!isValid) {
      console.log('reset password errors', errors)
      return res.status(400).json(errors)
    } else {
      User.findOne({ _id: token._userId }, (err, user) => {
        if (!user) {
          return res.status(400).send({
            msg: 'no such user'
          })
        }
        if (!user.isVerified) {
          userService.verfiyUser(user, res)
        }
        //save new password

        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error('There was an error', err)
          else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) console.error('There was an error', err)
              else {
                console.log('hash', hash)
                user.password = hash
                user.save()
              }
            })
          }
        })
      })
    }

    res.status(200).send({ message: 'password reset successful' })
  }).catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  })
}

/**
 * PUT /confirmation/:token
 */
exports.confirmRegistration = (req, res, next) => {
  Token.findOne({ token: req.params.token }, (err, token) => {
    if (!token) {
      return res.status(400).send({
        type: 'not-verified',
        msg:
          'We were unable to find a valid token. Your token may have expired.'
      })
    }

    User.findOne({ _id: token._userId }, (err, user) => {
      userService.checkIfUserFoundOrAlreadyVerfied(user, res)
      userService.verfiyUser(user, res)
    }).catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
  }).catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
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
  }).catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  })
}

exports.getContactsInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid).populate(
      'contacts',
      'name'
    )

    if (!user) {
      return res.status(404).send('User not found')
    }

    res.status(200).send(user.contacts)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}
/*
exports.privateProfile = async (req, res) => {
 
  try {
    const user = await User.findOne({
      _id: req.params._id
    })
      .populate('name, email')
      .populate('author_of_projects', 'name')
      .populate('assigned_to_projects', 'name')
      .populate('permittedProjects', 'name')
      .populate('author_of_tasks', 'title')
      .populate('assigned_to_tasks', 'title')
      .populate('contacts', 'name')

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    if (!user._id != req.user._id) {
      return res.status(404).send({ message: 'No permission' })
    }
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

exports.getUser = async (req, res) => {
  /*
  try {
    const user = await User.findOne({
      _id: req.params._id
    })
      .populate('name')
      .populate('permittedProjects', 'name')

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}*/
