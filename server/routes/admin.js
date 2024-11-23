const adminController = require('../controllers/admin.controller')

const router = require('express').Router()

router.get('/products', adminController.getProducts)
router.post('/create-product', adminController.createProduct)
router.put('/update-product/:id', adminController.updateProduct)
router.delete('/delete-product/:id', adminController.deleteProduct)

module.exports = router
