import { google } from 'googleapis';

// Initialize Google Indexing API client
async function getIndexingClient() {
  try {
    // Check if credentials are configured
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.warn('Google Indexing API credentials not configured');
      return null;
    }

    let auth;
    
    // Use service account key from environment variable if available
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/indexing'],
      });
    } else {
      // Fall back to application default credentials
      auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/indexing'],
      });
    }

    const authClient = await auth.getClient();
    
    return google.indexing({
      version: 'v3',
      auth: authClient as any,
    });
  } catch (error) {
    console.error('Failed to initialize Google Indexing client:', error);
    return null;
  }
}

// Submit URL to Google for indexing
export async function submitToGoogleIndexing(url: string) {
  try {
    const indexingClient = await getIndexingClient();
    
    if (!indexingClient) {
      console.log('Google Indexing API not configured - skipping');
      return { success: false, message: 'Not configured' };
    }

    // Submit URL for indexing
    const response = await indexingClient.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    console.log(`Google Indexing API: Successfully submitted ${url}`);
    return {
      success: true,
      message: 'URL submitted for indexing',
      data: response.data,
    };
  } catch (error: any) {
    console.error('Google Indexing API error:', error.message);
    
    // Don't throw error, just return failure status
    return {
      success: false,
      message: error.message || 'Failed to submit URL',
      error: error,
    };
  }
}

// Batch submit multiple URLs
export async function batchSubmitToGoogleIndexing(urls: string[]) {
  const results = [];
  
  for (const url of urls) {
    const result = await submitToGoogleIndexing(url);
    results.push({ url, ...result });
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// Check indexing status
export async function checkIndexingStatus(url: string) {
  try {
    const indexingClient = await getIndexingClient();
    
    if (!indexingClient) {
      return { success: false, message: 'Not configured' };
    }

    const response = await indexingClient.urlNotifications.getMetadata({
      url: url,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error checking indexing status:', error.message);
    return {
      success: false,
      message: error.message || 'Failed to check status',
    };
  }
}