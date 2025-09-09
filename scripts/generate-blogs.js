#!/usr/bin/env node

/**
 * Manual blog generation script
 * Usage: node scripts/generate-blogs.js [number-of-blogs]
 */

const numberOfBlogs = parseInt(process.argv[2]) || 1;

async function generateBlogs() {
  console.log(`🚀 Generating ${numberOfBlogs} blog post(s)...`);
  
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const cronSecret = process.env.CRON_SECRET || 'development-secret';
  
  const results = [];
  
  for (let i = 0; i < numberOfBlogs; i++) {
    try {
      console.log(`\n📝 Generating blog ${i + 1}/${numberOfBlogs}...`);
      
      const response = await fetch(`${baseUrl}/api/cron/blog`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cronSecret}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ Blog ${i + 1} generated: ${data.message}`);
        results.push({ success: true, ...data });
      } else {
        console.log(`⚠️ Blog ${i + 1} skipped: ${data.message}`);
        results.push({ success: false, ...data });
      }
      
      // Add delay between generations to avoid rate limiting
      if (i < numberOfBlogs - 1) {
        console.log('⏳ Waiting 3 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(`❌ Error generating blog ${i + 1}:`, error.message);
      results.push({ success: false, error: error.message });
    }
  }
  
  // Summary
  console.log('\n📊 Generation Summary:');
  console.log(`Total attempted: ${numberOfBlogs}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed/Skipped: ${results.filter(r => !r.success).length}`);
  
  if (results.some(r => r.success)) {
    console.log('\n🎉 Blog posts generated successfully!');
    console.log('Visit your blog page to see the new content.');
  }
}

// Run the script
generateBlogs().catch(console.error);