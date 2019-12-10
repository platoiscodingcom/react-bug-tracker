const router = require('express').Router()
const { check} = require('express-validator')
const fileController = require('../controllers/file')

router.get('/', fileController.list)
router.put(
  '/' /*,
  [
    check('file').exists(),
    check('filename')
      .not()
      .isEmpty(),
    check('mimetype')
      .not()
      .isEmpty()
  ]*/,
  fileController.upload
)

module.exports = router