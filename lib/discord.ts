interface DiscordEmbed {
  title: string;
  description?: string;
  color: number;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  footer?: {
    text: string;
  };
  timestamp?: string;
}

interface DiscordMessage {
  username?: string;
  avatar_url?: string;
  content?: string;
  embeds?: DiscordEmbed[];
}

export async function sendDiscordNotification(message: DiscordMessage) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('Discord webhook URL not configured');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: message.username || 'Residency Interview Prep',
        avatar_url: message.avatar_url || 'https://i.imgur.com/AfFp7pu.png',
        ...message,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send Discord notification:', response.status);
    }
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
}

export function sendNewUserNotification(userData: {
  email: string;
  name?: string;
  provider?: string;
}) {
  const embed: DiscordEmbed = {
    title: '🎉 New User Registration',
    description: 'A new user has signed up for Residency Interview Prep',
    color: 0x00ff00, // Green
    fields: [
      {
        name: '📧 Email',
        value: userData.email,
        inline: true,
      },
      {
        name: '👤 Name',
        value: userData.name || 'Not provided',
        inline: true,
      },
      {
        name: '🔐 Method',
        value: userData.provider || 'Email/Password',
        inline: true,
      },
    ],
    footer: {
      text: 'Residency Interview Prep',
    },
    timestamp: new Date().toISOString(),
  };

  return sendDiscordNotification({
    content: '@here New user alert!',
    embeds: [embed],
  });
}

export function sendPaymentNotification(paymentData: {
  email: string;
  name?: string;
  packageName: string;
  amount: number;
  paymentId?: string;
}) {
  const embed: DiscordEmbed = {
    title: '💰 New Payment Received',
    description: `A customer has purchased the ${paymentData.packageName} package`,
    color: 0x5865f2, // Discord blue
    fields: [
      {
        name: '📧 Customer Email',
        value: paymentData.email,
        inline: true,
      },
      {
        name: '👤 Customer Name',
        value: paymentData.name || 'Not provided',
        inline: true,
      },
      {
        name: '📦 Package',
        value: paymentData.packageName,
        inline: true,
      },
      {
        name: '💵 Amount',
        value: `$${paymentData.amount}`,
        inline: true,
      },
      {
        name: '🔗 Payment ID',
        value: paymentData.paymentId || 'N/A',
        inline: false,
      },
    ],
    footer: {
      text: 'Residency Interview Prep - Stripe Payment',
    },
    timestamp: new Date().toISOString(),
  };

  return sendDiscordNotification({
    content: '🎊 **New Sale!** 🎊',
    embeds: [embed],
  });
}

export function sendApplicationSubmittedNotification(applicationData: {
  email: string;
  name?: string;
  packageType: string;
  specialty?: string;
}) {
  const embed: DiscordEmbed = {
    title: '📝 Application Submitted for Review',
    description: 'A user has submitted their application for review',
    color: 0xffa500, // Orange
    fields: [
      {
        name: '📧 User Email',
        value: applicationData.email,
        inline: true,
      },
      {
        name: '👤 Name',
        value: applicationData.name || 'Not provided',
        inline: true,
      },
      {
        name: '📦 Package Type',
        value: applicationData.packageType,
        inline: true,
      },
      {
        name: '🏥 Specialty',
        value: applicationData.specialty || 'Not specified',
        inline: true,
      },
    ],
    footer: {
      text: 'Residency Interview Prep',
    },
    timestamp: new Date().toISOString(),
  };

  return sendDiscordNotification({
    embeds: [embed],
  });
}