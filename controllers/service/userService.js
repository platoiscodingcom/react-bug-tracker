const User = require('../../models/User')
const Token = require('../../models/Token')
mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var crypto = require('crypto')
var nodemailer = require('nodemailer')
const gravatar = require('gravatar')

exports.createMailOptions = (newUser, token) => {
  return (mailOptions = {
    from: 'jonasackermann90@gmx.de',
    to: newUser.email,
    subject: 'Account Verification Token',
    text:
      'Hello,\n\n' +
      'Please verify your account by clicking the link: \nhttp://' +
      'localhost:3000' +
      '/confirmation/' +
      token.token +
      '.\n'
  })
}
exports.createMailTransporter = () => {
  return nodemailer.createTransport({
    host: 'mail.gmx.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'jonasackermann90@gmx.de', // generated ethereal user
      pass: 'Durebit8' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

exports.sendConfirmationMail = (newUser, token) => {
  let transporter = this.createMailTransporter()
  var mailOptions = this.createMailOptions(newUser, token)

  transporter.sendMail(mailOptions, err => {
    if (err) {
      return res.status(500).send({ msg: err.message })
    }
    res
      .status(200)
      .send('A verification email has been sent to ' + newUser.email + '.')
  })
}

exports.comparePasswords = (password, user, res) => {
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      }
      jwt.sign(
        payload,
        'secret',
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) console.error('There is some error in token', err)
          else {
            res.json({
              success: true,
              token: `Bearer ${token}`
            })
          }
        }
      )
      // Make sure the user has been verified
      if (!user.isVerified) {
        return res.status(401).send({
          type: 'not-verified',
          msg: 'Your account has not been verified.'
        })
      }

      // Login successful, write token, and send back user
      res.send({ token: generateToken(user), user: user.toJSON() })
    } else {
      errors.password = 'Incorrect Password'
      return res.status(400).json(errors)
    }
  })
}

exports.generateToken = user => {
  var token = new Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString('hex')
  })

  token.save(err => {
    if (err) {
      return res.status(500).send({ msg: err.message })
    }
  })

  return token
}

exports.createTokenAndConfirmationMail = (newUser, res) => {
  var token = new Token({
    _userId: newUser._id,
    token: crypto.randomBytes(16).toString('hex')
  })

  token.save(err => {
    if (err) {
      return res.status(500).send({ msg: err.message })
    }

    this.sendConfirmationMail(newUser, token)
  })
}

exports.createNewUser = req => {
  const avatar = gravatar.url(req.body.email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  })

  return new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar
  })
}

exports.checkIfUserFoundOrAlreadyVerfied = (user, res) => {
  if (!user)
    return res
      .status(400)
      .send({ msg: 'We were unable to find a user with that email.' })
  if (user.isVerified)
    return res
      .status(400)
      .send({ msg: 'This account has already been verified. Please log in.' })
}

exports.verfiyUser = (user, res) => {
  user.isVerified = true
  user.save(err => {
    if (err) {
      return res.status(500).send({ msg: err.message })
    }
    res.status(200).send('The account has been verified. Please log in.')
  })
}
