function formatPrice(price) {
	return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS' }).format(price)
}

module.exports = { formatPrice }
