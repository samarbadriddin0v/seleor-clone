const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const otpModel = require('../models/otp.model')
const otpTemplate = require('../template/otp.template')
const successTemplate = require('../template/success.template')
const cancelTemplate = require('../template/cancel.template')
const updateTemplate = require('../template/update.template')

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendOtpMail(email) {
		const otp = Math.floor(100000 + Math.random() * 900000)
		console.log(otp)

		const hashedOtp = await bcrypt.hash(otp.toString(), 10)
		await otpModel.deleteMany({ email })
		await otpModel.create({ email, otp: hashedOtp, expireAt: new Date(Date.now() + 5 * 60 * 1000) })
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: `OTP for verification ${new Date().toLocaleString()}`,
			html: otpTemplate(otp),
		})
	}

	async sendSuccessMail({ user, product }) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: user.email,
			subject: `Order Confirmation ${new Date().toLocaleString()}`,
			html: successTemplate({ user, product }),
		})
	}

	async sendCancelMail({ user, product }) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: user.email,
			subject: `Order Cancelled ${new Date().toLocaleString()}`,
			html: cancelTemplate({ user, product }),
		})
	}

	async sendUpdateMail({ user, product, status }) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: user.email,
			subject: `Order Update ${new Date().toLocaleString()}`,
			html: updateTemplate({ user, product, status }),
		})
	}

	async verifyOtp(email, otp) {
		const record = await otpModel.find({ email })
		if (!record) return { failure: 'Record not found' }
		const lastRecord = record[record.length - 1]
		if (!lastRecord) return { failure: 'Record not found' }
		if (lastRecord.expireAt < new Date()) return { status: 301 }

		const isValid = await bcrypt.compare(otp, lastRecord.otp)
		if (!isValid) return { failure: 'Invalid OTP' }

		await otpModel.deleteMany({ email })
		return { status: 200 }
	}
}

module.exports = new MailService()
