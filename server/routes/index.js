const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/otp', require('./otp'))
router.use('/admin', require('./admin'))

module.exports = router
