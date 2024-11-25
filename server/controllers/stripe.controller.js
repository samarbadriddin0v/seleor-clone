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

			console.log('data:', data)
			console.log('eventType:', eventType)

			return res.status(200).end()
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new StripeController()
