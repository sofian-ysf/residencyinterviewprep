#!/usr/bin/env node

/**
 * Search Engine Ping Script
 * Notifies search engines about your sitemap updates
 * No API key required - uses public ping endpoints
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://www.myerasediting.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// Search engine ping endpoints
const PING_ENDPOINTS = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET',
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET',
  },
  {
    name: 'Bing (IndexNow)',
    url: 'https://www.bing.com/indexnow',
    method: 'POST',
    requiresKey: true, // IndexNow requires an API key
  },
  {
    name: 'Yandex',
    url: `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET',
  },
  {
    name: 'Seznam',
    url: `https://search.seznam.cz/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET',
  },
  {
    name: 'Naver',
    url: `https://apis.naver.com/crawl/nsyndi/v2?ping_url=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET',
  },
];

// Additional sitemap URLs if you have multiple
const ADDITIONAL_SITEMAPS = [
  `${SITE_URL}/sitemap-blog.xml`,
  `${SITE_URL}/sitemap-guides.xml`,
  `${SITE_URL}/sitemap-specialties.xml`,
];

// Make HTTP/HTTPS request
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: {
        'User-Agent': 'MyERAS Sitemap Pinger/1.0',
      },
    };
    
    if (data && method === 'POST') {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }
    
    const req = protocol.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseData,
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    // Set timeout
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (data && method === 'POST') {
      req.write(data);
    }
    
    req.end();
  });
}

// Ping a single search engine
async function pingSearchEngine(endpoint, sitemapUrl = SITEMAP_URL) {
  try {
    // Skip endpoints that require special configuration
    if (endpoint.requiresKey) {
      return {
        name: endpoint.name,
        success: false,
        message: 'Requires API key configuration',
      };
    }
    
    // Replace sitemap URL in endpoint if needed
    let url = endpoint.url;
    if (sitemapUrl !== SITEMAP_URL) {
      url = url.replace(encodeURIComponent(SITEMAP_URL), encodeURIComponent(sitemapUrl));
    }
    
    console.log(`  Pinging ${endpoint.name}...`);
    const response = await makeRequest(url, endpoint.method);
    
    // Check if successful (2xx status code)
    const success = response.statusCode >= 200 && response.statusCode < 300;
    
    return {
      name: endpoint.name,
      success: success,
      statusCode: response.statusCode,
      message: success ? 'Successfully pinged' : `Failed with status ${response.statusCode}`,
    };
  } catch (error) {
    return {
      name: endpoint.name,
      success: false,
      error: error.message,
      message: `Error: ${error.message}`,
    };
  }
}

// Submit sitemap to Google Search Console via API (alternative method)
async function submitToGoogleSearchConsole(sitemapUrl) {
  // This requires OAuth2 authentication
  // For now, we'll use the simpler ping method above
  console.log('  Note: For advanced Google Search Console submission, use the trigger-indexing.js script');
}

// Check if sitemap is accessible
async function checkSitemapAccessibility(sitemapUrl) {
  try {
    console.log(`Checking sitemap accessibility: ${sitemapUrl}`);
    const response = await makeRequest(sitemapUrl);
    
    if (response.statusCode === 200) {
      // Basic validation that it's XML
      if (response.body.includes('<?xml') && response.body.includes('<urlset')) {
        console.log('✓ Sitemap is accessible and valid XML\n');
        return true;
      } else {
        console.log('⚠️  Sitemap is accessible but may not be valid XML\n');
        return true;
      }
    } else {
      console.log(`✗ Sitemap returned status ${response.statusCode}\n`);
      return false;
    }
  } catch (error) {
    console.log(`✗ Failed to access sitemap: ${error.message}\n`);
    return false;
  }
}

// Generate robots.txt content reminder
function generateRobotsTxtReminder() {
  console.log('\n📋 Robots.txt Configuration');
  console.log('='.repeat(50));
  console.log('Ensure your robots.txt includes:');
  console.log(`Sitemap: ${SITEMAP_URL}`);
  ADDITIONAL_SITEMAPS.forEach(sitemap => {
    console.log(`Sitemap: ${sitemap}`);
  });
  console.log('');
}

// Main execution
async function main() {
  console.log('🔔 Search Engine Ping Script');
  console.log('============================\n');
  
  const args = process.argv.slice(2);
  const includeAdditional = args.includes('--all');
  
  // Check main sitemap accessibility
  const isAccessible = await checkSitemapAccessibility(SITEMAP_URL);
  
  if (!isAccessible) {
    console.log('⚠️  Warning: Main sitemap may not be accessible. Continuing anyway...\n');
  }
  
  // Ping search engines for main sitemap
  console.log('Pinging search engines for main sitemap:');
  const results = [];
  
  for (const endpoint of PING_ENDPOINTS) {
    const result = await pingSearchEngine(endpoint);
    results.push(result);
    
    if (result.success) {
      console.log(`    ✓ ${result.name}: ${result.message}`);
    } else {
      console.log(`    ✗ ${result.name}: ${result.message}`);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Ping additional sitemaps if requested
  if (includeAdditional) {
    console.log('\nPinging search engines for additional sitemaps:');
    
    for (const sitemapUrl of ADDITIONAL_SITEMAPS) {
      console.log(`\nSitemap: ${sitemapUrl}`);
      const accessible = await checkSitemapAccessibility(sitemapUrl);
      
      if (accessible) {
        for (const endpoint of PING_ENDPOINTS.filter(e => !e.requiresKey)) {
          const result = await pingSearchEngine(endpoint, sitemapUrl);
          
          if (result.success) {
            console.log(`    ✓ ${result.name}: ${result.message}`);
          } else {
            console.log(`    ✗ ${result.name}: ${result.message}`);
          }
          
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('SUMMARY');
  console.log('='.repeat(50));
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`✓ Successfully pinged: ${successful} search engines`);
  console.log(`✗ Failed pings: ${failed}`);
  
  // Additional recommendations
  console.log('\n📌 Additional Recommendations:');
  console.log('1. Submit your sitemap directly in Google Search Console');
  console.log('2. Submit your sitemap directly in Bing Webmaster Tools');
  console.log('3. Consider implementing IndexNow for instant indexing');
  console.log('4. Use the trigger-indexing.js script for Google Indexing API');
  console.log('5. Monitor your indexing status regularly');
  
  // Robots.txt reminder
  generateRobotsTxtReminder();
  
  // Usage information
  if (!includeAdditional) {
    console.log('💡 Tip: Use --all flag to ping all sitemaps');
    console.log('   Example: npm run index:ping -- --all\n');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { pingSearchEngine, checkSitemapAccessibility };