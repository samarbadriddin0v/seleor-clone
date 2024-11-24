const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const otpModel = require('../models/otp.model')

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
		const otp = Math.floor(100000 + Math.random() * 900000) // 6 digit OTP
		console.log('OTP:', otp)

		const hashedOtp = await bcrypt.hash(otp.toString(), 10)
		await otpModel.deleteMany({ email })
		await otpModel.create({ email, otp: hashedOtp, expireAt: new Date(Date.now() + 1 * 60 * 1000) })
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: `OTP for verification ${new Date().toLocaleString()}`,
			html: `
				<h1>Your OTP is ${otp}</h1>
				<p>OTP will expire in 5 minutes</p>
				<p><strong>Note:</strong> Do not share this OTP with anyone for security reasons.</p>
			`,
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
