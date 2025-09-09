#!/usr/bin/env node

/**
 * Deep fix for all blog posts with nested JSON content
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deepFixBlogs() {
  try {
    console.log('🔍 Deep fixing all blog posts...');
    
    const posts = await prisma.blogPost.findMany();
    let fixedCount = 0;
    let alreadyGood = 0;
    
    for (const post of posts) {
      // Skip if content is already clean HTML
      if (post.content && post.content.trim().startsWith('<')) {
        console.log(`✅ Already good: ${post.title}`);
        alreadyGood++;
        continue;
      }
      
      console.log(`\n📝 Processing: ${post.title}`);
      
      let cleanContent = post.content;
      let metaDesc = post.metaDescription;
      let faqs = post.faqSection;
      
      // Keep trying to extract HTML from nested JSON
      let attempts = 0;
      while (cleanContent && cleanContent.trim().startsWith('{') && attempts < 5) {
        attempts++;
        console.log(`  Attempt ${attempts}: Parsing JSON...`);
        
        try {
          // Clean up the content for parsing
          const jsonStr = cleanContent
            .replace(/\\n/g, ' ')  // Replace literal \n
            .replace(/\n(?!})/g, ' ')  // Replace newlines except before closing braces
            .replace(/\s+/g, ' ')  // Normalize whitespace
            .trim();
          
          const parsed = JSON.parse(jsonStr);
          
          // Extract the actual content
          if (parsed.content) {
            cleanContent = parsed.content;
            // Update metadata if available
            if (parsed.metaDescription && !metaDesc) {
              metaDesc = parsed.metaDescription;
            }
            if (parsed.faqSection && (!faqs || faqs.length === 0)) {
              faqs = parsed.faqSection;
            }
          } else {
            // No content field, might be the actual content
            break;
          }
        } catch (e) {
          console.log(`  Parse error: ${e.message}`);
          // If we can't parse it, assume it's the content
          break;
        }
      }
      
      // Final cleanup
      if (typeof cleanContent === 'object') {
        cleanContent = JSON.stringify(cleanContent);
      }
      
      // Ensure it's a string and clean it up
      cleanContent = String(cleanContent)
        .replace(/^["']|["']$/g, '')  // Remove quotes if wrapped
        .trim();
      
      // Only update if we have valid HTML content
      if (cleanContent && (cleanContent.includes('<') || cleanContent.includes('&lt;'))) {
        // Decode HTML entities if needed
        cleanContent = cleanContent
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&');
        
        await prisma.blogPost.update({
          where: { id: post.id },
          data: {
            content: cleanContent,
            metaDescription: metaDesc,
            faqSection: faqs,
          }
        });
        
        console.log(`  ✅ Fixed and saved`);
        fixedCount++;
      } else {
        console.log(`  ⚠️ Could not extract valid HTML content`);
      }
    }
    
    console.log('\n📊 Summary:');
    console.log(`  Total posts: ${posts.length}`);
    console.log(`  Already good: ${alreadyGood}`);
    console.log(`  Fixed: ${fixedCount}`);
    console.log(`  Failed: ${posts.length - alreadyGood - fixedCount}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
deepFixBlogs().catch(console.error);