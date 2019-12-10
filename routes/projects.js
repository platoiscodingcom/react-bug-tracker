const router = require('express').Router()
const { check} = require('express-validator')
const projectController = require('../controllers/project')

router.get('/', projectController.list)
router.get('/:_id', projectController.details)
router.post(
  '/',
  [
    check('name').isLength({ min: 4 }),
    check('status')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 4 }),
    check('categories')
      .not()
      .isEmpty()
  ],
  projectController.create
)
router.put(
  '/:_id',
  [
    check('name').isLength({ min: 4 }),
    check('status')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 4 }),
    check('categories')
      .not()
      .isEmpty()
  ],
  projectController.update
)
router.delete('/:_id', projectController.delete)
// /upload must be above /:event
router.put('/:_id/upload', projectController.upload)
router.put('/:_id/:event', projectController.statusEvent)



module.exports = router
