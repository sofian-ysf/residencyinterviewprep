'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { perfMonitor } from '@/lib/performance/web-vitals'

interface OptimizedImageProps {
  src: string
  alt: string
  title?: string
  width?: number
  height?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  quality?: number
  className?: string
  containerClassName?: string
  aspectRatio?: number
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  sizes?: string
  onLoad?: () => void
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  caption?: string
  srcSet?: string[]
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0f0f0" offset="20%" />
      <stop stop-color="#e8e8e8" offset="50%" />
      <stop stop-color="#f0f0f0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0f0f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function OptimizedImage({
  src,
  alt,
  title,
  width,
  height,
  priority = false,
  loading,
  fetchPriority,
  quality = 85,
  className = '',
  containerClassName = '',
  aspectRatio,
  objectFit = 'cover',
  sizes,
  onLoad,
  placeholder = 'blur',
  blurDataURL,
  caption,
  srcSet = [],
}: OptimizedImageProps) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const loadStartTime = useRef<number>(0)

  const shouldUsePriority = priority || fetchPriority === 'high'
  const shouldLazyLoad = !shouldUsePriority && loading === 'lazy'

  useEffect(() => {
    if (!shouldLazyLoad || !containerRef.current) {
      setIsIntersecting(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [shouldLazyLoad])

  const handleLoadingStart = () => {
    loadStartTime.current = performance.now()
    perfMonitor.mark(`image-load-start-${src}`)
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
    if (loadStartTime.current > 0) {
      const loadTime = performance.now() - loadStartTime.current
      perfMonitor.measure(`image-load-${src}`, `image-load-start-${src}`)
    }
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  const fallbackSrc = error
    ? 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop'
    : src

  const dataBlur = blurDataURL || `data:image/svg+xml;base64,${toBase64(shimmer(width || 700, height || 475))}`

  const imageProps = {
    src: fallbackSrc,
    alt,
    title: title || alt,
    quality,
    className: `transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`,
    onLoadingComplete: handleLoadingComplete,
    onError: handleError,
    placeholder: placeholder as 'blur' | 'empty' | undefined,
    blurDataURL: placeholder === 'blur' ? dataBlur : undefined,
    priority: shouldUsePriority,
    loading: (shouldUsePriority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    sizes: defaultSizes,
    style: { objectFit },
  }

  const containerStyle = aspectRatio
    ? { aspectRatio, position: 'relative' as const }
    : width && height
    ? { position: 'relative' as const, width, height }
    : { position: 'relative' as const }

  if (!isIntersecting && shouldLazyLoad) {
    return (
      <div
        ref={containerRef}
        className={containerClassName}
        style={containerStyle}
      >
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      </div>
    )
  }

  handleLoadingStart()

  return (
    <figure className={containerClassName}>
      <div style={containerStyle}>
        {width && height ? (
          <Image
            {...imageProps}
            width={width}
            height={height}
            fetchPriority={fetchPriority}
          />
        ) : (
          <Image
            {...imageProps}
            fill
            fetchPriority={fetchPriority}
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-500 text-sm">Failed to load image</span>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function OptimizedBackgroundImage({
  src,
  alt,
  className = '',
  children,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
  priority?: boolean
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.src = src
    img.onload = () => setImageLoaded(true)

    if (priority) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    }
  }, [src, priority])

  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage: imageLoaded ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-label={alt}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {children}
    </div>
  )
}