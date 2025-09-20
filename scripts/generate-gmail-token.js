const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Gmail API Token Generator');
console.log('=========================\n');

rl.question('Enter your Gmail Client ID: ', (clientId) => {
  rl.question('Enter your Gmail Client Secret: ', (clientSecret) => {
    rl.question('Enter your Redirect URI (default: http://localhost:3000/api/auth/gmail/callback): ', (redirectUri) => {
      const redirect = redirectUri || 'http://localhost:3000/api/auth/gmail/callback';

      const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirect
      );

      const scopes = ['https://www.googleapis.com/auth/gmail.send'];

      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
      });

      console.log('\n1. Visit this URL to authorize the application:');
      console.log(url);
      console.log('\n2. After authorization, you will be redirected to a URL with a code parameter.');
      console.log('3. Copy the code from the URL.\n');

      rl.question('Enter the authorization code: ', async (code) => {
        try {
          const { tokens } = await oauth2Client.getToken(code);

          console.log('\n✅ Success! Here are your tokens:\n');
          console.log('Refresh Token:', tokens.refresh_token);
          console.log('Access Token:', tokens.access_token);
          console.log('\nAdd the refresh token to your .env.local file as GMAIL_REFRESH_TOKEN');

          rl.close();
        } catch (error) {
          console.error('Error getting tokens:', error.message);
          rl.close();
        }
      });
    });
  });
});