#!/usr/bin/env node

/**
 * Comprehensive indexing improvement script
 * Combines multiple strategies to accelerate Google indexing
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.myerasediting.com';

// High-priority pages for indexing
const PRIORITY_URLS = [
  '/',
  '/pricing',
  '/guides',
  '/timeline',
  '/blog',
  '/about',
  '/contact',
  '/specialties/internal-medicine',
  '/specialties/surgery',
  '/guides/personal-statement'
];

/**
 * 1. Ping Google with sitemap
 */
async function pingSitemap() {
  console.log('\n📍 Pinging Google with sitemap...');
  
  const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
  const pingUrl = `https://www.google.com/ping?sitemap=${sitemapUrl}`;
  
  return new Promise((resolve) => {
    https.get(pingUrl, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Successfully pinged Google with sitemap');
      } else {
        console.log(`⚠️ Google ping returned status: ${res.statusCode}`);
      }
      resolve();
    }).on('error', (err) => {
      console.error('❌ Failed to ping Google:', err.message);
      resolve();
    });
  });
}

/**
 * 2. Submit to Bing
 */
async function pingBing() {
  console.log('\n📍 Pinging Bing with sitemap...');
  
  const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
  const pingUrl = `https://www.bing.com/ping?sitemap=${sitemapUrl}`;
  
  return new Promise((resolve) => {
    https.get(pingUrl, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Successfully pinged Bing with sitemap');
      } else {
        console.log(`⚠️ Bing ping returned status: ${res.statusCode}`);
      }
      resolve();
    }).on('error', (err) => {
      console.error('❌ Failed to ping Bing:', err.message);
      resolve();
    });
  });
}

/**
 * 3. Generate RSS feed for recent content
 */
function generateRSSFeed() {
  console.log('\n📰 Generating RSS feed...');
  
  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MyERAS Editing - Medical Residency Application Guidance</title>
    <link>${SITE_URL}</link>
    <description>Expert ERAS application editing and medical residency matching guidance</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    
    ${PRIORITY_URLS.map(url => `
    <item>
      <title>${getPageTitle(url)}</title>
      <link>${SITE_URL}${url}</link>
      <description>${getPageDescription(url)}</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}${url}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

  const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(rssPath, rssContent);
  console.log('✅ RSS feed generated at public/rss.xml');
}

function getPageTitle(url) {
  const titles = {
    '/': 'Home - Expert ERAS Application Editing',
    '/pricing': 'Affordable ERAS Editing Services - Pricing',
    '/guides': 'Complete ERAS Application Guides',
    '/timeline': 'ERAS Timeline - Key Dates & Deadlines',
    '/blog': 'ERAS Tips & Medical Residency Blog',
    '/about': 'About MyERAS Editing - Expert Residency Advisors',
    '/contact': 'Contact Us - Get ERAS Application Help',
    '/specialties/internal-medicine': 'Internal Medicine Residency Application Guide',
    '/specialties/surgery': 'Surgery Residency Application Guide',
    '/guides/personal-statement': 'How to Write a Compelling Personal Statement'
  };
  return titles[url] || 'MyERAS Editing Page';
}

function getPageDescription(url) {
  const descriptions = {
    '/': 'Professional ERAS application editing services to help you match into your dream residency program',
    '/pricing': 'Transparent, affordable pricing for personal statement editing and complete ERAS application review',
    '/guides': 'Comprehensive guides covering every aspect of the ERAS application and residency matching process',
    '/timeline': 'Stay on track with important ERAS dates, deadlines, and milestones for the residency application cycle',
    '/blog': 'Expert insights, tips, and strategies for medical residency applications and the Match',
    '/about': 'Meet our team of experienced residency advisors and learn about our mission to help medical students',
    '/contact': 'Get in touch with our ERAS editing experts for personalized application assistance',
    '/specialties/internal-medicine': 'Complete guide to applying for internal medicine residency programs through ERAS',
    '/specialties/surgery': 'Essential tips and strategies for surgery residency applications',
    '/guides/personal-statement': 'Step-by-step guide to writing a standout ERAS personal statement'
  };
  return descriptions[url] || 'Expert guidance for your ERAS application and residency match';
}

/**
 * 4. Create URL submission list for manual submission
 */
function createManualSubmissionList() {
  console.log('\n📝 Creating manual submission list...');
  
  const submissionGuide = `
MANUAL INDEXING STEPS
=====================

1. Google Search Console - Request Indexing:
   - Go to: https://search.google.com/search-console
   - Use URL Inspection tool
   - Submit these priority URLs one by one:
${PRIORITY_URLS.map(url => `     ${SITE_URL}${url}`).join('\n')}

2. Bing Webmaster Tools:
   - Go to: https://www.bing.com/webmasters
   - Submit URLs via URL Submission tool
   - Can submit up to 10,000 URLs per day

3. Submit to IndexNow (Bing, Yandex):
   - API endpoint: https://api.indexnow.org/indexnow
   - Requires API key (generate at: https://www.indexnow.org)

4. Social Signals (helps with discovery):
   - Share homepage on Twitter/X
   - Post on LinkedIn
   - Submit to relevant Reddit communities
   - Share in medical student forums

5. Create Backlinks:
   - Submit to medical education directories
   - Guest post on medical student blogs
   - Add to university resource pages
   - List on residency preparation sites

MONITORING TIPS
===============
- Check indexing status daily in Search Console
- Use site:myerasediting.com in Google to see indexed pages
- Monitor organic traffic in Google Analytics
- Set up Search Console email alerts

EXPECTED TIMELINE
=================
- Discovery: 1-3 days (already done)
- Crawling: 3-7 days
- Indexing: 7-21 days
- Ranking: 21-90 days
`;

  const guidePath = path.join(process.cwd(), 'INDEXING_GUIDE.md');
  fs.writeFileSync(guidePath, submissionGuide);
  console.log('✅ Manual submission guide created at INDEXING_GUIDE.md');
}

/**
 * 5. Check current indexing status
 */
async function checkIndexingStatus() {
  console.log('\n🔍 Checking current indexing status...');
  console.log('Run: npm run check:indexing');
  console.log('Or manually search: site:myerasediting.com in Google');
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Indexing Improvement Tool');
  console.log('============================');
  
  // Execute all strategies
  await pingSitemap();
  await pingBing();
  generateRSSFeed();
  createManualSubmissionList();
  await checkIndexingStatus();
  
  console.log('\n✨ Indexing improvement tasks completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Read INDEXING_GUIDE.md for manual submission steps');
  console.log('2. Submit priority pages via Search Console URL Inspection');
  console.log('3. Share your site on social media for faster discovery');
  console.log('4. Check indexing status in 24-48 hours');
  console.log('\n💡 Pro tip: Google Indexing API requires setup but provides fastest results');
  console.log('   Run: node scripts/request-indexing.js (requires Google service account)');
}

// Execute
main().catch(console.error);