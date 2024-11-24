const mailService = require('../services/mail.service')

class OtpController {
	async sendOtp(req, res, next) {
		try {
			const { email } = req.body
			await mailService.sendOtpMail(email)
			res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
	async verifyOtp(req, res, next) {
		try {
			const { email, otp } = req.body
			const result = await mailService.verifyOtp(email, otp)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new OtpController()
