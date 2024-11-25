const { TransactionState } = require('../enum/transaction.enum')
const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const transactionModel = require('../models/transaction.model')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class StripeController {
	async webhook(req, res, next) {
		try {
			let data
			let eventType
			const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

			if (webhookSecret) {
				const signature = req.headers['stripe-signature']
				const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret)
				data = event.data.object
				eventType = event.type
			} else {
				data = req.body.data.object
				eventType = req.body.type
			}

			if (eventType === 'payment_intent.payment_failed') {
				const product = await productModel.findById(data.metadata.productId)
				await transactionModel.create({
					user: data.metadata.userId,
					product: data.metadata.productId,
					state: TransactionState.PaidCanceled,
					amount: product.price,
					provider: 'stripe',
				})
			}

			if (eventType === 'payment_intent.succeeded') {
				const product = await productModel.findById(data.metadata.productId)
				await orderModel.create({ user: data.metadata.userId, product: data.metadata.productId, price: product.price })
				await transactionModel.create({
					user: data.metadata.userId,
					product: data.metadata.productId,
					state: TransactionState.Paid,
					amount: product.price,
					provider: 'stripe',
				})
			}

			return res.status(200).end()
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new StripeController()
