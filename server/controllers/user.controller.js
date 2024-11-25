const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const transactionModel = require('../models/transaction.model')
const bcrypt = require('bcrypt')

class UserController {
	// [GET] /user/products
	async getProducts(req, res, next) {
		try {
			const { searchQuery, filter, category, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				query.$or = [{ title: { $regex: new RegExp(escapedSearchQuery, 'i') } }]
			}

			if (category === 'All') query.category = { $exists: true }
			else if (category !== 'All') {
				if (category) query.category = category
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const products = await productModel.find(query).sort(sortOptions).skip(skipAmount).limit(+pageSize)

			const totalProducts = await productModel.countDocuments(query)
			const isNext = totalProducts > skipAmount + +products.length

			return res.json({ products, isNext })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/product/:id
	async getProduct(req, res, next) {
		try {
			const product = await productModel.findById(req.params.id)
			return res.json({ product })
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
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			const totalOrders = await orderModel.countDocuments({ user: user._id })
			const totalTransactions = await transactionModel.countDocuments({ user: user._id })
			const totalFavourites = user.favorites.length
			const statistics = { totalOrders, totalTransactions, totalFavourites }
			return res.json({ statistics })
		} catch (error) {
			next(error)
		}
	}
	// [POST] /user/add-favorite
	async addFavorite(req, res, next) {
		try {
			const { productId } = req.body
			const userId = req.user._id
			const isExist = await userModel.findOne({ _id: userId, favorites: productId })
			if (isExist) return res.json({ failure: 'Product already in favorites' })
			await userModel.findByIdAndUpdate(userId, { $push: { favorites: productId } })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
	// [PUT] /user/update-profile
	async updateProfile(req, res, next) {
		try {
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			await userModel.findByIdAndUpdate(userId, req.body)
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
	// [PUT] /user/update-password
	async updatePassword(req, res, next) {
		try {
			const { oldPassword, newPassword } = req.body
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })

			const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
			if (!isPasswordMatch) return res.json({ failure: 'Old password is incorrect' })

			const hashedPassword = await bcrypt.hash(newPassword, 10)
			await userModel.findByIdAndUpdate(userId, { password: hashedPassword })

			return res.json({ status: 200 })
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
