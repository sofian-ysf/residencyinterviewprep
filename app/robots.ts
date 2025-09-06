import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://myerasreviewer.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/auth/reset-password',
          '/auth/verify-email',
          '/*.json$',
          '/*?*sort=',
          '/*?*filter=',
          '/*?*page=',
          '/checkout/',
          '/cart/',
          '/account/',
          '/_next/',
          '/tmp/',
          '/private/'
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/checkout/',
          '/cart/',
          '/account/'
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/*.jpg$',
          '/*.jpeg$',
          '/*.gif$',
          '/*.png$',
          '/*.webp$'
        ],
        disallow: [
          '/dashboard/',
          '/admin/',
          '/private/'
        ]
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/checkout/',
          '/cart/',
          '/account/'
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/'
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/'
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/'
        ]
      },
      {
        userAgent: 'AhrefsBot',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'SemrushBot',
        allow: '/',
        crawlDelay: 10,
      },
      // Block bad bots
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
      {
        userAgent: 'Megaindex.ru',
        disallow: '/',
      },
      {
        userAgent: 'SerpstatBot',
        disallow: '/',
      }
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-blog.xml`,
      `${baseUrl}/sitemap-guides.xml`,
      `${baseUrl}/sitemap-specialties.xml`
    ],
    host: baseUrl,
  };
}