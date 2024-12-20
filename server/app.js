require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware')
const stripeController = require('./controllers/stripe.controller')
const { rateLimit } = require('express-rate-limit')
const { HttpsProxyAgent } = require('https-proxy-agent')

const app = express()

// Webhook
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), stripeController.webhook)

// Middleware
app.use(rateLimit({ windowMs: 1 * 60 * 1000, limit: 200, standardHeaders: 'draft-7', legacyHeaders: false }))
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api', require('./routes/index'))

// Error handling
app.use(errorMiddleware)

// Setup proxy
const setupProxy = () => {
	const proxyUrl = process.env.QUOTAGUARDSHIELD_URL
	if (proxyUrl) {
		console.log('QuotaGuard proxy configured.')
		const agent = new HttpsProxyAgent(proxyUrl)

		const https = require('https')
		https.globalAgent = agent
	} else {
		console.log('No QuotaGuard proxy configured.')
	}
}

const bootstrap = async () => {
	try {
		const PORT = process.env.PORT || 5000
		mongoose.connect(process.env.MONOGO_URI).then(() => console.log('Connected to MongoDB'))
		setupProxy()
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	} catch (error) {
		console.log('Error connecting to MongoDB:', error)
	}
}

bootstrap()

// https://www.mongodb.com/try/download/community - Download MongoDB Community Server
// https://www.mongodb.com/try/download/compass - Download MongoDB Compass
