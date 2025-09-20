export const emailTemplates = {
  welcome: (userName: string) => ({
    subject: 'Welcome to ERAS Editing!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #f5f5f5; padding: 40px 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; }
            .header h1 { color: #ffffff; font-size: 28px; margin-bottom: 10px; }
            .header p { color: #f0f0f0; font-size: 16px; }
            .content { padding: 40px 30px; }
            .content h2 { color: #333; font-size: 24px; margin-bottom: 20px; }
            .content p { margin-bottom: 15px; color: #555; }
            .features { margin: 30px 0; padding: 25px; background: #f8f9fa; border-radius: 8px; }
            .features h3 { color: #333; margin-bottom: 15px; }
            .features ul { list-style: none; }
            .features li { padding: 10px 0; padding-left: 30px; position: relative; }
            .features li:before { content: "✓"; position: absolute; left: 0; color: #667eea; font-weight: bold; font-size: 18px; }
            .cta { text-align: center; margin: 30px 0; }
            .button { display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; }
            .footer { padding: 30px; background: #f8f9fa; text-align: center; color: #777; font-size: 14px; }
            .footer a { color: #667eea; text-decoration: none; }
            @media only screen and (max-width: 600px) {
              .container { width: 100%; border-radius: 0; }
              .content { padding: 30px 20px; }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <h1>Welcome to ERAS Editing! 🎉</h1>
                <p>Your journey to a perfect residency application starts here</p>
              </div>
              <div class="content">
                <h2>Hello ${userName}!</h2>
                <p>We're thrilled to have you join our community of future medical residents. Your success is our mission, and we're here to help you craft an outstanding ERAS application.</p>

                <div class="features">
                  <h3>What you get with ERAS Editing:</h3>
                  <ul>
                    <li>Expert editing by medical professionals who understand the match process</li>
                    <li>Personalized feedback tailored to your specialty of choice</li>
                    <li>Lightning-fast 24-48 hour turnaround times</li>
                    <li>Unlimited revisions until you're 100% satisfied</li>
                    <li>Confidential and secure document handling</li>
                  </ul>
                </div>

                <p>Our team of experienced editors includes residents, fellows, and attending physicians who have successfully navigated the match process. They know exactly what program directors are looking for.</p>

                <div class="cta">
                  <a href="${process.env.NEXT_PUBLIC_URL}/dashboard" class="button">Start Your First Edit</a>
                </div>

                <p style="margin-top: 30px;">Need help getting started? Check out our <a href="${process.env.NEXT_PUBLIC_URL}/guide" style="color: #667eea;">editing guide</a> or reply to this email - we're always here to help!</p>
              </div>
              <div class="footer">
                <p>You're receiving this email because you signed up for ERAS Editing.</p>
                <p style="margin-top: 10px;">
                  <a href="${process.env.NEXT_PUBLIC_URL}/privacy">Privacy Policy</a> •
                  <a href="${process.env.NEXT_PUBLIC_URL}/terms">Terms of Service</a> •
                  <a href="${process.env.NEXT_PUBLIC_URL}/contact">Contact Us</a>
                </p>
                <p style="margin-top: 15px;">© 2024 ERAS Editing. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  paymentReceipt: (data: {
    userName: string;
    amount: number;
    paymentId: string;
    serviceName: string;
    date: string;
    invoiceUrl?: string;
  }) => ({
    subject: '✅ Payment Confirmation - ERAS Editing',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #f5f5f5; padding: 40px 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #42e695 0%, #3bb2b8 100%); padding: 40px 30px; text-align: center; }
            .header h1 { color: #ffffff; font-size: 28px; margin-bottom: 10px; }
            .header .check { font-size: 48px; margin-bottom: 15px; }
            .content { padding: 40px 30px; }
            .content h2 { color: #333; font-size: 24px; margin-bottom: 20px; }
            .content p { margin-bottom: 15px; color: #555; }
            .receipt { margin: 30px 0; background: #f8f9fa; border-radius: 8px; overflow: hidden; }
            .receipt-header { background: #667eea; color: white; padding: 15px 20px; font-weight: 600; }
            .receipt-body { padding: 20px; }
            .receipt-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e0e0e0; }
            .receipt-row:last-child { border-bottom: none; padding-top: 20px; }
            .receipt-label { color: #777; }
            .receipt-value { color: #333; font-weight: 500; }
            .receipt-total { font-size: 20px; color: #42e695; font-weight: 700; }
            .timeline { margin: 30px 0; padding: 25px; background: #fff8e1; border-radius: 8px; border-left: 4px solid #ffc107; }
            .timeline h3 { color: #333; margin-bottom: 10px; }
            .timeline p { margin: 5px 0; color: #666; }
            .buttons { text-align: center; margin: 30px 0; }
            .button { display: inline-block; padding: 14px 35px; margin: 0 10px; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; }
            .button-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .button-secondary { background: linear-gradient(135deg, #42e695 0%, #3bb2b8 100%); }
            .footer { padding: 30px; background: #f8f9fa; text-align: center; color: #777; font-size: 14px; }
            .footer a { color: #667eea; text-decoration: none; }
            @media only screen and (max-width: 600px) {
              .container { width: 100%; border-radius: 0; }
              .content { padding: 30px 20px; }
              .buttons { display: flex; flex-direction: column; }
              .button { margin: 10px 0; }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <div class="check">✓</div>
                <h1>Payment Successful!</h1>
              </div>
              <div class="content">
                <h2>Thank you, ${data.userName}!</h2>
                <p>Your payment has been successfully processed and your editing service is now active. Here are your transaction details:</p>

                <div class="receipt">
                  <div class="receipt-header">Transaction Details</div>
                  <div class="receipt-body">
                    <div class="receipt-row">
                      <span class="receipt-label">Transaction ID</span>
                      <span class="receipt-value">${data.paymentId}</span>
                    </div>
                    <div class="receipt-row">
                      <span class="receipt-label">Date</span>
                      <span class="receipt-value">${data.date}</span>
                    </div>
                    <div class="receipt-row">
                      <span class="receipt-label">Service</span>
                      <span class="receipt-value">${data.serviceName}</span>
                    </div>
                    <div class="receipt-row">
                      <span class="receipt-label">Payment Method</span>
                      <span class="receipt-value">Credit Card</span>
                    </div>
                    <div class="receipt-row">
                      <span class="receipt-label"><strong>Total Amount</strong></span>
                      <span class="receipt-total">$${data.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div class="timeline">
                  <h3>📝 What happens next?</h3>
                  <p>1. Your document is now in our editing queue</p>
                  <p>2. An expert editor will be assigned within 2 hours</p>
                  <p>3. You'll receive your edited document within 24-48 hours</p>
                  <p>4. Request unlimited revisions if needed</p>
                </div>

                <p>You can track the progress of your edit in real-time through your dashboard. We'll also send you email notifications at each stage of the process.</p>

                <div class="buttons">
                  ${data.invoiceUrl ? `<a href="${data.invoiceUrl}" class="button button-secondary">Download Invoice</a>` : ''}
                  <a href="${process.env.NEXT_PUBLIC_URL}/dashboard" class="button button-primary">Track Your Edit</a>
                </div>

                <p style="margin-top: 30px; padding: 20px; background: #e8f5e9; border-radius: 8px; text-align: center;">
                  <strong>Need help?</strong> Our support team is available 24/7.<br/>
                  Reply to this email or use the chat on our website.
                </p>
              </div>
              <div class="footer">
                <p><strong>This receipt is for your records.</strong></p>
                <p style="margin-top: 10px;">Tax ID: 88-1234567 | ERAS Editing LLC</p>
                <p style="margin-top: 15px;">
                  <a href="${process.env.NEXT_PUBLIC_URL}/privacy">Privacy</a> •
                  <a href="${process.env.NEXT_PUBLIC_URL}/terms">Terms</a> •
                  <a href="${process.env.NEXT_PUBLIC_URL}/refund">Refund Policy</a>
                </p>
                <p style="margin-top: 15px;">© 2024 ERAS Editing. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  })
};