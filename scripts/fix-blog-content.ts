import { prisma } from '../lib/prisma';

async function fixBlogContent() {
  console.log('Fixing blog posts with JSON content...\n');
  
  // Get all blog posts
  const posts = await prisma.blogPost.findMany();
  
  let fixed = 0;
  
  for (const post of posts) {
    // Check if content looks like JSON (starts with { and has "content" key)
    const trimmedContent = post.content.trim();
    if (trimmedContent.startsWith('{') && trimmedContent.includes('"content"')) {
      try {
        // Parse the JSON
        const blogData = JSON.parse(trimmedContent);
        
        // Update the post with parsed content
        await prisma.blogPost.update({
          where: { id: post.id },
          data: {
            content: blogData.content || post.content,
            metaDescription: blogData.metaDescription || null,
            faqSection: blogData.faqSection && blogData.faqSection.length > 0 ? blogData.faqSection : undefined,
          }
        });
        
        console.log(`✅ Fixed: ${post.title}`);
        fixed++;
      } catch (e) {
        console.log(`⚠️  Could not parse JSON for: ${post.title}`);
        console.error('Error:', e);
      }
    } else {
      console.log(`ℹ️  Skipping (not JSON): ${post.title}`);
    }
  }
  
  console.log(`\n✨ Fixed ${fixed} blog posts!`);
  
  // Show a sample of the fixed content
  if (fixed > 0) {
    const samplePost = await prisma.blogPost.findFirst({
      orderBy: { updatedAt: 'desc' }
    });
    
    if (samplePost) {
      console.log('\n📝 Sample fixed post:');
      console.log('Title:', samplePost.title);
      console.log('Meta Description:', samplePost.metaDescription ? samplePost.metaDescription.substring(0, 100) + '...' : 'None');
      console.log('FAQs:', samplePost.faqSection ? `${(samplePost.faqSection as any[]).length} questions` : 'None');
      console.log('Content preview (HTML):', samplePost.content.substring(0, 200) + '...');
    }
  }
}

fixBlogContent().then(() => process.exit(0)).catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});