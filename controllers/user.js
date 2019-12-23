const User = require('../models/User');
const Token = require('../models/Token');
mongoose = require('mongoose');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


exports.register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if(!isValid) {
        return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
    }
    else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                            // Create a verification token for this user
                            var token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });

                            // Save the verification token
                            token.save(function (err) {
                              if (err) { return res.status(500).send({ msg: err.message }); }

                               // create reusable transporter object using the default SMTP transport
                              let transporter = nodemailer.createTransport({
                                host: 'mail.gmx.net',
                                port: 587,
                                secure: false, // true for 465, false for other ports
                                auth: {
                                    user: 'jonasackermann90@gmx.de', // generated ethereal user
                                    pass: 'Durebit8'  // generated ethereal password
                                },
                                tls:{
                                  rejectUnauthorized:false
                                }
                              });

                              var mailOptions = { 
                                from: 'jonasackermann90@gmx.de', 
                                to: newUser.email, 
                                subject: 'Account Verification Token', 
                                text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + "localhost:3000" + '\/confirmation\/' + token.token + '.\n'
                              };

                              transporter.sendMail(mailOptions, (err) => {
                                  if (err) { 
                                    return res.status(500).send({ msg: err.message }); 
                                  }
                                  res.status(200).send('A verification email has been sent to ' + newUser.email + '.');
                              });
                            });
                        }
                    });
                }
            });
    }
  });
}

exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
      .then(user => {
        if(!user) {
          errors.email = 'User not found'
          return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if(isMatch) {
                  const payload = {
                      id: user.id,
                      name: user.name,
                      avatar: user.avatar
                  }
                  jwt.sign(payload, 'secret', {
                    expiresIn: 3600
                  }, (err, token) => {
                    if(err) console.error('There is some error in token', err);
                    else {
                      res.json({
                        success: true,
                        token: `Bearer ${token}`
                        });
                    }
                  });
                  console.log('kurz bevor !isverified');
                  // Make sure the user has been verified
                  if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 

                  // Login successful, write token, and send back user
                  res.send({ token: generateToken(user), user: user.toJSON() });
                }
                else {
                  errors.password = 'Incorrect Password';
                  return res.status(400).json(errors);
                }
              });
      });
}

exports.me = (req, res) => {
  console.log('in controller');
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
}

/**
* POST /confirmation
*/
exports.confirmationPost = (req, res, next) => {

  // Find a matching token
  Token.findOne({ token: req.body.token }, function (err, token) {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

      // If we found a token, find a matching user
      User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
          if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
          if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send("The account has been verified. Please log in.");
          });
      });
  });
};

/**
* POST /resend
*/
exports.resendTokenPost = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors    
  var errors = req.validationErrors();
  if (errors) return res.status(400).send(errors);

  User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
      if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

      // Create a verification token, save it, and send email
      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

      // Save the token
      token.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }

          // Send the email
          var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
          var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api/users/confirmation\/' + token.token + '.\n' };
          transporter.sendMail(mailOptions, function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send('A verification email has been sent to ' + user.email + '.');
          });
      });

  });
};