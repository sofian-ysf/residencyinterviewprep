import { type NextWebVitalsMetric } from 'next/app'
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals'

interface VitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
  id: string
  navigationType?: string
}

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

function getConnectionSpeed(): string {
  const nav = navigator as any
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection
  return connection?.effectiveType || 'unknown'
}

export function sendToAnalytics(metric: VitalsMetric): void {
  const body = {
    dsn: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
  }

  if (process.env.NODE_ENV === 'production') {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })
    if (navigator.sendBeacon) {
      navigator.sendBeacon(vitalsUrl, blob)
    } else {
      fetch(vitalsUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      })
    }
  } else {
    console.log('[Web Vitals]', metric.name, metric.value, metric.rating)
  }
}

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; poor: number }> = {
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    FID: { good: 100, poor: 300 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
  }

  const threshold = thresholds[name]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  const rating = getRating(metric.name, metric.value)

  const vitalsMetric: VitalsMetric = {
    name: metric.name,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    rating,
    delta: (metric as any).delta || 0,
    id: metric.id,
    navigationType: (metric as any).navigationType || 'navigate',
  }

  switch (metric.name) {
    case 'FCP':
    case 'LCP':
    case 'CLS':
    case 'FID':
    case 'TTFB':
    case 'Next.js-route-change-to-render':
    case 'Next.js-render':
      sendToAnalytics(vitalsMetric)
      break
    default:
      break
  }
}

export function initWebVitals(): void {
  if (typeof window === 'undefined') return

  getCLS((metric) => {
    const rating = getRating('CLS', metric.value)
    sendToAnalytics({
      name: 'CLS',
      value: Math.round(metric.value * 1000),
      rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    })
  })

  getFCP((metric) => {
    const rating = getRating('FCP', metric.value)
    sendToAnalytics({
      name: 'FCP',
      value: Math.round(metric.value),
      rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    })
  })

  getFID((metric) => {
    const rating = getRating('FID', metric.value)
    sendToAnalytics({
      name: 'FID',
      value: Math.round(metric.value),
      rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    })
  })

  getLCP((metric) => {
    const rating = getRating('LCP', metric.value)
    sendToAnalytics({
      name: 'LCP',
      value: Math.round(metric.value),
      rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    })
  })

  getTTFB((metric) => {
    const rating = getRating('TTFB', metric.value)
    sendToAnalytics({
      name: 'TTFB',
      value: Math.round(metric.value),
      rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    })
  })
}

export function trackCustomMetric(name: string, value: number, unit: string = 'ms'): void {
  if (typeof window === 'undefined') return

  const metric: VitalsMetric = {
    name: `custom-${name}`,
    value: Math.round(value),
    rating: 'good',
    id: `${Date.now()}-${Math.random()}`,
  }

  sendToAnalytics(metric)

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Custom Metric] ${name}: ${value}${unit}`)
  }
}

export class PerformanceMonitor {
  private marks: Map<string, number> = new Map()

  mark(name: string): void {
    this.marks.set(name, performance.now())
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name)
    }
  }

  measure(name: string, startMark: string, endMark?: string): number {
    const start = this.marks.get(startMark)
    const end = endMark ? this.marks.get(endMark) : performance.now()

    if (!start) {
      console.warn(`Start mark "${startMark}" not found`)
      return 0
    }

    const duration = end ? end - start : performance.now() - start

    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.measure(name, startMark, endMark)
      } catch (e) {
        console.warn('Performance measure failed:', e)
      }
    }

    trackCustomMetric(name, duration)
    return duration
  }

  clearMarks(): void {
    this.marks.clear()
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.clearMarks()
    }
  }
}

export const perfMonitor = new PerformanceMonitor()