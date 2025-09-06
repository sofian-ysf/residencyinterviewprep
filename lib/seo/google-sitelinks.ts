// Google Sitelinks and Search Appearance Configuration
// This helps Google understand your site structure for proper sitelinks display

export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://myerasreviewer.com/#website",
  "url": "https://myerasreviewer.com",
  "name": "MyERAS Reviewer",
  "alternateName": ["MyERAS Editing", "ERAS Review Service", "ERAS Application Review"],
  "description": "Expert ERAS application review service. Personal statements, CV optimization, and comprehensive residency application preparation by physicians who matched successfully.",
  "publisher": {
    "@type": "Organization",
    "name": "MyERAS Reviewer",
    "@id": "https://myerasreviewer.com/#organization"
  },
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://myerasreviewer.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  ],
  "inLanguage": "en-US",
  "copyrightHolder": {
    "@id": "https://myerasreviewer.com/#organization"
  },
  "headline": "MyERAS Reviewer - Expert ERAS Application Review Service",
  "sameAs": [
    "https://www.facebook.com/myerasreviewer",
    "https://twitter.com/myerasreviewer",
    "https://www.linkedin.com/company/myerasreviewer",
    "https://www.instagram.com/myerasreviewer"
  ]
};

// Sitelinks Search Box Schema
export const sitelinksSearchBoxSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://myerasreviewer.com",
  "name": "MyERAS Reviewer",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://myerasreviewer.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Navigation Elements Schema for Sitelinks
export const navigationElementsSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "@id": "https://myerasreviewer.com/#navigation",
  "name": "Main Navigation",
  "url": "https://myerasreviewer.com",
  "hasPart": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Personal Statement Review",
      "description": "Expert review and editing of your ERAS personal statement by successful physicians",
      "url": "https://myerasreviewer.com/services/personal-statement"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Experience Descriptions",
      "description": "Optimize all 15 ERAS experience descriptions for maximum impact",
      "url": "https://myerasreviewer.com/services/experiences"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Letters of Recommendation",
      "description": "Review and improve your recommendation letters to avoid red flags",
      "url": "https://myerasreviewer.com/services/letters"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Pricing",
      "description": "Affordable ERAS review packages starting at $149",
      "url": "https://myerasreviewer.com/pricing"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": "Application Timeline",
      "description": "Complete ERAS timeline with all important dates and deadlines",
      "url": "https://myerasreviewer.com/timeline"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 6,
      "name": "Guides & Resources",
      "description": "Free ERAS application guides and residency match resources",
      "url": "https://myerasreviewer.com/guides"
    }
  ]
};

// Brand Knowledge Graph
export const brandKnowledgeGraphSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://myerasreviewer.com/#organization",
  "name": "MyERAS Reviewer",
  "legalName": "MyERAS Reviewer LLC",
  "alternateName": ["MyERAS Editing", "MyERAS Review Service"],
  "url": "https://myerasreviewer.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://myerasreviewer.com/logo2.png",
    "width": 512,
    "height": 512,
    "caption": "MyERAS Reviewer Logo"
  },
  "image": "https://myerasreviewer.com/og-image.png",
  "description": "MyERAS Reviewer provides expert ERAS application review services by physicians who successfully matched into competitive residency programs. We specialize in personal statement editing, CV optimization, and comprehensive application review.",
  "email": "support@myerasreviewer.com",
  "telephone": "+1-800-ERAS-HELP",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Medical Plaza",
    "addressLocality": "Boston",
    "addressRegion": "MA",
    "postalCode": "02115",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.facebook.com/myerasreviewer",
    "https://twitter.com/myerasreviewer",
    "https://www.linkedin.com/company/myerasreviewer",
    "https://www.instagram.com/myerasreviewer",
    "https://www.youtube.com/@myerasreviewer"
  ],
  "foundingDate": "2020",
  "founders": [
    {
      "@type": "Person",
      "name": "Dr. John Smith",
      "jobTitle": "Founder & Chief Medical Officer"
    }
  ],
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "award": [
    "Best ERAS Review Service 2024",
    "Top Medical Education Company"
  ],
  "knowsAbout": [
    "ERAS Application",
    "Residency Match",
    "Personal Statement Writing",
    "Medical Education",
    "NRMP Match",
    "Medical School",
    "USMLE",
    "Clinical Rotations"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "ERAS Review Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Personal Statement Review"
      },
      {
        "@type": "Offer",
        "name": "Experience Descriptions"
      },
      {
        "@type": "Offer",
        "name": "Letters of Recommendation Review"
      }
    ]
  }
};

// Helper function to generate all sitelink schemas
export const generateSitelinkSchemas = () => {
  return [
    siteNavigationSchema,
    sitelinksSearchBoxSchema,
    navigationElementsSchema,
    brandKnowledgeGraphSchema
  ];
};