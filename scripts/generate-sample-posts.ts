import dotenv from 'dotenv';
import path from 'path';
import { generateMultipleBlogPosts } from '../lib/blog-generator';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
  console.log('Starting blog post generation...');
  console.log('ANTHROPIC_API_KEY exists:', !!process.env.ANTHROPIC_API_KEY);
  
  try {
    const posts = await generateMultipleBlogPosts(5);
    console.log(`Successfully generated ${posts.length} blog posts!`);
    
    posts.forEach(post => {
      console.log(`- ${post.title}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error generating blog posts:', error);
    process.exit(1);
  }
}

main();