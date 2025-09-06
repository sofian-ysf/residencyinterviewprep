import { Metadata } from "next";

// SEO Keywords Database
export const keywords = {
  primary: [
    "ERAS application review",
    "residency personal statement editing",
    "ERAS CV review",
    "residency application help",
    "ERAS application service",
    "medical residency application",
    "ERAS personal statement",
    "residency match consulting",
    "ERAS application editing",
    "residency application review"
  ],
  secondary: [
    "IMG ERAS application",
    "USMLE personal statement",
    "residency interview prep",
    "NRMP match",
    "medical school to residency",
    "ERAS timeline",
    "residency application timeline",
    "ERAS application tips",
    "residency match rate",
    "ERAS application checklist"
  ],
  longtail: [
    "best ERAS application review service 2025",
    "ERAS personal statement review by physicians",
    "how to write ERAS personal statement",
    "ERAS application review for international medical graduates",
    "residency application review service reddit",
    "ERAS CV format for residency",
    "personal statement editing for IMG",
    "ERAS application review cost",
    "physician ERAS application reviewer",
    "ERAS application review turnaround time"
  ],
  specialties: [
    "internal medicine residency application",
    "surgery residency personal statement",
    "pediatrics ERAS application",
    "emergency medicine residency application",
    "radiology personal statement",
    "anesthesiology residency application",
    "family medicine ERAS",
    "psychiatry residency personal statement",
    "OB/GYN residency application",
    "pathology ERAS application"
  ]
};

// Base SEO configuration
export const siteConfig = {
  name: "MyERAS Editing",
  title: "Expert ERAS Application Review Service | Match Into Your Dream Residency",
  titleTemplate: "%s | MyERAS Editing",
  description: "Professional ERAS application review by physicians who matched successfully. 95% match rate, 5.2x more interviews. Personal statements, CV optimization, and comprehensive residency application preparation.",
  url: process.env.NEXT_PUBLIC_URL || "https://www.myerasediting.com",
  ogImage: "https://www.myerasediting.com/og-image.png",
  twitterImage: "https://www.myerasediting.com/twitter-image.png",
  locale: "en_US",
  author: "MyERAS Editing Team",
  twitterHandle: "@myerasreviewer",
  themeColor: "#000000",
  backgroundColor: "#ffffff"
};

