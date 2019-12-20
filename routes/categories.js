const router = require('express').Router()
const { check } = require('express-validator')
const categoryController = require('../controllers/category')
const { categoryValidationRules, validate } = require('./validator.js')

router.get('/', categoryController.list)
router.get('/:_id', categoryController.details)
router.post('/', categoryValidationRules(), validate, categoryController.create)
router.put('/:_id', categoryValidationRules(), validate, categoryController.update)
router.delete('/:_id', categoryController.delete)

module.exports = router
