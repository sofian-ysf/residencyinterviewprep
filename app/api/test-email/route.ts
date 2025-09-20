import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/gmail-service';
import { emailTemplates } from '@/lib/email/templates';

export async function POST(request: Request) {
  try {
    const { type, email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'welcome':
        const welcomeTemplate = emailTemplates.welcome('Test User');
        result = await sendEmail({
          to: email,
          subject: welcomeTemplate.subject,
          html: welcomeTemplate.html,
        });
        break;

      case 'receipt':
        const receiptTemplate = emailTemplates.paymentReceipt({
          userName: 'Test User',
          amount: 99.99,
          paymentId: 'test_payment_123',
          serviceName: 'Premium Editing Service',
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        });
        result = await sendEmail({
          to: email,
          subject: receiptTemplate.subject,
          html: receiptTemplate.html,
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type. Use "welcome" or "receipt"' },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Test ${type} email sent successfully to ${email}`,
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { error: `Failed to send email: ${result.error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}