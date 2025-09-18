import Script from 'next/script';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  provider?: string;
  serviceType: string;
  offers?: {
    price: string | number;
    priceCurrency?: string;
  };
  areaServed?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  image?: string;
}

export default function ServiceSchema({
  serviceName,
  description,
  provider = "MyERAS Editing",
  serviceType,
  offers,
  areaServed = "United States",
  aggregateRating,
  image
}: ServiceSchemaProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceType,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://www.myerasediting.com",
      "logo": "https://www.myerasediting.com/logo2.png",
      "sameAs": [
        "https://www.facebook.com/myerasediting",
        "https://twitter.com/myerasediting",
        "https://www.linkedin.com/company/myerasediting"
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    ...(offers && {
      "offers": {
        "@type": "Offer",
        "price": offers.price,
        "priceCurrency": offers.priceCurrency || "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      }
    }),
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount,
        "bestRating": "5"
      }
    }),
    ...(image && {
      "image": image
    })
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema)
      }}
    />
  );
}

// Service List Schema for multiple services
interface ServiceListSchemaProps {
  services: Array<{
    name: string;
    description: string;
    url: string;
    price?: string | number;
  }>;
}

export function ServiceListSchema({ services }: ServiceListSchemaProps) {
  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "url": service.url,
        "provider": {
          "@type": "Organization",
          "name": "MyERAS Editing"
        },
        ...(service.price && {
          "offers": {
            "@type": "Offer",
            "price": service.price,
            "priceCurrency": "USD"
          }
        })
      }
    }))
  };

  return (
    <Script
      id="service-list-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceListSchema)
      }}
    />
  );
}

// Professional Service Schema with more details
export function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "MyERAS Editing",
    "description": "Expert ERAS application review service by physicians who matched successfully",
    "url": "https://www.myerasediting.com",
    "telephone": "+1-800-ERAS-HELP",
    "email": "support@myerasediting.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "priceRange": "$149 - $799",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ERAS Application Review Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Personal Statement Review",
            "description": "Comprehensive review and editing of ERAS personal statement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CV/Resume Review",
            "description": "Professional formatting and optimization of medical CV"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Experience Descriptions",
            "description": "Crafting impactful ERAS experience descriptions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Letters of Recommendation Review",
            "description": "Review and optimization of recommendation letters"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847",
      "bestRating": "5"
    }
  };

  return (
    <Script
      id="professional-service-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}