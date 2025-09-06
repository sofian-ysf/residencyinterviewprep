import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

// Priority calculation based on page importance
const getPriority = (path: string): number => {
  if (path === '/') return 1.0;
  if (path.includes('/pricing')) return 0.95;
  if (path.includes('/guides')) return 0.9;
  if (path.includes('/timeline')) return 0.9;
  if (path.includes('/blog') && !path.includes('/blog/')) return 0.85;
  if (path.includes('/specialties')) return 0.85;
  if (path.includes('/about')) return 0.8;
  if (path.includes('/contact')) return 0.8;
  if (path.includes('/blog/')) return 0.7;
  if (path.includes('/auth/')) return 0.6;
  if (path.includes('/privacy') || path.includes('/terms')) return 0.3;
  return 0.5;
};

// Change frequency based on content type
const getChangeFrequency = (path: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' => {
  if (path === '/') return 'daily';
  if (path.includes('/blog') && !path.includes('/blog/')) return 'daily';
  if (path.includes('/pricing')) return 'weekly';
  if (path.includes('/guides')) return 'weekly';
  if (path.includes('/timeline')) return 'monthly';
  if (path.includes('/blog/')) return 'monthly';
  if (path.includes('/about')) return 'monthly';
  if (path.includes('/privacy') || path.includes('/terms')) return 'yearly';
  return 'weekly';
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://myerasreviewer.com';
  
  // Get all blog posts from database
  let blogPosts: MetadataRoute.Sitemap = [];
  
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
        featured: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });
    
    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: post.featured ? 'weekly' as const : 'monthly' as const,
      priority: post.featured ? 0.8 : 0.7,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(post.slug)}`],
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Core pages with high priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [`${baseUrl}/og-pricing.png`],
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/og-guides.png`],
    },
    {
      url: `${baseUrl}/timeline`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${baseUrl}/og-timeline.png`],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
      images: [`${baseUrl}/og-blog.png`],
    },
  ];

  // Specialty pages for SEO
  const specialties = [
    'internal-medicine',
    'surgery',
    'pediatrics',
    'emergency-medicine',
    'family-medicine',
    'psychiatry',
    'anesthesiology',
    'radiology',
    'pathology',
    'ob-gyn',
    'neurology',
    'dermatology',
    'ophthalmology',
    'orthopedic-surgery',
    'otolaryngology',
    'urology',
    'plastic-surgery',
    'physical-medicine',
    'radiation-oncology',
    'diagnostic-radiology'
  ];

  const specialtyPages: MetadataRoute.Sitemap = specialties.map((specialty) => ({
    url: `${baseUrl}/specialties/${specialty}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
    images: [`${baseUrl}/og-specialty-${specialty}.png`],
  }));

  // Guide subcategories
  const guideCategories = [
    'personal-statement',
    'cv-formatting',
    'eras-timeline',
    'interview-preparation',
    'letters-of-recommendation',
    'program-signals',
    'supplemental-eras',
    'img-guide',
    'couples-match',
    'research-experience',
    'clinical-experience',
    'volunteer-activities',
    'hobbies-interests',
    'red-flags',
    'gap-years'
  ];

  const guidePages: MetadataRoute.Sitemap = guideCategories.map((guide) => ({
    url: `${baseUrl}/guides/${guide}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
    images: [`${baseUrl}/og-guide-${guide}.png`],
  }));

  // Service/feature pages
  const servicePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services/personal-statement-review`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/cv-review`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/complete-application-review`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/interview-coaching`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Blog category pages
  const blogCategories = [
    'APPLICATION_TIPS',
    'PERSONAL_STATEMENT',
    'INTERVIEW_PREP',
    'SPECIALTY_GUIDES',
    'TIMELINE_PLANNING',
    'PROGRAM_SELECTION',
    'MATCH_STRATEGY',
    'SUCCESS_STORIES',
    'IMG_RESOURCES',
    'RESEARCH_TIPS',
    'CLINICAL_EXPERIENCE',
    'USMLE_SCORES',
    'RED_FLAGS',
    'COUPLES_MATCH',
    'SOAP_GUIDANCE'
  ];

  const categoryPages: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.toLowerCase().replace('_', '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // Location-based pages for local SEO
  const locations = [
    'new-york',
    'los-angeles',
    'chicago',
    'houston',
    'philadelphia',
    'boston',
    'san-francisco',
    'washington-dc',
    'miami',
    'atlanta'
  ];

  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/locations/${location}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Informational pages
  const infoPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/success-stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  // Auth pages (lower priority)
  const authPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.65,
    },
  ];

  // Legal pages (lowest priority)
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Combine all sitemaps
  return [
    ...corePages,
    ...specialtyPages,
    ...guidePages,
    ...servicePages,
    ...categoryPages,
    ...blogPosts,
    ...locationPages,
    ...infoPages,
    ...authPages,
    ...legalPages,
  ];
}

// Additional sitemap for blog posts only (for Google News)
export async function blogSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://myerasreviewer.com';
  
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        slug: true,
        title: true,
        updatedAt: true,
        publishedAt: true,
        category: true,
        tags: true,
      },
      where: {
        publishedAt: {
          gte: new Date(Date.now() - 48 * 60 * 60 * 1000), // Last 48 hours for news
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 1000, // Google News limit
    });
    
    return posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'hourly' as const,
      priority: 0.9,
      news: {
        publication: {
          name: 'MyERAS Reviewer Blog',
          language: 'en',
        },
        publicationDate: post.publishedAt.toISOString(),
        title: post.title,
        keywords: post.tags || '',
      },
    }));
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return [];
  }
}