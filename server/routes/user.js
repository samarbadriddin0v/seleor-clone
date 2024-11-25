const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')

const router = require('express').Router()

router.get('/products', userController.getProducts)
router.get('/product/:id', userController.getProduct)
router.get('/profile/:id', userController.getProfile)
router.get('/orders', userController.getOrders)
router.get('/transactions', userController.getTransactions)
router.get('/favorites', userController.getFavorites)
router.get('/statistics', userController.getStatistics)

router.post('/add-favorite', userMiddleware, userController.addFavorite)

router.put('/update-profile', userController.updateProfile)
router.put('/update-password', userController.updatePassword)

router.delete('/delete-favorite/:id', userController.deleteFavorite)

module.exports = router
