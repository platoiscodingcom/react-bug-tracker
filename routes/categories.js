const router = require('express').Router()

const categoryController = require('../controllers/category');

router.get('/', categoryController.list);
router.get('/:_id', categoryController.details);
router.post('/', categoryController.create);
router.put('/:_id', categoryController.update);
router.delete('/:_id', categoryController.delete);

module.exports = router