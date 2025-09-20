import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

async function createTransporter() {
  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    const accessToken = credentials.access_token;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_FROM,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken as string,
      },
    });

    return transporter;
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    throw new Error('Email service configuration failed');
  }
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content?: Buffer | string;
    path?: string;
  }>;
}

export async function sendEmail({ to, subject, html, attachments }: EmailOptions) {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `ERAS Editing <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
      attachments,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendWelcomeEmail(userEmail: string, userName: string) {
  const subject = 'Welcome to ERAS Editing!';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to ERAS Editing!</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>Thank you for signing up with ERAS Editing! We're excited to help you perfect your residency application.</p>
            <p>With our service, you'll get:</p>
            <ul>
              <li>Expert editing from medical professionals</li>
              <li>Personalized feedback on your personal statement</li>
              <li>Fast turnaround times</li>
              <li>Unlimited revisions until you're satisfied</li>
            </ul>
            <p>Ready to get started? Upload your first document and our editors will begin reviewing it right away.</p>
            <a href="${process.env.NEXT_PUBLIC_URL}/dashboard" class="button">Go to Dashboard</a>
            <div class="footer">
              <p>If you have any questions, feel free to reply to this email.</p>
              <p>&copy; 2024 ERAS Editing. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to: userEmail, subject, html });
}

export async function sendPaymentReceiptEmail(
  userEmail: string,
  userName: string,
  amount: number,
  paymentId: string,
  serviceName: string,
  invoiceUrl?: string
) {
  const subject = 'Payment Receipt - ERAS Editing';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .receipt-box { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .receipt-row:last-child { border-bottom: none; font-weight: bold; font-size: 18px; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Received</h1>
            <p>Thank you for your purchase!</p>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>Your payment has been successfully processed. Here are the details:</p>

            <div class="receipt-box">
              <div class="receipt-row">
                <span>Transaction ID:</span>
                <span>${paymentId}</span>
              </div>
              <div class="receipt-row">
                <span>Date:</span>
                <span>${new Date().toLocaleDateString()}</span>
              </div>
              <div class="receipt-row">
                <span>Service:</span>
                <span>${serviceName}</span>
              </div>
              <div class="receipt-row">
                <span>Total Amount:</span>
                <span>$${amount.toFixed(2)}</span>
              </div>
            </div>

            <p>Your document is now in our editing queue. Our expert editors will begin reviewing it shortly, and you'll receive an email notification once the editing is complete.</p>

            <p>Expected turnaround time: 24-48 hours</p>

            ${invoiceUrl ? `<a href="${invoiceUrl}" class="button">Download Invoice</a>` : ''}
            <a href="${process.env.NEXT_PUBLIC_URL}/dashboard" class="button">View Dashboard</a>

            <div class="footer">
              <p>This is an official receipt for your records.</p>
              <p>If you have any questions about your payment, please contact us.</p>
              <p>&copy; 2024 ERAS Editing. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to: userEmail, subject, html });
}