import { prisma } from '../lib/prisma';

async function checkContent() {
  const post = await prisma.blogPost.findFirst({
    where: { slug: 'personal-statement-red-flags-to-avoid' }
  });
  
  if (post) {
    console.log('Content type check:');
    console.log('Starts with {:', post.content.substring(0, 1) === '{');
    console.log('First 1000 chars:');
    console.log(post.content.substring(0, 1000));
  }
}

checkContent().then(() => process.exit(0));