const { Schema, model } = require('mongoose')

const orderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		price: { type: Number, required: true },
		status: { type: String, default: 'Pending confirm' },
	},
	{ timestamps: true }
)

module.exports = model('Order', orderSchema)
