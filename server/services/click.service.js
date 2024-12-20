const { TransactionState, ClickError, ClickAction } = require('../enum/transaction.enum')
const transactionModel = require('../models/transaction.model')
const userModel = require('../models/user.model')
const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const clickCheckToken = require('../middlewares/click.middleware')

class ClickService {
	async prepare(data) {
		const {
			click_trans_id: transId,
			service_id: serviceId,
			merchant_trans_id,
			amount,
			action,
			sign_time: signTime,
			sign_string: signString,
		} = data

		const order = await orderModel.findById(merchant_trans_id)

		const userId = order.user
		const productId = order.premium
		const orderId = order._id

		const signatureData = { transId, serviceId, orderId: orderId.toString(), amount, action, signTime }

		const checkSignature = clickCheckToken(signatureData, signString)
		if (!checkSignature) {
			return { error: ClickError.SignFailed, error_note: 'Invalid sign' }
		}

		if (parseInt(action) !== ClickAction.Prepare) {
			return { error: ClickError.ActionNotFound, error_note: 'Action not found' }
		}

		const isAlreadyPaid = await transactionModel.findOne({
			user: userId,
			product: productId,
			state: TransactionState.Paid,
			provider: 'click',
		})

		if (isAlreadyPaid) {
			return { error: ClickError.AlreadyPaid, error_note: 'Already paid' }
		}

		const user = await userModel.findById(userId)
		if (!user) {
			return { error: ClickError.UserNotFound, error_note: 'User not found' }
		}

		const product = await productModel.findById(productId)
		if (!product) {
			return { error: ClickError.BadRequest, error_note: 'Product not found' }
		}

		if (parseInt(amount) !== product.price) {
			return { error: ClickError.InvalidAmount, error_note: 'Incorrect parameter amount' }
		}

		const transaction = await transactionModel.findOne({ id: transId })
		if (transaction && transaction.state === TransactionState.Canceled) {
			return { error: ClickError.TransactionCanceled, error_note: 'Transaction canceled' }
		}

		const time = new Date().getTime()

		await transactionModel.create({
			id: transId,
			user: userId,
			product: productId,
			state: TransactionState.Pending,
			create_time: time,
			amount,
			prepare_id: time,
			provider: 'click',
		})

		return {
			click_trans_id: transId,
			merchant_trans_id: userId,
			merchant_prepare_id: time,
			error: ClickError.Success,
			error_note: 'Success',
		}
	}

	async complete(data) {
		const {
			click_trans_id: transId,
			service_id: serviceId,
			merchant_trans_id,
			merchant_prepare_id: prepareId,
			amount,
			action,
			sign_time: signTime,
			sign_string: signString,
			error,
		} = data

		const order = await orderModel.findById(merchant_trans_id)

		const userId = order.user
		const productId = order.premium
		const orderId = order._id

		const signatureData = {
			transId,
			serviceId,
			orderId: orderId.toString(),
			merchantPrepareId: prepareId,
			amount,
			action,
			signTime,
		}

		const checkSignature = clickCheckToken(signatureData, signString)

		if (!checkSignature) {
			return { error: ClickError.SignFailed, error_note: 'Invalid sign' }
		}

		if (parseInt(action) !== ClickAction.Complete) {
			return { error: ClickError.ActionNotFound, error_note: 'Action not found' }
		}

		const user = await userModel.findById(userId)
		if (!user) {
			return { error: ClickError.UserNotFound, error_note: 'User not found' }
		}

		const product = await productModel.findById(productId)
		if (!product) {
			return { error: ClickError.BadRequest, error_note: 'Product not found' }
		}

		const isPrepared = await transactionModel.findOne({ prepare_id: prepareId, provider: 'click' })
		if (!isPrepared) {
			return { error: ClickError.TransactionNotFound, error_note: 'Transaction not found' }
		}

		const isAlreadyPaid = await transactionModel.findOne({ userId, productId, state: TransactionState.Paid, provider: 'click' })
		if (isAlreadyPaid) {
			return { error: ClickError.AlreadyPaid, error_note: 'Already paid for course' }
		}

		if (parseInt(amount) !== product.price) {
			return { error: ClickError.InvalidAmount, error_note: 'Incorrect parameter amount' }
		}

		const transaction = await transactionModel.findOne({ id: transId })
		if (transaction && transaction.state === TransactionState.Canceled) {
			return { error: ClickError.TransactionCanceled, error_note: 'Transaction canceled' }
		}

		const time = new Date().getTime()

		if (error < 0) {
			await transactionModel.findOneAndUpdate({ id: transId }, { state: TransactionState.Canceled, cancel_time: time })
			return { error: ClickError.TransactionNotFound, error_note: 'Transaction not found' }
		}

		await transactionModel.findOneAndUpdate({ id: transId }, { state: TransactionState.Paid, perform_time: time })
		await orderModel.findOneAndUpdate({ premium: productId, user: userId, provider: 'click' }, { status: 'Paid' })

		return {
			click_trans_id: transId,
			merchant_trans_id: userId,
			merchant_confirm_id: time,
			error: ClickError.Success,
			error_note: 'Success',
		}
	}
}

module.exports = new ClickService()
