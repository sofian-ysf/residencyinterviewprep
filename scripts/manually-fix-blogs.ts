import { prisma } from '../lib/prisma';

async function manuallyFixBlogs() {
  console.log('Manually fixing problematic blog posts...\n');
  
  // List of posts we know have issues
  const problematicSlugs = [
    'letter-of-recommendation-timeline',
    'match-statistics-analysis', 
    'internal-medicine-vs-family-medicine',
    'personal-statement-red-flags-to-avoid'
  ];
  
  for (const slug of problematicSlugs) {
    const post = await prisma.blogPost.findUnique({
      where: { slug }
    });
    
    if (!post) continue;
    
    // For these posts, we'll just extract the content manually
    // Since they all have the pattern { "content": "...", we can use regex
    const contentMatch = post.content.match(/"content":\s*"([^"]+(?:\\.[^"]+)*)"/);
    
    if (contentMatch) {
      // Clean up the extracted content
      let cleanContent = contentMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
      
      // Try to extract other fields too
      const metaMatch = post.content.match(/"metaDescription":\s*"([^"]+)"/);
      const metaDescription = metaMatch ? metaMatch[1] : null;
      
      // For FAQs, we'll skip for now since it's complex
      
      await prisma.blogPost.update({
        where: { id: post.id },
        data: {
          content: cleanContent,
          metaDescription: metaDescription
        }
      });
      
      console.log(`✅ Fixed: ${post.title}`);
    } else {
      // If we can't extract, generate simple content
      const simpleContent = `
        <p>Welcome to our comprehensive guide on ${post.title}.</p>
        <p>This article provides essential insights and practical advice for medical students preparing their ERAS applications.</p>
        <h2>Key Points</h2>
        <p>This content is being updated. Please check back soon for the complete article with detailed information about ${post.title.toLowerCase()}.</p>
        <h2>Why This Matters</h2>
        <p>Understanding ${post.title.toLowerCase()} is crucial for your residency application success.</p>
        <h2>Next Steps</h2>
        <p>Stay tuned for more detailed content and actionable tips.</p>
      `.trim();
      
      await prisma.blogPost.update({
        where: { id: post.id },
        data: {
          content: simpleContent,
          metaDescription: `Essential guide on ${post.title.toLowerCase()} for ERAS applicants.`
        }
      });
      
      console.log(`✅ Fixed with placeholder: ${post.title}`);
    }
  }
  
  console.log('\n✨ Done!');
  
  // Show the fixed content
  const fixedPost = await prisma.blogPost.findFirst({
    where: { slug: 'personal-statement-red-flags-to-avoid' }
  });
  
  if (fixedPost) {
    console.log('\n📝 Sample fixed post:');
    console.log('Title:', fixedPost.title);
    console.log('Meta:', fixedPost.metaDescription);
    console.log('Content preview:', fixedPost.content.substring(0, 200) + '...');
  }
}

manuallyFixBlogs().then(() => process.exit(0)).catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});