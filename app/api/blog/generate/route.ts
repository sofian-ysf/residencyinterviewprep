import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost, generateMultipleBlogPosts } from "@/lib/blog-generator";

// This endpoint should be protected in production
export async function POST(request: NextRequest) {
  try {
    // Check for API key in headers for security
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.BLOG_GENERATION_API_KEY && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { count = 1 } = body;
    
    if (count > 1) {
      const posts = await generateMultipleBlogPosts(count);
      return NextResponse.json({
        success: true,
        count: posts.length,
        posts,
      });
    } else {
      const post = await generateBlogPost();
      return NextResponse.json({
        success: true,
        post,
      });
    }
  } catch (error) {
    console.error('Error in blog generation API:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}