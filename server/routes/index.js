const adminMiddleware = require('../middlewares/admin.middleware')

const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/otp', require('./otp'))
router.use('/admin', adminMiddleware, require('./admin'))
router.use('/user', require('./user'))
router.use('/payme', require('./payme'))
router.use('/uzum', require('./uzum'))
router.use('/click', require('./click'))

module.exports = router
