#!/usr/bin/env node

/**
 * Script to fix blog posts that have JSON content instead of HTML
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixBlogContent() {
  try {
    console.log('🔍 Finding blog posts with JSON content...');
    
    // Get all blog posts
    const posts = await prisma.blogPost.findMany();
    
    let fixedCount = 0;
    
    for (const post of posts) {
      // Check if content starts with JSON
      if (post.content && post.content.trim().startsWith('{')) {
        console.log(`\n📝 Fixing blog post: ${post.title}`);
        
        try {
          // Remove literal \n from the JSON string before parsing
          const cleanedContent = post.content.replace(/\\n/g, ' ').replace(/\n/g, ' ');
          
          // Parse the JSON content
          const jsonData = JSON.parse(cleanedContent);
          
          // Check if we have nested JSON
          let htmlContent = '';
          if (jsonData.content && typeof jsonData.content === 'string') {
            // Check if content is another JSON
            if (jsonData.content.trim().startsWith('<')) {
              // It's HTML
              htmlContent = jsonData.content;
            } else {
              // It might be text or nested JSON, just use it as is
              htmlContent = jsonData.content;
            }
          }
          
          // Clean up the HTML content - replace literal \n with actual line breaks
          htmlContent = htmlContent.replace(/\\n/g, '\n');
          
          // Update the blog post with clean HTML content
          await prisma.blogPost.update({
            where: { id: post.id },
            data: {
              content: htmlContent.trim(),
              metaDescription: jsonData.metaDescription || post.metaDescription,
              faqSection: jsonData.faqSection || post.faqSection,
            }
          });
          
          console.log(`✅ Fixed: ${post.title}`);
          fixedCount++;
        } catch (error) {
          console.error(`❌ Error fixing ${post.title}:`, error.message);
        }
      }
    }
    
    console.log(`\n✨ Fixed ${fixedCount} blog posts`);
    console.log(`📊 Total blog posts: ${posts.length}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
fixBlogContent().catch(console.error);