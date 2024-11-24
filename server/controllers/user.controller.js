const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const transactionModel = require('../models/transaction.model')
const bcrypt = require('bcrypt')

class UserController {
	// [GET] /user/products
	async getProducts(req, res, next) {
		try {
			const products = await productModel.find()
			return res.json(products)
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/product/:id
	async getProduct(req, res, next) {
		try {
			const product = await productModel.findById(req.params.id)
			return res.json(product)
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/profile/:id
	async getProfile(req, res, next) {
		try {
			const user = await userModel.findById(req.params.id).select('-password')
			return res.json({ user })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/orders
	async getOrders(req, res, next) {
		try {
			const userId = '67420187ce7f12bf6ec22428'
			const orders = await orderModel.find({ user: userId })
			return res.json(orders)
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/transactions
	async getTransactions(req, res, next) {
		try {
			const userId = '67420187ce7f12bf6ec22428'
			const transactions = await transactionModel.find({ user: userId })
			return res.json(transactions)
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/favorites
	async getFavorites(req, res, next) {
		try {
			const userId = '67420187ce7f12bf6ec22428'
			const user = await userModel.findById(userId).populate('favorites')
			return res.json(user.favorites)
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/statistics
	async getStatistics(req, res, next) {
		try {
			const userId = '67420187ce7f12bf6ec22428'
			const user = await userModel.findById(userId)

			const totalOrders = await orderModel.countDocuments({ user: user._id })
			const totalTransactions = await transactionModel.countDocuments({ user: user._id })
			const totalFavourites = user.favorites.length

			return res.json({ totalOrders, totalTransactions, totalFavourites })
		} catch (error) {
			next(error)
		}
	}
	// [POST] /user/add-favorite
	async addFavorite(req, res, next) {
		try {
			const { productId } = req.body
			const userId = '67420187ce7f12bf6ec22428'
			const user = await userModel.findById(userId)
			user.favorites.push(productId)
			await user.save()
			return res.json(user)
		} catch (error) {
			next(error)
		}
	}
	// [PUT] /user/update-profile
	async updateProfile(req, res, next) {
		try {
			const userId = '67420187ce7f12bf6ec22428'
			const user = await userModel.findById(userId)
			user.set(req.body)
			await user.save()
			return res.json(user)
		} catch (error) {
			next(error)
		}
	}
	// [PUT] /user/update-password
	async updatePassword(req, res, next) {
		try {
			const { oldPassword, newPassword } = req.body
			const userId = '67420187ce7f12bf6ec22428'
			const user = await userModel.findById(userId)

			const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
			if (!isPasswordMatch) return res.json({ failure: 'Old password is incorrect' })

			const hashedPassword = await bcrypt.hash(newPassword, 10)
			await userModel.findByIdAndUpdate(userId, { password: hashedPassword })
			res.json({ success: 'Password updated successfully' })
		} catch (error) {
			next(error)
		}
	}
	// [DELETE] /user/delete-favorite/:id
	async deleteFavorite(req, res, next) {
		try {
			const { id } = req.params
			const userId = '67420187ce7f12bf6ec22428'
			const user = await userModel.findById(userId)
			user.favorites.pull(id)
			await user.save()
			return res.json({ success: 'Product removed from favorites' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController()