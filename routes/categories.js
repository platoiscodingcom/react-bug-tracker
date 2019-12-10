const router = require('express').Router()
const { check } = require('express-validator')
const categoryController = require('../controllers/category')

router.get('/', categoryController.list)
router.get('/:_id', categoryController.details)
router.post(
  '/',
  [check('name').isLength({ min: 4 })],
  categoryController.create
)
router.put(
  '/:_id',
  [check('name').isLength({ min: 4 })],
  categoryController.update
)
router.delete('/:_id', categoryController.delete)

module.exports = router
