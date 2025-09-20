import Script from 'next/script'

interface CourseSchemaProps {
  name: string
  description: string
  provider: string
  url: string
  courseCode?: string
  educationalLevel?: string
  duration?: string
  offers?: {
    price: string
    priceCurrency: string
    availability: string
  }
}

export function CourseSchema({
  name,
  description,
  provider,
  url,
  courseCode,
  educationalLevel,
  duration,
  offers
}: CourseSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    courseCode,
    educationalLevel: educationalLevel || 'Medical School',
    timeRequired: duration,
    provider: {
      '@type': 'Organization',
      name: provider,
      sameAs: 'https://myerasreviewer.com'
    },
    offers: offers ? {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: offers.availability,
      url
    } : undefined,
    educationalCredentialAwarded: 'ERAS Application Review Certificate'
  }

  return (
    <Script
      id="course-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface EventSchemaProps {
  name: string
  description: string
  startDate: string
  endDate: string
  location: {
    name: string
    address: string
  }
  image?: string
  offers?: {
    price: string
    priceCurrency: string
    availability: string
    url: string
  }
  performer?: string
  organizer: string
}

export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  offers,
  performer,
  organizer
}: EventSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate,
    image,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: location.name === 'Online' ? {
      '@type': 'VirtualLocation',
      url: 'https://myerasreviewer.com/webinar'
    } : {
      '@type': 'Place',
      name: location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.address
      }
    },
    offers: offers ? {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: offers.availability,
      url: offers.url,
      validFrom: startDate
    } : undefined,
    performer: performer ? {
      '@type': 'Person',
      name: performer
    } : undefined,
    organizer: {
      '@type': 'Organization',
      name: organizer,
      url: 'https://myerasreviewer.com'
    }
  }

  return (
    <Script
      id="event-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ReviewSchemaProps {
  itemReviewed: {
    type: string
    name: string
  }
  reviews: Array<{
    author: string
    datePublished: string
    reviewBody: string
    reviewRating: number
  }>
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

export function ReviewSchema({
  itemReviewed,
  reviews,
  aggregateRating
}: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name
    },
    review: reviews.map(r => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author
      },
      datePublished: r.datePublished,
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.reviewRating,
        bestRating: 5,
        worstRating: 1
      }
    })),
    aggregateRating: aggregateRating ? {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1
    } : undefined
  }

  return (
    <Script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface VideoSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
  contentUrl: string
  embedUrl?: string
  interactionCount?: number
}

export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  interactionCount = 0
}: VideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'WatchAction' },
      userInteractionCount: interactionCount
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyERAS Reviewer',
      logo: {
        '@type': 'ImageObject',
        url: 'https://myerasreviewer.com/logo2.png'
      }
    }
  }

  return (
    <Script
      id="video-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface HowToSchemaProps {
  name: string
  description: string
  image: string
  totalTime: string
  estimatedCost?: {
    value: string
    currency: string
  }
  supply?: string[]
  tool?: string[]
  steps: Array<{
    name: string
    text: string
    image?: string
    url?: string
  }>
}

export function HowToSchema({
  name,
  description,
  image,
  totalTime,
  estimatedCost,
  supply,
  tool,
  steps
}: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image,
    totalTime,
    estimatedCost: estimatedCost ? {
      '@type': 'MonetaryAmount',
      currency: estimatedCost.currency,
      value: estimatedCost.value
    } : undefined,
    supply: supply?.map(item => ({
      '@type': 'HowToSupply',
      name: item
    })),
    tool: tool?.map(item => ({
      '@type': 'HowToTool',
      name: item
    })),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
      position: index + 1
    }))
  }

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface MedicalScholarlyArticleProps {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified: string
  image?: string
  keywords: string[]
  medicalSpecialty: string
  educationalUse: string
}

export function MedicalScholarlyArticle({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  keywords,
  medicalSpecialty,
  educationalUse
}: MedicalScholarlyArticleProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalScholarlyArticle',
    headline,
    description,
    author: {
      '@type': 'Person',
      name: author,
      affiliation: {
        '@type': 'Organization',
        name: 'MyERAS Reviewer'
      }
    },
    datePublished,
    dateModified,
    image,
    keywords: keywords.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'MyERAS Reviewer',
      logo: {
        '@type': 'ImageObject',
        url: 'https://myerasreviewer.com/logo2.png'
      }
    },
    medicalSpecialty,
    educationalUse,
    audience: {
      '@type': 'MedicalAudience',
      audienceType: 'Medical Students and Residents'
    },
    about: {
      '@type': 'Thing',
      name: 'ERAS Application Process'
    }
  }

  return (
    <Script
      id="medical-article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}