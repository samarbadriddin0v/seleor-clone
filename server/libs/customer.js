const userModel = require('../models/user.model')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createCustomer = async userId => {
	try {
		const user = await userModel.findById(userId)
		const customer = await stripe.customers.create({
			email: user.email,
			name: user.fullName,
			metadata: { userId: user._id.toString() },
		})
		await userModel.findByIdAndUpdate(userId, { customerId: customer.id })
		return customer
	} catch (error) {
		throw new Error(error)
	}
}

const getCustomer = async userId => {
	try {
		const user = await userModel.findById(userId)
		if (!user.customerId) return await createCustomer(userId)
		return await stripe.customers.retrieve(user.customerId)
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = { getCustomer }
