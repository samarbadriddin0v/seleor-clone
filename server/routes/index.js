const adminMiddleware = require('../middlewares/admin.middleware')

const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/otp', require('./otp'))
router.use('/admin', adminMiddleware, require('./admin'))
router.use('/user', require('./user'))

module.exports = router
