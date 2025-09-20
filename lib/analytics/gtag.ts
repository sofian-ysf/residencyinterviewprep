export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackOutboundLink = (url: string): void => {
  event({
    action: 'click',
    category: 'outbound',
    label: url,
  })
}

export const trackFileDownload = (fileName: string): void => {
  event({
    action: 'download',
    category: 'file',
    label: fileName,
  })
}

export const trackFormSubmission = (formName: string): void => {
  event({
    action: 'submit',
    category: 'form',
    label: formName,
  })
}

export const trackSearch = (searchTerm: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    })
  }
}

export const trackError = (error: string, fatal: boolean = false): void => {
  event({
    action: 'exception',
    category: 'error',
    label: error,
    value: fatal ? 1 : 0,
  })
}

export const trackTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      event_category: category,
      name: variable,
      value: Math.round(value),
      event_label: label,
    })
  }
}

export const trackScrollDepth = (percentage: number): void => {
  event({
    action: 'scroll',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  })
}

export const trackEngagement = (timeOnPage: number): void => {
  const engagementLevel =
    timeOnPage < 30
      ? 'low'
      : timeOnPage < 120
      ? 'medium'
      : timeOnPage < 300
      ? 'high'
      : 'very_high'

  event({
    action: 'engagement',
    category: 'user_engagement',
    label: engagementLevel,
    value: Math.round(timeOnPage),
  })
}

export const trackConversion = (
  conversionType: string,
  value?: number,
  currency: string = 'USD'
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_TRACKING_ID}/${conversionType}`,
      value: value,
      currency: currency,
    })
  }
}

export const setUserProperties = (properties: Record<string, any>): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', { user_properties: properties })
  }
}

export const trackEcommerce = ({
  event_name,
  value,
  currency = 'USD',
  items,
  transaction_id,
}: {
  event_name: 'purchase' | 'add_to_cart' | 'view_item' | 'begin_checkout'
  value?: number
  currency?: string
  items?: any[]
  transaction_id?: string
}): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event_name, {
      value,
      currency,
      items,
      transaction_id,
    })
  }
}

// ERAS-specific tracking events
export const trackERASEvent = {
  viewService: (serviceName: string, price?: number) => {
    trackEcommerce({
      event_name: 'view_item',
      value: price,
      items: [{ item_name: serviceName, item_category: 'ERAS Review Service' }],
    })
  },

  startCheckout: (packageName: string, price: number) => {
    trackEcommerce({
      event_name: 'begin_checkout',
      value: price,
      items: [{ item_name: packageName, item_category: 'ERAS Package' }],
    })
  },

  purchase: (packageName: string, price: number, transactionId: string) => {
    trackEcommerce({
      event_name: 'purchase',
      value: price,
      transaction_id: transactionId,
      items: [{ item_name: packageName, item_category: 'ERAS Package' }],
    })
  },

  submitDocument: (documentType: string) => {
    event({
      action: 'document_upload',
      category: 'eras_application',
      label: documentType,
    })
  },

  viewSample: (sampleType: string) => {
    event({
      action: 'view_sample',
      category: 'content',
      label: sampleType,
    })
  },

  consultationRequest: (consultationType: string) => {
    event({
      action: 'consultation_request',
      category: 'lead_generation',
      label: consultationType,
    })
  },
}