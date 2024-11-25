const { formatPrice } = require('../libs/utils')

function cancelTemplate({ user, product }) {
	return `
		<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Cancellation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f6f9fc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #ff4d4f;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .product {
            display: flex;
            align-items: center;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            margin: 10px 0;
            overflow: hidden;
        }
        .product img {
            width: 100px;
            height: 100px;
            object-fit: cover;
        }
        .product-details {
            padding: 10px;
            flex: 1;
        }
        .product-details h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }
        .product-details p {
            margin: 5px 0;
            font-size: 14px;
            color: #666;
        }
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #f1f1f1;
            color: #7a7a7a;
            font-size: 14px;
        }
        .footer a {
            color: #235af2;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Order Cancelled
        </div>
        <div class="content">
            <p>Dear <strong>${user.fullName}</strong>,</p>
            <p>We regret to inform you that your order has been cancelled. Here are the details:</p>
            <div class="product">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-details">
                    <h3>${product.title}</h3>
                    <p>Price: <strong>${formatPrice(product.price)}</strong></p>
                </div>
            </div>
            <p>If this was a mistake or you need assistance, please feel free to reach out to our support team.</p>
        </div>
        <div class="footer">
            <p>We hope to serve you better in the future!</p>
            <p>
                Need help? <a href="mailto:sammibadriddinov@gmail.com">Contact Support</a>
            </p>
        </div>
    </div>
</body>
</html>

	`
}

module.exports = cancelTemplate
