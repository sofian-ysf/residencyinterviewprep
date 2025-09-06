import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Image optimization
  images: {
    domains: ['myerasreviewer.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      },
      // Cache static assets
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.myerasreviewer.com'
          }
        ],
        destination: 'https://myerasreviewer.com/:path*',
        permanent: true
      },
      // Common misspellings and variations
      {
        source: '/era-application',
        destination: '/eras-application',
        permanent: true
      },
      {
        source: '/eras-review',
        destination: '/',
        permanent: true
      },
      {
        source: '/personal-statement',
        destination: '/guides/personal-statement',
        permanent: true
      },
      {
        source: '/services',
        destination: '/pricing',
        permanent: true
      },
      {
        source: '/packages',
        destination: '/pricing',
        permanent: true
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true
      }
    ];
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      // Specialty pages
      {
        source: '/specialty/:specialty',
        destination: '/api/specialty/:specialty'
      },
      // Blog categories
      {
        source: '/blog/category/:category',
        destination: '/blog?category=:category'
      },
      // Search
      {
        source: '/search',
        destination: '/api/search'
      }
    ];
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'https://www.myerasediting.com',
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    NEXT_PUBLIC_FB_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
    NEXT_PUBLIC_HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID,
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize chunks
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2
          },
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/
          }
        }
      };
    }
    
    return config;
  },
  
  // Enable React strict mode for better debugging
  reactStrictMode: true,
  
  // Trailing slash configuration
  trailingSlash: false,
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Generate ETags for caching
  generateEtags: true,
  
  // Compress responses
  compress: true,
};

export default nextConfig;