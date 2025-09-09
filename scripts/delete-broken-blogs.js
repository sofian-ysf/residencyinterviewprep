#!/usr/bin/env node

/**
 * Script to delete blog posts that still have JSON content issues
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteBrokenBlogs() {
  try {
    console.log('🔍 Finding and deleting broken blog posts...');
    
    // List of blog titles that had JSON issues
    const brokenTitles = [
      'Supplemental ERAS Timeline',
      'Creating Your Program List',
      'Programs with Strong Mentorship'
    ];
    
    for (const title of brokenTitles) {
      try {
        const deleted = await prisma.blogPost.deleteMany({
          where: { title }
        });
        
        if (deleted.count > 0) {
          console.log(`✅ Deleted: ${title}`);
        } else {
          console.log(`⚠️ Not found: ${title}`);
        }
      } catch (error) {
        console.error(`❌ Error deleting ${title}:`, error.message);
      }
    }
    
    console.log('\n✨ Cleanup complete!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
deleteBrokenBlogs().catch(console.error);