import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { submitToGoogleIndexing } from '@/lib/seo/google-indexing';
import { updateSitemap } from '@/lib/seo/sitemap-updater';
import { pingSearchEngines } from '@/lib/seo/search-engine-ping';
import { postToSocialMedia } from '@/lib/social/auto-post';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authorized
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { blogPostId, slug, title, url } = body;

    if (!blogPostId || !slug || !title || !url) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`Starting SEO automation for: ${title}`);

    const results = {
      googleIndexing: false,
      sitemapUpdate: false,
      searchEnginePing: false,
      socialMedia: false,
      errors: [] as string[],
    };

    // 1. Submit to Google Indexing API
    try {
      await submitToGoogleIndexing(url);
      results.googleIndexing = true;
      console.log(`✓ Google Indexing submitted for: ${url}`);
    } catch (error) {
      console.error('Google Indexing failed:', error);
      results.errors.push(`Google Indexing: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // 2. Update sitemap
    try {
      await updateSitemap();
      results.sitemapUpdate = true;
      console.log('✓ Sitemap updated');
    } catch (error) {
      console.error('Sitemap update failed:', error);
      results.errors.push(`Sitemap: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // 3. Ping search engines
    try {
      await pingSearchEngines();
      results.searchEnginePing = true;
      console.log('✓ Search engines pinged');
    } catch (error) {
      console.error('Search engine ping failed:', error);
      results.errors.push(`Search Engine Ping: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // 4. Post to social media (if configured)
    if (process.env.TWITTER_API_KEY || process.env.LINKEDIN_ACCESS_TOKEN) {
      try {
        await postToSocialMedia({
          title,
          url,
          type: 'blog',
        });
        results.socialMedia = true;
        console.log('✓ Posted to social media');
      } catch (error) {
        console.error('Social media posting failed:', error);
        results.errors.push(`Social Media: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `SEO automation completed for: ${title}`,
      results,
    });
  } catch (error) {
    console.error('SEO automation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'SEO automation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}