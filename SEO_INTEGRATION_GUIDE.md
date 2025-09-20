# SEO Integration Guide for ERAS Reviewer

## Overview
This guide explains how to integrate and activate all the new SEO enhancements that have been added to your ERAS Reviewer project.

## 1. Install Dependencies

First, install the new dependencies:

```bash
npm install
```

This will install all the new SEO-related packages added to package.json.

## 2. Environment Variables Setup

Add the following variables to your `.env.local` file:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Vercel Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Site URL (for absolute URLs)
NEXT_PUBLIC_SITE_URL=https://myerasreviewer.com
```

## 3. Update app/layout.tsx

Add the new components to your root layout:

```tsx
import WebVitalsReporter from '@/components/WebVitalsReporter'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Your existing layout */}
        {children}

        {/* Add these new components */}
        <WebVitalsReporter />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

## 4. Register Service Worker (PWA)

Add this to your app/layout.tsx or create a separate component:

```tsx
'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration)
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}
```

## 5. Using the OptimizedImage Component

Replace standard `<img>` tags or Next.js `<Image>` components with the new OptimizedImage:

```tsx
import OptimizedImage from '@/components/OptimizedImage'

// Usage example
<OptimizedImage
  src="/images/hero.jpg"
  alt="ERAS Review Service"
  width={1200}
  height={600}
  priority // for above-fold images
  fetchPriority="high"
  quality={90}
/>
```

## 6. Implement Schema Markup

Use the new schema components on relevant pages:

```tsx
import { CourseSchema, ReviewSchema, VideoSchema } from '@/components/schema/AdvancedSchemas'

// On a service page
<CourseSchema
  name="ERAS Personal Statement Review Course"
  description="Comprehensive review of your ERAS personal statement"
  provider="MyERAS Reviewer"
  url="https://myerasreviewer.com/services/personal-statement"
  offers={{
    price: "299",
    priceCurrency: "USD",
    availability: "InStock"
  }}
/>

// On testimonials page
<ReviewSchema
  itemReviewed={{
    type: "Service",
    name: "ERAS Application Review"
  }}
  reviews={testimonials}
  aggregateRating={{
    ratingValue: 4.9,
    reviewCount: 2847
  }}
/>
```

## 7. AIO Content Optimization

Use the AIO optimizer when generating or updating content:

```tsx
import { AIOContentOptimizer } from '@/lib/aio/content-optimizer'

// Optimize existing content
const result = AIOContentOptimizer.optimizeForAIO(
  blogContent,
  'ERAS personal statement'
)

// Check AIO readiness score
const score = AIOContentOptimizer.scoreAIOReadiness(content)
console.log(`AIO Score: ${score}/100`)
```

## 8. Track Custom Events

Use the analytics functions to track user interactions:

```tsx
import { trackERASEvent, trackFormSubmission } from '@/lib/analytics/gtag'

// Track service views
trackERASEvent.viewService('Personal Statement Review', 299)

// Track document uploads
trackERASEvent.submitDocument('personal_statement')

// Track form submissions
trackFormSubmission('consultation_form')
```

## 9. Performance Monitoring

Monitor custom metrics using the performance utilities:

```tsx
import { perfMonitor } from '@/lib/performance/web-vitals'

// Mark the start of an operation
perfMonitor.mark('review-load-start')

// ... perform operation ...

// Measure the duration
perfMonitor.measure('review-load-time', 'review-load-start')
```

## 10. Access New Routes

The following new routes are now available:

- **Image Sitemap**: `/image-sitemap.xml`
- **PWA Manifest**: `/manifest.json`
- **Service Worker**: `/sw.js`
- **Offline Page**: `/offline.html`

## 11. Testing the Implementation

### Test Core Web Vitals
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run a performance audit
4. Check Core Web Vitals scores

### Test PWA Installation
1. Open the site in Chrome
2. Look for install prompt in address bar
3. Install and test offline functionality

### Test Schema Markup
1. Use Google's Rich Results Test: https://search.google.com/test/rich-results
2. Enter your URL
3. Check for detected structured data

### Test AIO Optimization
1. Check content with AI tools
2. Verify voice search queries work
3. Test featured snippet eligibility

## 12. Monitoring & Maintenance

### Weekly Tasks
- Check Core Web Vitals in Google Search Console
- Review Google Analytics data
- Monitor page indexing status

### Monthly Tasks
- Update schema markup if needed
- Review and optimize slow-loading pages
- Check for new SEO opportunities

## 13. Environment-Specific Configuration

### Development
```env
NODE_ENV=development
NEXT_PUBLIC_GA_ID=UA-DEV-XXXXXX
```

### Production
```env
NODE_ENV=production
NEXT_PUBLIC_GA_ID=G-PROD-XXXXXX
```

## 14. Troubleshooting

### Service Worker Not Registering
- Check browser console for errors
- Ensure HTTPS is enabled (required for service workers)
- Clear browser cache and retry

### Analytics Not Tracking
- Verify GA_ID is set correctly
- Check for ad blockers
- Test in incognito mode

### Images Not Optimizing
- Ensure images are in public directory
- Check Next.js image configuration
- Verify image formats are supported

## 15. Best Practices

1. **Always use OptimizedImage for images** - Better performance and SEO
2. **Add schema markup to all service pages** - Improves rich snippets
3. **Monitor Core Web Vitals weekly** - Stay ahead of ranking changes
4. **Update content with AIO optimizer** - Future-proof for AI search
5. **Test on mobile devices** - Mobile-first indexing is critical

## Support

For questions or issues with the SEO implementation:
1. Check the browser console for errors
2. Review the Next.js documentation
3. Test in production environment
4. Monitor Google Search Console for issues

## Next Steps

1. Configure Google Search Console
2. Set up Bing Webmaster Tools
3. Create Google Analytics 4 property
4. Submit sitemaps to search engines
5. Monitor initial performance metrics
6. Schedule regular SEO audits