const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const clickService = require('../services/click.service')

class ClickController {
	async prepare(req, res, next) {
		try {
			const data = req.body
			const result = await clickService.prepare(data)
			res.set({ headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).send(result)
		} catch (error) {
			next(error)
		}
	}
	async complete(req, res, next) {
		try {
			const data = req.body
			const result = await clickService.complete(data)
			res.set({ headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).send(result)
		} catch (error) {
			next(error)
		}
	}
	async checkout(req, res, next) {
		try {
			const currentUser = req.user
			const { productId } = req.body
			const MERCHANT_ID = process.env.CLICK_MERCHANT_ID
			const SERVICE_ID = process.env.CLICK_SERVICE_ID
			const MERCHANT_USER_ID = process.env.CLICK_MERCHANT_USER_ID
			const product = await productModel.findById(productId)
			if (!product) return { failure: 'Product not found' }
			const user = await userModel.findById(currentUser._id)
			if (!user) return { failure: 'User not found' }
			await orderModel.deleteMany({ user: user._id, premium: product._id, status: 'Pending confirm', provider: 'click' })
			const order = await orderModel.create({ user: user._id, product: product._id, price: product.price, provider: 'click' })
			const return_url = `${process.env.CLIENT_URL}/success?productId=${product._id}&userId=${currentUser._id}`
			const price = product.price
			const checkoutUrl = `https://my.click.uz/services/pay?transaction_param=${order._id}&amount=${price}&merchant_id=${MERCHANT_ID}&merchant_order_id=${MERCHANT_USER_ID}&service_id=${SERVICE_ID}&return_url=${return_url}`
			res.json({ checkoutUrl, status: 200 })
		} catch (error) {
			console.log(error)

			next(error)
		}
	}
}

module.exports = new ClickController()
