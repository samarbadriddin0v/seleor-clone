const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/otp', require('./otp'))
router.use('/admin', require('./admin'))
router.use('/user', require('./user'))

module.exports = router