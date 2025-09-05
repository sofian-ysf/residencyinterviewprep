import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/blog-generator";
import { headers } from "next/headers";

// This route will be called by Vercel Cron or external cron service
export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = headers().get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Generate a single blog post
    const post = await generateBlogPost();
    
    if (post) {
      console.log(`Cron job: Successfully generated blog post - ${post.title}`);
      return NextResponse.json({
        success: true,
        message: `Generated blog post: ${post.title}`,
        postId: post.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Blog post already exists or generation skipped',
      });
    }
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate blog post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggering
export async function POST(request: NextRequest) {
  return GET(request);
}