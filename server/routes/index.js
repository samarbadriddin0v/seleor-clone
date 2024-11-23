const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/otp', require('./otp'))

module.exports = router
