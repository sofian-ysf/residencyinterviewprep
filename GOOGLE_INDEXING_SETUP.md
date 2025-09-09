# Google Indexing Setup Guide

This guide will help you set up the Google Indexing API to instantly notify Google about new or updated pages on your website.

## Quick Start (Immediate Actions)

### 1. **Ping Search Engines Now** (No setup required!)
```bash
# Ping all search engines about your sitemap
npm run index:ping

# Ping all sitemaps to all search engines
npm run index:ping:all
```

### 2. **Check Current Indexing Status**
```bash
# Quick check of core pages
npm run index:check:quick

# Full check of all pages
npm run index:check
```

## Google Indexing API Setup (For Instant Indexing)

The Google Indexing API allows you to instantly notify Google when pages are added or updated, resulting in much faster indexing than waiting for normal crawling.

### Prerequisites

1. **Google Cloud Console Account**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable the Indexing API**
   - In Google Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Indexing API"
   - Click on it and press "Enable"

3. **Create a Service Account**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name it (e.g., "indexing-api-service")
   - Click "Create and Continue"
   - Select role: "Owner" or "Editor"
   - Click "Done"

4. **Download Service Account Key**
   - Click on your newly created service account
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Download and save the file securely (e.g., `indexing-api-key.json`)

5. **Add Service Account to Search Console**
   - Copy the service account email (looks like: `xxx@your-project.iam.gserviceaccount.com`)
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Select your property (website)
   - Go to Settings > Users and permissions
   - Click "Add user"
   - Paste the service account email
   - Set permission to "Owner"
   - Click "Add"

### Installation

1. **Install Google APIs Package**
```bash
npm install googleapis
```

2. **Set Environment Variable**
```bash
# Add to your .env file or export in terminal
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/indexing-api-key.json"

# Example:
export GOOGLE_APPLICATION_CREDENTIALS="~/Desktop/ERAS/eras-reviewer/indexing-api-key.json"
```

3. **Test the Setup**
```bash
# Submit all sitemap URLs to Google
npm run index:submit

# Submit a specific URL
npm run index:submit https://www.myerasediting.com/blog/your-new-post

# Check indexing status of a URL
npm run index:status https://www.myerasediting.com/pricing
```

## Available Commands

### Immediate Actions (No API Key Required)
- `npm run index:ping` - Ping Google, Bing, and other search engines about your sitemap
- `npm run index:ping:all` - Ping all search engines about all your sitemaps
- `npm run index:check` - Check if your pages are accessible and indexed
- `npm run index:check:quick` - Quick check of core pages only

### Google Indexing API (Requires Setup)
- `npm run index:submit` - Submit all sitemap URLs to Google Indexing API
- `npm run index:submit <url>` - Submit a specific URL
- `npm run index:status <url>` - Check indexing status of a specific URL

## Alternative Methods (No API Required)

### 1. Google Search Console Manual Submission
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Use the "URL Inspection" tool
3. Enter your URL
4. Click "Request Indexing"

### 2. Sitemap Submission
1. Go to Google Search Console
2. Navigate to "Sitemaps" in the sidebar
3. Enter: `sitemap.xml`
4. Click "Submit"

### 3. Fetch as Google (Now URL Inspection)
1. Use the URL Inspection tool in Search Console
2. Click "Request Indexing" for important pages
3. Google will prioritize crawling these pages

## Best Practices

1. **Submit Important Pages First**
   - Homepage
   - Main service/product pages
   - Recently updated content

2. **Don't Over-Submit**
   - Google has quotas for the Indexing API
   - Only submit genuinely new or significantly updated content

3. **Monitor Your Progress**
   - Check Google Search Console regularly
   - Use `npm run index:check` to monitor indexing status
   - Look at "Coverage" report in Search Console

4. **Ensure Quality**
   - Make sure pages are fully loaded before submission
   - Check that meta tags are properly set
   - Verify no "noindex" tags on pages you want indexed

## Troubleshooting

### "GOOGLE_APPLICATION_CREDENTIALS not set"
- Make sure you've exported the environment variable
- Check the path to your JSON key file is correct

### "Permission denied" errors
- Verify the service account email is added to Search Console
- Ensure it has "Owner" permissions
- Wait a few minutes for permissions to propagate

### Pages not getting indexed
- Check robots.txt isn't blocking the pages
- Ensure pages don't have "noindex" meta tags
- Verify pages return 200 status code
- Check for canonical tags pointing elsewhere

## Quick Wins for Faster Indexing

1. **Immediate: Ping search engines**
   ```bash
   npm run index:ping:all
   ```

2. **Today: Submit sitemap in Search Console**
   - Go to Search Console > Sitemaps
   - Submit: `sitemap.xml`

3. **This Week: Set up Google Indexing API**
   - Follow the setup guide above
   - Submit all your important URLs

4. **Ongoing: Create quality backlinks**
   - Share on social media
   - Get other sites to link to you
   - This naturally speeds up discovery

## Additional Resources

- [Google Indexing API Documentation](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
- [Google Search Console Help](https://support.google.com/webmasters)
- [IndexNow Protocol](https://www.indexnow.org/) - For instant Bing indexing
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

## Support

If you encounter issues:
1. Check the error messages in console output
2. Verify all setup steps were completed
3. Check Google Search Console for any site issues
4. Review the scripts in `/scripts/` directory for detailed comments