// Generate page-specific metadata
export function generateMetadata(page: {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}): Metadata {
  const title = `${page.title} | MyERAS Editing - ERAS Application Review Service`;
  const url = `${siteConfig.url}${page.path}`;
  const image = page.image || siteConfig.ogImage;
  
  const metadata: Metadata = {
    title,
    description: page.description,
    keywords: [
      ...keywords.primary.slice(0, 5),
      ...(page.keywords || []),
      "ERAS",
      "residency",
      "medical school",
      "match",
      "USMLE"
    ].join(", "),
    
    openGraph: {
      title,
      description: page.description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${page.title} - MyERAS Editing`
        }
      ],
      locale: siteConfig.locale,
      type: page.type || "website",
      ...(page.publishedTime && { publishedTime: page.publishedTime }),
      ...(page.modifiedTime && { modifiedTime: page.modifiedTime }),
      ...(page.author && { authors: [page.author] }),
      ...(page.section && { section: page.section }),
      ...(page.tags && { tags: page.tags })
    },
    
    twitter: {
      card: "summary_large_image",
      title: page.title.length > 60 ? `${page.title.substring(0, 57)}...` : page.title,
      description: page.description.length > 120 ? `${page.description.substring(0, 117)}...` : page.description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: [image]
    },
    
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'es': `${siteConfig.url}/es${page.path}`,
        'zh': `${siteConfig.url}/zh${page.path}`
      }
    },
    
    robots: page.noindex ? {
      index: false,
      follow: false
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    
    category: "Medical Education",
    
    other: {
      "fb:app_id": process.env.NEXT_PUBLIC_FB_APP_ID || "",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "format-detection": "telephone=no",
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#000000",
      "msapplication-tap-highlight": "no",
      "apple-mobile-web-app-title": "MyERAS",
      "application-name": "MyERAS Editing",
      "msapplication-tooltip": "Expert ERAS Application Review",
      "og:locale:alternate": ["es_ES", "zh_CN", "hi_IN", "ar_AE"],
      "article:publisher": "https://www.facebook.com/myerasreviewer",
      "og:rich_attachment": "true"
    }
  };
  
  return metadata;
}

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: "Expert ERAS Application Review Service - 95% Match Rate",
    description: "Get your ERAS application reviewed by physicians who successfully matched. Personal statement editing, CV optimization, and comprehensive residency application help. 5.2x more interviews guaranteed.",
    keywords: [...keywords.primary, ...keywords.secondary.slice(0, 5)]
  },
  
  pricing: {
    title: "ERAS Review Pricing - Affordable Packages Starting at $149",
    description: "Compare ERAS application review packages. From essential personal statement editing to comprehensive application optimization. 24-48 hour turnaround. Physician reviewers only.",
    keywords: ["ERAS review pricing", "ERAS application cost", "residency application review packages", "personal statement editing cost"]
  },
  
  about: {
    title: "About MyERAS Editing - Physician-Led Review Team",
    description: "Learn about our team of successfully matched physicians helping medical students optimize their ERAS applications. 10,000+ applications reviewed with 95% match rate.",
    keywords: ["about ERAS reviewer", "physician application reviewers", "medical residency consultants", "ERAS experts"]
  },
  
  blog: {
    title: "ERAS Application Blog - Tips, Guides & Match Strategies",
    description: "Expert insights on ERAS applications, personal statements, interview prep, and match strategies. Written by physicians who successfully matched into competitive programs.",
    keywords: ["ERAS blog", "residency application tips", "personal statement guide", "match strategy", "ERAS timeline"]
  },
  
  guides: {
    title: "Complete ERAS Application Guide 2025 - Step by Step",
    description: "Comprehensive guides for ERAS application, personal statements, CV formatting, and specialty-specific tips. Free resources from successful residents.",
    keywords: ["ERAS guide", "how to apply ERAS", "residency application guide", "ERAS step by step", "ERAS checklist"]
  },
  
  timeline: {
    title: "ERAS Timeline 2025-2026 - Important Dates & Deadlines",
    description: "Complete ERAS application timeline with all important dates, deadlines, and milestones. Never miss a deadline with our comprehensive residency application calendar.",
    keywords: ["ERAS timeline", "ERAS dates 2025", "residency application deadlines", "NRMP timeline", "match calendar"]
  },
  
  specialties: {
    internal: {
      title: "Internal Medicine ERAS Application Review",
      description: "Specialized ERAS review for internal medicine applicants. Tailored personal statement editing and CV optimization for IM residency programs.",
      keywords: ["internal medicine ERAS", "IM personal statement", "internal medicine residency application"]
    },
    surgery: {
      title: "Surgery Residency Application Review - ERAS Optimization",
      description: "Expert review for surgery residency applications. Stand out in competitive surgical programs with optimized personal statements and research descriptions.",
      keywords: ["surgery ERAS", "surgical residency application", "surgery personal statement"]
    },
    pediatrics: {
      title: "Pediatrics ERAS Application Review Service",
      description: "Specialized review for pediatrics residency applications. Highlight your passion for child health with expert personal statement and application optimization.",
      keywords: ["pediatrics ERAS", "pediatric residency application", "pediatrics personal statement"]
    }
  }
};

// Rich snippet data for different page types
export const richSnippets = {
  service: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ERAS Application Review",
    "priceRange": "$149-$799",
    "telephone": "+1-800-ERAS-HELP",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  },
  
  product: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ERAS Application Review Service",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847"
    }
  }
};

// Generate hreflang tags
export function generateHreflangTags(path: string) {
  const languages = ['en', 'es', 'zh', 'hi', 'ar'];
  const baseUrl = siteConfig.url;
  
  return languages.map(lang => ({
    rel: 'alternate',
    hreflang: lang,
    href: lang === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${lang}${path}`
  }));
}

// Generate Open Graph article tags for blog posts
export function generateArticleTags(post: {
  publishedTime: Date;
  modifiedTime?: Date;
  author: string;
  section: string;
  tags: string[];
}) {
  return {
    'article:published_time': post.publishedTime.toISOString(),
    'article:modified_time': (post.modifiedTime || post.publishedTime).toISOString(),
    'article:author': post.author,
    'article:section': post.section,
    'article:tag': post.tags.join(',')
  };
}