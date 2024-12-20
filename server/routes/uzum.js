const uzumController = require('../controllers/uzum.controller')
const userMiddleware = require('../middlewares/user.middleware')
const uzumCheckToken = require('../middlewares/uzum.middleware')

const router = require('express').Router()

router.post('/check', uzumCheckToken, uzumController.check)
router.post('/create', uzumCheckToken, uzumController.create)
router.post('/confirm', uzumCheckToken, uzumController.confirm)
router.post('/reverse', uzumCheckToken, uzumController.reverse)
router.post('/status', uzumCheckToken, uzumController.status)
router.post('/checkout', userMiddleware, uzumController.checkout)

module.exports = router
