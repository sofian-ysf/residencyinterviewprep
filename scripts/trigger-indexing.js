#!/usr/bin/env node

/**
 * Google Indexing API Script
 * Submits URLs to Google for immediate indexing
 * 
 * Prerequisites:
 * 1. Enable Google Indexing API in Google Cloud Console
 * 2. Create a service account with Indexing API permissions
 * 3. Download the service account JSON key
 * 4. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
 * 5. Verify domain ownership in Google Search Console
 * 6. Add service account email to Search Console as an owner
 */

const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://www.myerasediting.com';
const BATCH_SIZE = 100; // Google Indexing API allows up to 100 URLs per batch
const DELAY_BETWEEN_BATCHES = 1000; // 1 second delay between batches

// Initialize the Google Indexing API client
async function initializeClient() {
  try {
    // Check if credentials are set
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error(
        'GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.\n' +
        'Please set it to the path of your Google service account JSON key file.\n' +
        'Example: export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/key.json"'
      );
    }

    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const authClient = await auth.getClient();
    
    return google.indexing({
      version: 'v3',
      auth: authClient,
    });
  } catch (error) {
    console.error('Failed to initialize Google client:', error.message);
    process.exit(1);
  }
}

// Get all URLs from your sitemap
async function getSitemapUrls() {
  // Core pages
  const urls = [
    `${SITE_URL}`,
    `${SITE_URL}/pricing`,
    `${SITE_URL}/guides`,
    `${SITE_URL}/timeline`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/about`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/faq`,
    `${SITE_URL}/testimonials`,
    `${SITE_URL}/success-stories`,
    `${SITE_URL}/resources`,
  ];

  // Specialty pages
  const specialties = [
    'internal-medicine', 'surgery', 'pediatrics', 'emergency-medicine',
    'family-medicine', 'psychiatry', 'anesthesiology', 'radiology',
    'pathology', 'ob-gyn', 'neurology', 'dermatology', 'ophthalmology',
    'orthopedic-surgery', 'otolaryngology', 'urology', 'plastic-surgery',
    'physical-medicine', 'radiation-oncology', 'diagnostic-radiology'
  ];
  specialties.forEach(specialty => {
    urls.push(`${SITE_URL}/specialties/${specialty}`);
  });

  // Guide pages
  const guides = [
    'personal-statement', 'cv-formatting', 'eras-timeline',
    'interview-preparation', 'letters-of-recommendation', 'program-signals',
    'supplemental-eras', 'img-guide', 'couples-match', 'research-experience',
    'clinical-experience', 'volunteer-activities', 'hobbies-interests',
    'red-flags', 'gap-years'
  ];
  guides.forEach(guide => {
    urls.push(`${SITE_URL}/guides/${guide}`);
  });

  // Service pages
  urls.push(
    `${SITE_URL}/services/personal-statement`,
    `${SITE_URL}/services/experiences`,
    `${SITE_URL}/services/letters`
  );

  // TODO: Add dynamic blog post URLs from database if needed
  
  return urls;
}

// Submit a single URL to Google Indexing API
async function submitUrl(client, url, type = 'URL_UPDATED') {
  try {
    const response = await client.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type, // URL_UPDATED or URL_DELETED
      },
    });
    
    return {
      url,
      success: true,
      response: response.data,
    };
  } catch (error) {
    return {
      url,
      success: false,
      error: error.message,
    };
  }
}

// Submit URLs in batches
async function submitUrlsBatch(client, urls) {
  const results = [];
  
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`\nProcessing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(urls.length / BATCH_SIZE)}`);
    
    const batchPromises = batch.map(url => submitUrl(client, url));
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Log batch results
    const successful = batchResults.filter(r => r.success).length;
    const failed = batchResults.filter(r => !r.success).length;
    console.log(`✓ Successful: ${successful}, ✗ Failed: ${failed}`);
    
    // Log failed URLs
    batchResults.filter(r => !r.success).forEach(r => {
      console.error(`  ✗ ${r.url}: ${r.error}`);
    });
    
    // Delay between batches to avoid rate limiting
    if (i + BATCH_SIZE < urls.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }
  
  return results;
}

// Get indexing status for a URL
async function getIndexingStatus(client, url) {
  try {
    const response = await client.urlNotifications.getMetadata({
      url: url,
    });
    
    return {
      url,
      success: true,
      metadata: response.data,
    };
  } catch (error) {
    return {
      url,
      success: false,
      error: error.message,
    };
  }
}

// Main execution
async function main() {
  console.log('🚀 Google Indexing API Script');
  console.log('============================\n');
  
  // Parse command line arguments
  const args = process.argv.slice(2);
  const command = args[0] || 'submit';
  const specificUrl = args[1];
  
  // Initialize client
  console.log('Initializing Google API client...');
  const client = await initializeClient();
  console.log('✓ Client initialized\n');
  
  if (command === 'status' && specificUrl) {
    // Check status of a specific URL
    console.log(`Checking indexing status for: ${specificUrl}`);
    const result = await getIndexingStatus(client, specificUrl);
    
    if (result.success) {
      console.log('\n✓ Status retrieved successfully:');
      console.log(JSON.stringify(result.metadata, null, 2));
    } else {
      console.error(`\n✗ Failed to get status: ${result.error}`);
    }
  } else if (command === 'submit') {
    // Submit URLs for indexing
    let urls;
    
    if (specificUrl) {
      // Submit a specific URL
      urls = [specificUrl];
      console.log(`Submitting specific URL: ${specificUrl}`);
    } else {
      // Submit all sitemap URLs
      console.log('Fetching sitemap URLs...');
      urls = await getSitemapUrls();
      console.log(`✓ Found ${urls.length} URLs to submit\n`);
    }
    
    // Submit URLs
    console.log('Submitting URLs to Google Indexing API...');
    const results = await submitUrlsBatch(client, urls);
    
    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log('\n' + '='.repeat(50));
    console.log('SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total URLs processed: ${results.length}`);
    console.log(`✓ Successfully submitted: ${successful}`);
    console.log(`✗ Failed submissions: ${failed}`);
    
    // Save results to file
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const logFile = path.join(__dirname, `indexing-results-${timestamp}.json`);
    await fs.writeFile(logFile, JSON.stringify(results, null, 2));
    console.log(`\nResults saved to: ${logFile}`);
    
    if (failed > 0) {
      console.log('\n⚠️  Some URLs failed to submit. Check the log file for details.');
      process.exit(1);
    }
  } else {
    console.log('Usage:');
    console.log('  node scripts/trigger-indexing.js submit [url]  - Submit URL(s) for indexing');
    console.log('  node scripts/trigger-indexing.js status <url>  - Check indexing status of a URL');
    console.log('\nExamples:');
    console.log('  node scripts/trigger-indexing.js submit                    - Submit all sitemap URLs');
    console.log('  node scripts/trigger-indexing.js submit https://example.com - Submit specific URL');
    console.log('  node scripts/trigger-indexing.js status https://example.com - Check URL status');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { getSitemapUrls, submitUrl, getIndexingStatus };