import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ReadingProgress from '@/components/ReadingProgress';
import CategorySVG, { colorPalettes } from '@/components/blog/CategorySVG';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './article.css';

export const revalidate = 3600; // Revalidate every hour

async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    
    if (!post) {
      return null;
    }
    
    // Increment view count
    await prisma.blogPost.update({
      where: { slug },
      data: { views: post.views + 1 },
    });
    
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | MyERAS Reviewer`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author || 'MyERAS Reviewer'],
      siteName: 'MyERAS Reviewer',
      images: [
        {
          url: post.featuredImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage || '/og-image.jpg'],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        slug: true,
      },
      take: 100,
    });
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    APPLICATION_TIPS: 'Application Tips',
    PERSONAL_STATEMENT: 'Personal Statement',
    INTERVIEW_PREP: 'Interview Prep',
    SPECIALTY_GUIDES: 'Specialty Guides',
    TIMELINE_PLANNING: 'Timeline Planning',
    PROGRAM_SELECTION: 'Program Selection',
    MATCH_STRATEGY: 'Match Strategy',
    SUCCESS_STORIES: 'Success Stories',
  };
  return labels[category] || category;
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author || 'MyERAS Reviewer Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyERAS Reviewer',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${slug}`,
    },
  };

  return (
    <div className="article-page">
      <Navbar />
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header>
          <h1>{post.title}</h1>
          <div className="meta-info">
            <span>By {post.author || 'MyERAS Reviewer Team'}</span>
            <span>•</span>
            <time dateTime={post.publishedAt.toISOString()}>
              {post.publishedAt.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </>
            )}
          </div>
          <div className="categories">
            <span className="category-tag">
              {getCategoryLabel(post.category)}
            </span>
          </div>
        </header>
        
        {/* Article Hero Graphic */}
        <div className="article-hero-graphic">
          <CategorySVG 
            category={post.category}
            index={Object.keys(post).length % colorPalettes.length}
          />
        </div>
        
        <div 
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {post.faqSection && post.faqSection.length > 0 && (
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            {(post.faqSection as any[]).map((faq: any, index: number) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
        
        <footer>
          <div className="footer-content">
            <Link href="/blog" className="back-to-articles">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Articles
            </Link>
          </div>
        </footer>
      </article>
      <Footer />
    </div>
  );
}