const { body, validationResult } = require('express-validator')

const categoryValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 4 })
      .withMessage('must be at least 4 chars long')
  ]
}

const passwordResetValidationRules = () => {
  return [
    body('email')
      .not()
      .isEmpty()
      .withMessage('enter your email address')
  ]
}

const projectValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 4 })
      .withMessage('must be at least 4 chars long'),
    body('author')
      .not()
      .isEmpty()
      .withMessage('author not specified'),
    body('assignedTo')
      .not()
      .isEmpty()
      .withMessage('project must be assigned to a user'),
    body('status')
      .not()
      .isEmpty()
      .withMessage('status is required'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('description is required'),
    body('categories')
      .not()
      .isEmpty()
      .withMessage('must have at least one category')
  ]
}

const userValidationRules = () =>{
  return [
    body('name')
      .isLength({ min: 4 })
      .withMessage('must be at least 4 chars long'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('enter your email address')
  ]
}

const taskValidationRules = () => {
  return [
    body('title')
      .isLength({ min: 4 })
      .withMessage('must be at least 4 chars long'),
    body('author')
      .not()
      .isEmpty()
      .withMessage('author not specified'),
    body('assignedTo')
      .not()
      .isEmpty()
      .withMessage('project must be assigned to a user'),
    body('status')
      .not()
      .isEmpty()
      .withMessage('status is required'),
    body('priority')
      .not()
      .isEmpty()
      .withMessage('status is required'),
    body('type')
      .not()
      .isEmpty()
      .withMessage('status is required'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('description is required'),
    body('project')
      .not()
      .isEmpty()
      .withMessage('must belong to a project')
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
  console.log('extractedErrors', extractedErrors)
  return res.status(422).json(extractedErrors)
}

module.exports = {
  categoryValidationRules,
  projectValidationRules,
  taskValidationRules,
  validate,
  passwordResetValidationRules,
  userValidationRules
}
