const adminController = require('../controllers/admin.controller')

const router = require('express').Router()

router.get('/products', adminController.getProducts)
router.get('/customers', adminController.getCustomers)
router.get('/orders', adminController.getOrders)
router.get('/transactions', adminController.getTransactions)

router.post('/create-product', adminController.createProduct)

router.put('/update-product/:id', adminController.updateProduct)
router.put('/update-order/:id', adminController.updateOrder)

router.delete('/delete-product/:id', adminController.deleteProduct)

module.exports = router
