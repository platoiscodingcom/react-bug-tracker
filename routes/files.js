const router = require('express').Router()
const filesController = require('../controllers/file')

router.get('/', filesController.list)
router.delete('/deleteFromProject/:_id', filesController.delete)

module.exports = router