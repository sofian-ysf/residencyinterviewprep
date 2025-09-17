#!/usr/bin/env node

/**
 * Request Google to index pages via Indexing API
 * Requires Google Service Account credentials
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://www.myerasediting.com';
const BATCH_SIZE = 100; // Google's limit per request
const DELAY_BETWEEN_BATCHES = 1000; // 1 second

// Priority pages to index first - ONLY PAGES THAT ACTUALLY EXIST
const PRIORITY_PAGES = [
  '/',
  '/pricing',
  '/guides',
  '/timeline',
  '/blog',
  '/about',
  '/guides/personal-statement',
  '/guides/letters-of-recommendation',
  '/guides/activity-descriptions',
  '/guides/interview-prep',
  '/guides/program-selection',
  '/guides/specialties',
  '/auth/signin',
  '/auth/signup',
  '/privacy',
  '/terms'
];

async function authenticateGoogle() {
  try {
    // Check for service account key file - use the existing one from .env.local
    const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                       path.join(process.cwd(), 'indexing-api-key.json');
    
    if (!fs.existsSync(keyFilePath)) {
      console.error('❌ Service account key file not found at:', keyFilePath);
      console.log('\nTo use the Google Indexing API:');
      console.log('1. Go to Google Cloud Console');
      console.log('2. Create a service account');
      console.log('3. Download the JSON key file');
      console.log('4. Save it as "indexing-api-key.json" in the project root');
      console.log('5. Add the service account email to Search Console as an owner');
      process.exit(1);
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/indexing']
    });

    return auth.getClient();
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    process.exit(1);
  }
}

async function requestIndexing(auth, urls) {
  const indexing = google.indexing({
    version: 'v3',
    auth
  });

  const results = {
    success: [],
    failed: []
  };

  for (const url of urls) {
    try {
      const response = await indexing.urlNotifications.publish({
        requestBody: {
          url: `${SITE_URL}${url}`,
          type: 'URL_UPDATED'
        }
      });

      console.log(`✅ Requested indexing for: ${url}`);
      results.success.push(url);

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Failed to request indexing for ${url}:`, error.message);
      results.failed.push({ url, error: error.message });
    }
  }

  return results;
}

async function fetchSitemapUrls() {
  // Since the deployed sitemap is still wrong, return all ACTUAL pages
  const actualPages = [
    '/',
    '/pricing',
    '/guides',
    '/timeline',
    '/blog',
    '/about',
    '/guides/personal-statement',
    '/guides/letters-of-recommendation',
    '/guides/activity-descriptions',
    '/guides/interview-prep',
    '/guides/program-selection',
    '/guides/specialties',
    '/services/personal-statement',
    '/services/experiences',
    '/services/letters',
    '/auth/signin',
    '/auth/signup',
    '/privacy',
    '/terms',
    '/dashboard',
    '/dashboard/new',
    '/dashboard/applications',
    '/dashboard/billing',
    '/dashboard/reviews',
    '/dashboard/profile',
    '/payment/success',
    '/payment/cancel'
  ];
  
  // Also fetch blog posts from the database dynamically
  try {
    const response = await fetch(`${SITE_URL}/sitemap.xml`);
    const text = await response.text();
    
    // Extract only blog URLs from sitemap (they're real)
    const blogMatches = text.match(/<loc>https:\/\/www\.myerasediting\.com\/blog\/[^<]+<\/loc>/g);
    if (blogMatches) {
      const blogUrls = blogMatches
        .map(match => match.replace(/<\/?loc>/g, ''))
        .map(url => url.replace(SITE_URL, ''));
      
      // Combine static pages with blog posts
      return [...new Set([...actualPages, ...blogUrls])];
    }
  } catch (error) {
    console.error('⚠️ Could not fetch blog posts from sitemap:', error.message);
  }
  
  return actualPages;
}

async function main() {
  console.log('🚀 Google Indexing Request Tool');
  console.log('================================\n');

  // Authenticate
  console.log('📋 Authenticating with Google...');
  const auth = await authenticateGoogle();
  console.log('✅ Authentication successful\n');

  // Get URLs to index
  let urlsToIndex = PRIORITY_PAGES;

  // Check if we should index all pages
  const args = process.argv.slice(2);
  if (args.includes('--all')) {
    console.log('📥 Fetching all URLs from sitemap...');
    const sitemapUrls = await fetchSitemapUrls();
    
    if (sitemapUrls.length > 0) {
      // Combine priority pages with sitemap URLs (priority first, no duplicates)
      const allUrls = [...new Set([...PRIORITY_PAGES, ...sitemapUrls])];
      urlsToIndex = allUrls;
      console.log(`✅ Found ${urlsToIndex.length} unique URLs to index\n`);
    }
  } else {
    console.log(`📝 Indexing ${urlsToIndex.length} priority pages\n`);
  }

  // Process URLs in batches
  const batches = [];
  for (let i = 0; i < urlsToIndex.length; i += BATCH_SIZE) {
    batches.push(urlsToIndex.slice(i, i + BATCH_SIZE));
  }

  console.log(`📦 Processing ${batches.length} batch(es)...\n`);

  let totalSuccess = 0;
  let totalFailed = 0;

  for (let i = 0; i < batches.length; i++) {
    console.log(`\n🔄 Processing batch ${i + 1}/${batches.length}`);
    const results = await requestIndexing(auth, batches[i]);
    
    totalSuccess += results.success.length;
    totalFailed += results.failed.length;

    if (i < batches.length - 1) {
      console.log(`⏳ Waiting before next batch...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Indexing Request Summary:');
  console.log(`✅ Successfully requested: ${totalSuccess} pages`);
  console.log(`❌ Failed requests: ${totalFailed} pages`);
  
  if (totalSuccess > 0) {
    console.log('\n💡 Next steps:');
    console.log('1. Check Google Search Console in 24-48 hours');
    console.log('2. Use URL Inspection tool for specific pages');
    console.log('3. Monitor indexing status with: npm run check:indexing');
  }
}

// Run the script
main().catch(console.error);