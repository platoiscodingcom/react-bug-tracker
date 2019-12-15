const { body, validationResult } = require('express-validator')
const categoryValidationRules = () => {
  return [
    body('name')
    .isLength({ min: 4 })
    .withMessage('must be at least 4 chars long')
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  let extractedErrors = {}
  errors.array().map(err => {
    extractedErrors = Object.assign(extractedErrors, { [err.param]: err.msg })
  })
  console.log('extractedErrors',extractedErrors)
  return res.status(422).json(extractedErrors)
}

module.exports = {
  categoryValidationRules,
  validate,
}