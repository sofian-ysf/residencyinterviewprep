#!/usr/bin/env node

/**
 * Indexing Status Checker
 * Checks if your pages are indexed in Google and other search engines
 * Uses multiple methods to verify indexing status
 */

const https = require('https');
const { URL } = require('url');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://www.myerasediting.com';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

// Core URLs to check
const CORE_URLS = [
  '/',
  '/pricing',
  '/guides',
  '/timeline',
  '/blog',
  '/about',
  '/contact',
];

// Get all URLs to check
function getAllUrls() {
  const urls = CORE_URLS.map(path => `${SITE_URL}${path}`);
  
  // Add specialty pages
  const specialties = [
    'internal-medicine', 'surgery', 'pediatrics', 'emergency-medicine',
    'family-medicine', 'psychiatry', 'anesthesiology', 'radiology',
  ];
  specialties.forEach(specialty => {
    urls.push(`${SITE_URL}/specialties/${specialty}`);
  });
  
  // Add guide pages
  const guides = [
    'personal-statement', 'cv-formatting', 'eras-timeline',
    'interview-preparation', 'letters-of-recommendation',
  ];
  guides.forEach(guide => {
    urls.push(`${SITE_URL}/guides/${guide}`);
  });
  
  return urls;
}

// Check if URL is indexed using site: search operator
async function checkGoogleIndexing(url) {
  return new Promise((resolve) => {
    // Using Google's site: operator through their search API
    // Note: This is a simplified check - for production, use Google Search Console API
    const searchQuery = `site:${url}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    
    const options = {
      hostname: 'www.google.com',
      path: `/search?q=${encodeURIComponent(searchQuery)}`,
      headers: {
        'User-Agent': USER_AGENT,
      },
    };
    
    https.get(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Check if the page appears in search results
        // This is a basic check - Google may block automated requests
        const isIndexed = data.includes(url) || data.includes('1 result') || data.includes('About');
        
        resolve({
          url,
          indexed: isIndexed,
          method: 'site_search',
          note: isIndexed ? 'Found in Google index' : 'Not found in Google index (may need manual verification)',
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        indexed: false,
        method: 'site_search',
        error: err.message,
      });
    });
  });
}

// Check URL using Google's cache
async function checkGoogleCache(url) {
  return new Promise((resolve) => {
    const cacheUrl = `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(url)}`;
    
    https.get(cacheUrl, (res) => {
      // If we get a 200 status, the page is likely cached (and thus indexed)
      const isCached = res.statusCode === 200;
      
      resolve({
        url,
        cached: isCached,
        statusCode: res.statusCode,
        method: 'google_cache',
        note: isCached ? 'Found in Google cache' : 'Not found in Google cache',
      });
    }).on('error', (err) => {
      resolve({
        url,
        cached: false,
        method: 'google_cache',
        error: err.message,
      });
    });
  });
}

// Check if URL returns proper status and has indexing meta tags
async function checkUrlAccessibility(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk.toString();
        // Only read first 10KB to check meta tags
        if (data.length > 10000) {
          res.destroy();
        }
      });
      
      res.on('end', () => {
        // Check for noindex meta tag
        const hasNoindex = data.includes('noindex') || data.includes('NOINDEX');
        const hasCanonical = data.includes('rel="canonical"') || data.includes("rel='canonical'");
        const hasRobotsMeta = data.includes('name="robots"') || data.includes("name='robots'");
        
        resolve({
          url,
          statusCode: res.statusCode,
          accessible: res.statusCode === 200,
          hasNoindex,
          hasCanonical,
          hasRobotsMeta,
          method: 'direct_check',
          note: hasNoindex ? '⚠️ Has noindex tag!' : 'Page is indexable',
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        accessible: false,
        method: 'direct_check',
        error: err.message,
      });
    });
  });
}

// Generate indexing report
async function generateReport(results) {
  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    siteUrl: SITE_URL,
    summary: {
      totalUrls: results.length,
      accessible: results.filter(r => r.accessible).length,
      likelyIndexed: results.filter(r => r.indexed || r.cached).length,
      hasNoindex: results.filter(r => r.hasNoindex).length,
    },
    results: results,
  };
  
  // Save to file
  const fileName = `indexing-status-${timestamp.split('T')[0]}.json`;
  const filePath = path.join(__dirname, fileName);
  await fs.writeFile(filePath, JSON.stringify(report, null, 2));
  
  return { report, filePath };
}

// Display results in console
function displayResults(results) {
  console.log('\n' + '='.repeat(60));
  console.log('INDEXING STATUS REPORT');
  console.log('='.repeat(60));
  
  // Group results by status
  const accessible = results.filter(r => r.accessible);
  const inaccessible = results.filter(r => !r.accessible);
  const noindex = results.filter(r => r.hasNoindex);
  
  console.log('\n✅ ACCESSIBLE PAGES:');
  accessible.forEach(r => {
    const indexStatus = r.indexed ? '🔍' : '❓';
    const cacheStatus = r.cached ? '📋' : '❌';
    const noindexWarning = r.hasNoindex ? ' ⚠️ NOINDEX' : '';
    console.log(`  ${indexStatus} ${cacheStatus} ${r.url}${noindexWarning}`);
  });
  
  if (inaccessible.length > 0) {
    console.log('\n❌ INACCESSIBLE PAGES:');
    inaccessible.forEach(r => {
      console.log(`  ✗ ${r.url} - ${r.error || `Status: ${r.statusCode}`}`);
    });
  }
  
  if (noindex.length > 0) {
    console.log('\n⚠️  PAGES WITH NOINDEX TAG:');
    noindex.forEach(r => {
      console.log(`  ${r.url}`);
    });
  }
  
  // Legend
  console.log('\n📖 LEGEND:');
  console.log('  🔍 = Likely indexed in Google');
  console.log('  ❓ = Indexing status unknown');
  console.log('  📋 = Found in Google cache');
  console.log('  ❌ = Not found in cache');
  console.log('  ⚠️  = Has noindex meta tag (won\'t be indexed)');
}

// Check with Google Search Console API (requires authentication)
async function checkSearchConsole(url) {
  // This would require OAuth2 setup
  console.log('  Note: For detailed Search Console data, use Google Search Console directly');
  return null;
}

// Main execution
async function main() {
  console.log('🔍 Indexing Status Checker');
  console.log('==========================\n');
  
  const args = process.argv.slice(2);
  const checkCache = !args.includes('--no-cache');
  const quickCheck = args.includes('--quick');
  
  // Get URLs to check
  const urls = quickCheck ? CORE_URLS.map(path => `${SITE_URL}${path}`) : getAllUrls();
  console.log(`Checking ${urls.length} URLs...\n`);
  
  const results = [];
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] Checking: ${url}`);
    
    // Check accessibility and meta tags
    const accessResult = await checkUrlAccessibility(url);
    
    // Combine results
    const result = { ...accessResult };
    
    // Only check cache if page is accessible and doesn't have noindex
    if (checkCache && accessResult.accessible && !accessResult.hasNoindex) {
      const cacheResult = await checkGoogleCache(url);
      result.cached = cacheResult.cached;
      
      // Note: Site search may trigger rate limiting, use sparingly
      // const indexResult = await checkGoogleIndexing(url);
      // result.indexed = indexResult.indexed;
    }
    
    results.push(result);
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Display results
  displayResults(results);
  
  // Generate report
  const { report, filePath } = await generateReport(results);
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total URLs checked: ${report.summary.totalUrls}`);
  console.log(`Accessible pages: ${report.summary.accessible}`);
  console.log(`Pages with noindex: ${report.summary.hasNoindex}`);
  console.log(`\nFull report saved to: ${filePath}`);
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  console.log('1. Check Google Search Console for accurate indexing data');
  console.log('2. Use URL Inspection tool in Search Console for specific pages');
  console.log('3. Submit sitemap if not already done');
  console.log('4. Fix any pages with noindex tags if they should be indexed');
  console.log('5. Ensure all important pages return 200 status code');
  
  if (!checkCache) {
    console.log('\n💡 Tip: Remove --no-cache flag to check Google cache status');
  }
  if (!quickCheck) {
    console.log('💡 Tip: Use --quick flag for faster checking of core pages only');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkGoogleIndexing, checkGoogleCache, checkUrlAccessibility };