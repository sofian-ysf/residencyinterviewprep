import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendEmail } from '@/lib/email/gmail-service';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      firstChoice,
      firstChoiceTime,
      secondChoice,
      secondChoiceTime,
      thirdChoice,
      thirdChoiceTime,
      timezone,
      notes,
    } = body;

    if (!firstChoice || !firstChoiceTime || !timezone) {
      return NextResponse.json(
        { error: 'First choice date, time, and timezone are required' },
        { status: 400 }
      );
    }

    const userEmail = session.user.email || '';
    const userName = session.user.name || 'User';

    // Format dates for email
    const formatDateOption = (date: string, time: string) => {
      if (!date || !time) return null;
      const dateObj = new Date(`${date}T${time}`);
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    };

    const option1 = formatDateOption(firstChoice, firstChoiceTime);
    const option2 = formatDateOption(secondChoice, secondChoiceTime);
    const option3 = formatDateOption(thirdChoice, thirdChoiceTime);

    // Send email to team
    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #4F46E5; }
            .info-row { padding: 8px 0; }
            .label { font-weight: bold; color: #4F46E5; }
            .priority { background: #FEF3C7; padding: 15px; border-radius: 5px; border-left: 4px solid #F59E0B; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Interview Request</h1>
            </div>
            <div class="content">
              <div class="priority">
                <strong>Action Required:</strong> A user has requested to schedule a mock interview session.
              </div>

              <div class="info-box">
                <div class="info-row">
                  <span class="label">From:</span> ${userName}
                </div>
                <div class="info-row">
                  <span class="label">Email:</span> ${userEmail}
                </div>
              </div>

              <div class="info-box">
                <h3 style="margin-top: 0; color: #4F46E5;">Preferred Date & Time Options</h3>
                <div class="info-row">
                  <span class="label">1st Choice:</span> ${option1}
                </div>
                ${option2 ? `<div class="info-row"><span class="label">2nd Choice:</span> ${option2}</div>` : ''}
                ${option3 ? `<div class="info-row"><span class="label">3rd Choice:</span> ${option3}</div>` : ''}
                <div class="info-row">
                  <span class="label">Timezone:</span> ${timezone}
                </div>
              </div>

              ${notes ? `
                <div class="info-box">
                  <h3 style="margin-top: 0; color: #4F46E5;">Additional Notes</h3>
                  <p>${notes}</p>
                </div>
              ` : ''}

              <div style="margin-top: 30px; padding: 15px; background: #E0E7FF; border-radius: 5px;">
                <p style="margin: 0;"><strong>Next Steps:</strong></p>
                <ol style="margin: 10px 0;">
                  <li>Review the user's availability preferences</li>
                  <li>Coordinate with an available interviewer</li>
                  <li>Create a Google Meet link for the session</li>
                  <li>Send confirmation email to <strong>${userEmail}</strong></li>
                </ol>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to user
    const userConfirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .success-box { background: #D1FAE5; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #10B981; }
            .info-box { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Interview Request Received</h1>
            </div>
            <div class="content">
              <div class="success-box">
                <h3 style="margin-top: 0; color: #065F46;">✓ Request Submitted Successfully</h3>
                <p style="margin-bottom: 0;">We've received your interview scheduling request and will get back to you within 24 hours.</p>
              </div>

              <h2>Hi ${userName},</h2>
              <p>Thank you for requesting a mock interview session! Our team is reviewing your availability preferences:</p>

              <div class="info-box">
                <div style="padding: 8px 0;"><strong>1st Choice:</strong> ${option1}</div>
                ${option2 ? `<div style="padding: 8px 0;"><strong>2nd Choice:</strong> ${option2}</div>` : ''}
                ${option3 ? `<div style="padding: 8px 0;"><strong>3rd Choice:</strong> ${option3}</div>` : ''}
                <div style="padding: 8px 0;"><strong>Timezone:</strong> ${timezone}</div>
              </div>

              <h3>What Happens Next?</h3>
              <ol>
                <li>Our team will coordinate with an available interviewer</li>
                <li>You'll receive a confirmation email with:
                  <ul>
                    <li>Confirmed date and time</li>
                    <li>Google Meet link for your session</li>
                    <li>Preparation materials and tips</li>
                  </ul>
                </li>
                <li>The session details will appear in your dashboard</li>
              </ol>

              <p>If you have any questions or need to make changes, please contact us at <a href="mailto:team@myerasediting.com">team@myerasediting.com</a>.</p>

              <div class="footer">
                <p>Looking forward to helping you prepare!</p>
                <p>&copy; 2025 Residency Interview Prep. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send both emails
    const teamEmail = await sendEmail({
      to: 'team@myerasediting.com',
      subject: `New Interview Request from ${userName}`,
      html: teamEmailHtml,
    });

    const userEmail = await sendEmail({
      to: session.user.email!,
      subject: 'Interview Request Received - Residency Interview Prep',
      html: userConfirmationHtml,
    });

    if (!teamEmail.success || !userEmail.success) {
      console.error('Failed to send one or more emails:', {
        teamEmail: teamEmail.success,
        userEmail: userEmail.success,
      });
      return NextResponse.json(
        { error: 'Failed to send confirmation emails' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Interview request submitted successfully',
    });
  } catch (error) {
    console.error('Error processing interview request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
