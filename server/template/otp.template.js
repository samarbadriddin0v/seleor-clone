function otpTemplate(otp) {
	return `
		<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
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
            background-color: #235af2;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .otp {
            font-size: 36px;
            color: #235af2;
            margin: 20px 0;
            font-weight: bold;
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
            Your OTP Code
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Here is your one-time password (OTP) for secure access:</p>
            <div class="otp">${otp}</div>
            <p>This code is valid for the next 5 minutes.</p>
            <p>If you didn’t request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>Thank you for using our service!</p>
            <p>
                Need help? <a href="mailto:support@example.com">Contact Support</a>
            </p>
        </div>
    </div>
</body>
</html>

	`
}

module.exports = otpTemplate
