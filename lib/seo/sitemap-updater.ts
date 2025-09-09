import { prisma } from '@/lib/prisma';

export async function updateSitemap() {
  try {
    // Force Next.js to regenerate the sitemap on next request
    // This happens automatically when sitemap.ts is called
    
    // Optionally, we can warm up the sitemap cache
    const sitemapUrl = `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`;
    
    const response = await fetch(sitemapUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'MyERAS-Sitemap-Updater',
      },
    });

    if (response.ok) {
      console.log('Sitemap cache warmed up successfully');
      return { success: true };
    } else {
      console.warn(`Sitemap warm-up returned status: ${response.status}`);
      return { success: true }; // Still consider it successful
    }
  } catch (error) {
    console.error('Error updating sitemap:', error);
    // Don't throw - sitemap will still update on next request
    return { success: true };
  }
}