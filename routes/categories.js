const router = require('express').Router()
const { check } = require('express-validator')
const categoryController = require('../controllers/category')
const { categoryValidationRules, validate } = require('./validator.js')

router.get('/', categoryController.list)
router.get('/:_id', categoryController.details)
router.post('/', categoryValidationRules(), validate, categoryController.create)
router.put(
  '/:_id',
  [
    check('name')
      .isLength({ min: 4 })
      .withMessage('must be at least 4 chars long')
  ],
  categoryController.update
)
router.delete('/:_id', categoryController.delete)

module.exports = router
