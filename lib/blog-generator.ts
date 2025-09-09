import Anthropic from '@anthropic-ai/sdk';
import { prisma } from './prisma';
import slugify from 'slugify';
import { getUniqueRandomTopic, getTopicForTimeOfDay } from './blog-topics';

const getAnthropicClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
  }
  return new Anthropic({
    apiKey: apiKey,
  });
};

// SEO tracking
let lastPublishedHour = new Date().getHours();

export async function generateBlogPost() {
  try {
    // Get Anthropic client
    const anthropic = getAnthropicClient();
    
    // Select topic based on time of day for better engagement
    const currentHour = new Date().getHours();
    const topicData = getTopicForTimeOfDay(currentHour) || getUniqueRandomTopic();
    
    if (!topicData) {
      throw new Error('No available topics to generate blog post');
    }
    
    const { topic, category: categoryName, icon } = topicData;
    
    // Generate content using Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: `You are an expert medical educator and residency application advisor with deep knowledge of SEO and content marketing. Write a comprehensive, SEO-optimized blog post about: "${topic}"

The blog post should be targeted at medical students applying for residency through ERAS.

IMPORTANT SEO REQUIREMENTS:
- Include the main keyword "${topic}" in the first paragraph
- Use related keywords naturally throughout the content
- Include long-tail keyword variations
- Optimize for featured snippets with clear, concise answers
- Include current year (2025) where relevant
- Target specific search intents

IMPORTANT: Return ONLY a valid JSON object (not markdown code blocks) with this exact structure:
{
  "content": "HTML content of the main article (2000-2500 words)",
  "metaDescription": "A 150-160 character SEO description including the main keyword",
  "faqSection": [
    {
      "question": "Frequently asked question",
      "answer": "Detailed answer"
    }
  ],
  "relatedKeywords": ["keyword1", "keyword2", "keyword3"],
  "internalLinks": [
    {
      "text": "anchor text",
      "url": "/blog/suggested-related-article-slug"
    }
  ]
}

Do not include any text before or after the JSON object. The response should start with { and end with }

For the main content:
1. Start with an engaging introduction (2-3 paragraphs) that includes the main keyword
2. Include 5-7 main sections with clear, keyword-rich subheadings
3. Use bullet points and numbered lists for better readability and featured snippets
4. Include specific, actionable advice with current statistics and data
5. Add a "Quick Answer" section near the beginning for featured snippet optimization
6. Include tables or comparison charts where relevant
7. End with a conclusion that summarizes key points and includes a call-to-action

Write the content in HTML format with proper tags:
- Use <h2> for main section headings
- Use <h3> for subsection headings
- Use <p> for paragraphs
- Use <ul> and <li> for bullet points
- Use <ol> and <li> for numbered lists
- Use <strong> for emphasis
- Use <blockquote> for important quotes or tips

Include 5-8 relevant FAQs that address common "People Also Ask" questions about the topic.
Include 3-5 related keywords that the article targets.
Suggest 2-3 internal links to related articles.

Make the content informative, practical, and engaging. Include specific examples and real scenarios that medical students face during the residency application process.`
        }
      ]
    });
    
    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';
    
    // Debug: Log first 200 chars of response
    console.log('AI Response preview:', responseText.substring(0, 200));
    
    let blogData;
    let content;
    let metaDescription;
    let faqSection;
    let relatedKeywords = [];
    let internalLinks = [];
    
    try {
      // Parse the JSON response
      blogData = JSON.parse(responseText);
      
      // Check if content is a string or needs further parsing
      if (typeof blogData.content === 'string') {
        // Check if the content string is actually JSON
        if (blogData.content.trim().startsWith('{')) {
          try {
            // Content is JSON, parse it again
            const nestedData = JSON.parse(blogData.content);
            content = nestedData.content || blogData.content;
            // Override metadata if available in nested JSON
            metaDescription = nestedData.metaDescription || blogData.metaDescription || null;
            faqSection = nestedData.faqSection || blogData.faqSection || [];
            relatedKeywords = nestedData.relatedKeywords || blogData.relatedKeywords || [];
            internalLinks = nestedData.internalLinks || blogData.internalLinks || [];
          } catch (nestedError) {
            // Content is regular HTML string
            content = blogData.content;
            metaDescription = blogData.metaDescription || null;
            faqSection = blogData.faqSection || [];
            relatedKeywords = blogData.relatedKeywords || [];
            internalLinks = blogData.internalLinks || [];
          }
        } else {
          // Content is regular HTML string
          content = blogData.content;
          metaDescription = blogData.metaDescription || null;
          faqSection = blogData.faqSection || [];
          relatedKeywords = blogData.relatedKeywords || [];
          internalLinks = blogData.internalLinks || [];
        }
      } else {
        // Content is not a string, something's wrong
        content = JSON.stringify(blogData.content);
        metaDescription = blogData.metaDescription || null;
        faqSection = blogData.faqSection || [];
        relatedKeywords = blogData.relatedKeywords || [];
        internalLinks = blogData.internalLinks || [];
      }
      
      // Clean up the content - remove any leading/trailing whitespace
      content = content.trim();
      
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', e);
      // Fallback if response is not JSON - assume it's raw HTML content
      content = responseText;
      metaDescription = null;
      faqSection = [];
      relatedKeywords = [];
      internalLinks = [];
    }
    
    // Generate excerpt from meta description or content
    const plainText = metaDescription || content.replace(/<[^>]*>/g, '').substring(0, 200);
    
    // Calculate read time (assuming 200 words per minute)
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / 200);
    
    // Generate comprehensive tags for SEO
    const tags = generateTags(topic, categoryName, relatedKeywords);
    
    // Create slug
    const slug = slugify(topic, { lower: true, strict: true });
    
    // Check if post with this slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    });
    
    if (existingPost) {
      console.log(`Blog post with slug "${slug}" already exists. Skipping...`);
      return null;
    }
    
    // Create schema markup
    const schemaMarkup = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: topic,
      description: metaDescription || plainText,
      author: {
        '@type': 'Person',
        name: 'MyERAS Reviewer Team',
      },
      datePublished: new Date().toISOString(),
      publisher: {
        '@type': 'Organization',
        name: 'MyERAS Reviewer',
      },
    });
    
    // Save to database
    const blogPost = await prisma.blogPost.create({
      data: {
        title: topic,
        slug,
        excerpt: plainText + (plainText.length === 200 ? '...' : ''),
        content,
        category: categoryName as any,
        tags: tags.join(', '),
        icon: icon,
        readTime,
        featured: Math.random() > 0.8, // 20% chance of being featured
        author: 'MyERAS Reviewer Team',
        metaDescription,
        faqSection: faqSection.length > 0 ? faqSection : undefined,
        schemaMarkup,
      },
    });
    
    console.log(`Successfully generated blog post: ${topic}`);
    
    // Trigger SEO automation pipeline
    if (process.env.NODE_ENV === 'production') {
      try {
        await triggerSEOPipeline(blogPost);
      } catch (error) {
        console.error('SEO pipeline error:', error);
        // Don't fail the blog generation if SEO pipeline fails
      }
    }
    
    return blogPost;
    
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
}

function generateTags(topic: string, category: string, relatedKeywords: string[] = []): string[] {
  const baseTags = ['ERAS', 'residency', 'medical students', 'match'];
  
  // Add category-specific tags
  const categoryTags: { [key: string]: string[] } = {
    APPLICATION_TIPS: ['application tips', 'ERAS tips', 'application strategy'],
    PERSONAL_STATEMENT: ['personal statement', 'essay writing', 'storytelling'],
    INTERVIEW_PREP: ['interview', 'interview preparation', 'virtual interview'],
    SPECIALTY_GUIDES: ['specialty selection', 'medical specialties', 'career choice'],
    TIMELINE_PLANNING: ['timeline', 'deadlines', 'planning'],
    PROGRAM_SELECTION: ['program selection', 'program list', 'application strategy'],
    MATCH_STRATEGY: ['match algorithm', 'NRMP', 'rank list'],
    SUCCESS_STORIES: ['success story', 'inspiration', 'match success'],
  };
  
  const tags = [...baseTags];
  
  if (categoryTags[category]) {
    tags.push(...categoryTags[category]);
  }
  
  // Add topic-specific keywords
  const topicWords = topic.toLowerCase().split(' ')
    .filter(word => word.length > 4 && !['from', 'into', 'your', 'that', 'with'].includes(word));
  tags.push(...topicWords.slice(0, 3));
  
  // Add related keywords
  tags.push(...relatedKeywords);
  
  // Return unique tags
  return [...new Set(tags)].slice(0, 12);
}

// Generate multiple blog posts
export async function generateMultipleBlogPosts(count: number = 5) {
  const results = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const post = await generateBlogPost();
      if (post) {
        results.push(post);
      }
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error generating blog post ${i + 1}:`, error);
    }
  }
  
  return results;
}

// Trigger SEO automation pipeline
async function triggerSEOPipeline(blogPost: any) {
  try {
    // Call the SEO automation endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cron/seo-automation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRON_SECRET}`,
      },
      body: JSON.stringify({
        blogPostId: blogPost.id,
        slug: blogPost.slug,
        title: blogPost.title,
        url: `${process.env.NEXT_PUBLIC_URL}/blog/${blogPost.slug}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`SEO automation failed: ${response.statusText}`);
    }

    console.log(`SEO pipeline triggered for: ${blogPost.title}`);
  } catch (error) {
    console.error('Error triggering SEO pipeline:', error);
    throw error;
  }
}