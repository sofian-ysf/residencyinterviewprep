import { prisma } from '../lib/prisma';

async function checkBlogs() {
  const posts = await prisma.blogPost.findMany({
    select: {
      title: true, 
      slug: true,
      author: true,
      metaDescription: true,
      faqSection: true
    },
    orderBy: { createdAt: 'desc' },
    take: 4
  });
  
  console.log('\n📚 Latest Blog Posts:\n');
  posts.forEach(p => {
    console.log('---');
    console.log('📝 Title:', p.title);
    console.log('🔗 Slug:', p.slug);
    console.log('👤 Author:', p.author || 'Not set');
    console.log('📄 Meta Description:', p.metaDescription ? p.metaDescription.substring(0, 60) + '...' : 'None');
    console.log('❓ FAQs:', p.faqSection ? `${(p.faqSection as any[]).length} questions` : 'None');
  });
  
  console.log('\n✅ Blog structure successfully updated!');
}

checkBlogs().then(() => process.exit(0));