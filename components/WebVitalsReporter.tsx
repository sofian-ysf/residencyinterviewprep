'use client'

import { useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'
import { initWebVitals, reportWebVitals } from '@/lib/performance/web-vitals'

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    reportWebVitals(metric)
  })

  useEffect(() => {
    initWebVitals()
  }, [])

  return null
}