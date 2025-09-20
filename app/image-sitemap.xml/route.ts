import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

interface ImageInfo {
  loc: string
  caption?: string
  title?: string
  geoLocation?: string
  license?: string
}

interface PageImages {
  url: string
  images: ImageInfo[]
}

async function getImagesFromPublicDirectory(): Promise<string[]> {
  const publicDir = path.join(process.cwd(), 'public')
  const images: string[] = []

  async function scanDirectory(dir: string) {
    try {
      const files = await fs.readdir(dir)

      for (const file of files) {
        const filePath = path.join(dir, file)
        const stat = await fs.stat(filePath)

        if (stat.isDirectory() && !file.startsWith('.')) {
          await scanDirectory(filePath)
        } else if (stat.isFile()) {
          const ext = path.extname(file).toLowerCase()
          if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
            const relativePath = filePath.replace(publicDir, '').replace(/\\/g, '/')
            images.push(relativePath)
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error)
    }
  }

  await scanDirectory(publicDir)
  return images
}

function getServiceImages(): PageImages[] {
  const baseUrl = 'https://myerasreviewer.com'

  return [
    {
      url: `${baseUrl}/services/personal-statement`,
      images: [
        {
          loc: `${baseUrl}/images/personal-statement-review.jpg`,
          caption: 'Professional ERAS personal statement review service',
          title: 'Personal Statement Review'
        },
        {
          loc: `${baseUrl}/images/writing-tips.jpg`,
          caption: 'Expert tips for writing compelling personal statements',
          title: 'Personal Statement Writing Tips'
        }
      ]
    },
    {
      url: `${baseUrl}/services/cv-review`,
      images: [
        {
          loc: `${baseUrl}/images/cv-optimization.jpg`,
          caption: 'ERAS CV optimization and formatting service',
          title: 'CV Review Service'
        },
        {
          loc: `${baseUrl}/images/cv-template.jpg`,
          caption: 'Professional ERAS CV template and examples',
          title: 'ERAS CV Template'
        }
      ]
    },
    {
      url: `${baseUrl}/services/experiences`,
      images: [
        {
          loc: `${baseUrl}/images/experience-descriptions.jpg`,
          caption: 'ERAS experience descriptions writing service',
          title: 'Experience Descriptions'
        },
        {
          loc: `${baseUrl}/images/meaningful-experiences.jpg`,
          caption: 'Crafting meaningful ERAS experiences',
          title: 'Meaningful Experiences Guide'
        }
      ]
    },
    {
      url: `${baseUrl}/services/letters`,
      images: [
        {
          loc: `${baseUrl}/images/lor-review.jpg`,
          caption: 'Letter of recommendation review and guidance',
          title: 'LOR Review Service'
        }
      ]
    },
    {
      url: `${baseUrl}/about`,
      images: [
        {
          loc: `${baseUrl}/images/team.jpg`,
          caption: 'MyERAS Reviewer expert physician team',
          title: 'Our Team'
        },
        {
          loc: `${baseUrl}/images/success-stories.jpg`,
          caption: 'Success stories from matched residents',
          title: 'Success Stories'
        }
      ]
    },
    {
      url: `${baseUrl}/blog`,
      images: [
        {
          loc: `${baseUrl}/images/blog-header.jpg`,
          caption: 'ERAS application tips and residency match advice',
          title: 'ERAS Blog'
        }
      ]
    }
  ]
}

function generateImageSitemap(pageImages: PageImages[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pageImages
  .map(page => `  <url>
    <loc>${page.url}</loc>
${page.images
  .map(image => `    <image:image>
      <image:loc>${image.loc}</image:loc>
${image.caption ? `      <image:caption>${escapeXml(image.caption)}</image:caption>` : ''}
${image.title ? `      <image:title>${escapeXml(image.title)}</image:title>` : ''}
${image.geoLocation ? `      <image:geo_location>${escapeXml(image.geoLocation)}</image:geo_location>` : ''}
${image.license ? `      <image:license>${escapeXml(image.license)}</image:license>` : ''}
    </image:image>`)
  .join('\n')}
  </url>`)
  .join('\n')}
</urlset>`

  return xml
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  try {
    // Get service page images
    const serviceImages = getServiceImages()

    // Get all images from public directory
    const publicImages = await getImagesFromPublicDirectory()
    const baseUrl = 'https://myerasreviewer.com'

    // Add homepage and other important pages
    const additionalPages: PageImages[] = [
      {
        url: baseUrl,
        images: publicImages
          .filter(img => img.includes('hero') || img.includes('banner') || img.includes('logo'))
          .slice(0, 5)
          .map(img => ({
            loc: `${baseUrl}${img}`,
            title: 'MyERAS Reviewer',
            caption: 'Expert ERAS application review service'
          }))
      },
      {
        url: `${baseUrl}/testimonials`,
        images: [
          {
            loc: `${baseUrl}/images/testimonials-hero.jpg`,
            caption: 'Success stories from matched residents',
            title: 'Testimonials'
          }
        ]
      },
      {
        url: `${baseUrl}/pricing`,
        images: [
          {
            loc: `${baseUrl}/images/pricing-packages.jpg`,
            caption: 'ERAS review service pricing and packages',
            title: 'Pricing Packages'
          }
        ]
      },
      {
        url: `${baseUrl}/contact`,
        images: [
          {
            loc: `${baseUrl}/images/contact-us.jpg`,
            caption: 'Contact MyERAS Reviewer team',
            title: 'Contact Us'
          }
        ]
      }
    ]

    // Combine all page images
    const allPageImages = [...serviceImages, ...additionalPages]

    // Generate the XML sitemap
    const sitemap = generateImageSitemap(allPageImages)

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating image sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}