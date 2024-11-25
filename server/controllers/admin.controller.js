const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const orderModel = require('../models/order.model')
const transactionModel = require('../models/transaction.model')

class AdminController {
	constructor() {
		this.userId = '67420187ce7f12bf6ec22428'
		this.createProduct = this.createProduct.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
		this.getProducts = this.getProducts.bind(this)
		this.getCustomers = this.getCustomers.bind(this)
		this.getOrders = this.getOrders.bind(this)
		this.getTransactions = this.getTransactions.bind(this)
		this.updateOrder = this.updateOrder.bind(this)
	}
	// [GET] /admin/products
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
	// [GET] /admin/customers
	async getCustomers(req, res, next) {
		try {
			const { searchQuery, filter, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				query.$or = [
					{ fullName: { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ email: { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const customers = await userModel.aggregate([
				{ $match: query },
				{ $lookup: { from: 'orders', localField: '_id', foreignField: 'user', as: 'orders' } },
				{ $addFields: { orderCount: { $size: '$orders' } } },
				{ $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },
				{
					$group: {
						_id: '$_id',
						email: { $first: '$email' },
						fullName: { $first: '$fullName' },
						role: { $first: '$role' },
						createdAt: { $first: '$createdAt' },
						updatedAt: { $first: '$updatedAt' },
						totalPrice: { $sum: '$orders.price' },
						orderCount: { $first: '$orderCount' },
						isDeleted: { $first: '$isDeleted' },
					},
				},
				{ $sort: sortOptions },
				{ $skip: skipAmount },
				{ $limit: +pageSize },
			])

			const totalCustomers = await userModel.countDocuments(query)
			const isNext = totalCustomers > skipAmount + +customers.length

			return res.json({ customers, isNext })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /admin/orders
	async getOrders(req, res, next) {
		try {
			const { searchQuery, filter, page, pageSize } = req.query
			const skipAmount = (page - 1) * pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				query.$or = [
					{ 'user.fullName': { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ 'user.email': { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ 'product.title': { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const orders = await orderModel.aggregate([
				{ $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
				{ $unwind: '$user' },
				{ $lookup: { from: 'products', localField: 'product', foreignField: '_id', as: 'product' } },
				{ $unwind: '$product' },
				{ $match: query },
				{ $sort: sortOptions },
				{ $skip: skipAmount },
				{ $limit: +pageSize },
				{
					$project: {
						'user.email': 1,
						'user.fullName': 1,
						'product.title': 1,
						price: 1,
						createdAt: 1,
						status: 1,
					},
				},
			])

			const totalOrders = await orderModel.countDocuments(query)
			const isNext = totalOrders > skipAmount + +orders.length

			return res.json({ orders, isNext })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /admin/transactions
	async getTransactions(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin') return res.json({ failure: 'User is not admin' })
			const transactions = await transactionModel.find()
			return res.json({ success: 'Get transactions successfully', transactions })
		} catch (error) {
			next(error)
		}
	}
	// [POST] /admin/create-product
	async createProduct(req, res, next) {
		try {
			const newProduct = await productModel.create(req.body)
			if (!newProduct) return res.json({ failure: 'Failed while creating product' })
			return res.json({ status: 201 })
		} catch (error) {
			next(error)
		}
	}
	// [PUT] /admin/update-product/:id
	async updateProduct(req, res, next) {
		try {
			const data = req.body
			const { id } = req.params
			const updatedProduct = await productModel.findByIdAndUpdate(id, data)
			if (!updatedProduct) return res.json({ failure: 'Failed while updating product' })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
	// [PUT] /admin/update-order/:id
	async updateOrder(req, res, next) {
		try {
			const { status } = req.body
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin') return res.json({ failure: 'User is not admin' })
			const updatedOrder = await orderModel.findByIdAndUpdate(id, { status })
			if (!updatedOrder) return res.json({ failure: 'Failed while updating order' })
			return res.json({ success: 'Order updated successfully' })
		} catch (error) {
			next(error)
		}
	}
	// [DELETE] /admin/delete-product/:id
	async deleteProduct(req, res, next) {
		try {
			const { id } = req.params
			const deletedProduct = await productModel.findByIdAndDelete(id)
			if (!deletedProduct) return res.json({ failure: 'Failed while deleting product' })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AdminController()
