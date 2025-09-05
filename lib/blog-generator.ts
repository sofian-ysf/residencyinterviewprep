import Anthropic from '@anthropic-ai/sdk';
import { prisma } from './prisma';
import slugify from 'slugify';

const getAnthropicClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
  }
  return new Anthropic({
    apiKey: apiKey,
  });
};

const blogTopics = [
  {
    category: 'APPLICATION_TIPS',
    topics: [
      'How to Write Compelling ERAS Activity Descriptions',
      'Common ERAS Application Mistakes to Avoid',
      'Maximizing Your 750 Character Limit',
      'How to Choose Your Most Meaningful Experiences',
      'Tips for International Medical Graduates',
    ],
    icon: 'application-tips',
  },
  {
    category: 'PERSONAL_STATEMENT',
    topics: [
      'Personal Statement Opening Lines That Work',
      'How to Show Not Tell in Your Personal Statement',
      'Connecting Your Story to Your Specialty Choice',
      'Personal Statement Red Flags to Avoid',
      'The Perfect Personal Statement Structure',
    ],
    icon: 'personal-statement',
  },
  {
    category: 'INTERVIEW_PREP',
    topics: [
      'Virtual Interview Best Practices',
      'Common Residency Interview Questions and Answers',
      'How to Prepare for MMI Interviews',
      'Post-Interview Thank You Notes',
      'Interview Day Etiquette Tips',
    ],
    icon: 'interview-prep',
  },
  {
    category: 'SPECIALTY_GUIDES',
    topics: [
      'Matching into Competitive Specialties',
      'Internal Medicine vs Family Medicine',
      'Surgery Residency Application Guide',
      'Pediatrics Application Requirements',
      'Emergency Medicine Match Statistics',
    ],
    icon: 'specialty-guides',
  },
  {
    category: 'TIMELINE_PLANNING',
    topics: [
      'Month-by-Month ERAS Timeline',
      'When to Take Step 2 CK',
      'Letter of Recommendation Timeline',
      'Away Rotation Planning Guide',
      'ERAS Submission Strategy',
    ],
    icon: 'timeline-planning',
  },
  {
    category: 'PROGRAM_SELECTION',
    topics: [
      'How Many Programs Should You Apply To',
      'Using Program Signals Effectively',
      'Geographic Preferences Strategy',
      'Community vs Academic Programs',
      'Creating Your Program List',
    ],
    icon: 'program-selection',
  },
  {
    category: 'MATCH_STRATEGY',
    topics: [
      'Understanding the NRMP Algorithm',
      'Couples Match Strategy Guide',
      'SOAP Preparation Tips',
      'Rank List Best Practices',
      'Match Statistics Analysis',
    ],
    icon: 'match-strategy',
  },
  {
    category: 'SUCCESS_STORIES',
    topics: [
      'From Low Step Scores to Top Program Match',
      'IMG Success Story: Matching into Surgery',
      'Reapplicant Success Strategies',
      'Non-Traditional Path to Residency',
      'Couples Match Success Story',
    ],
    icon: 'success-stories',
  },
];

export async function generateBlogPost() {
  try {
    // Get Anthropic client
    const anthropic = getAnthropicClient();
    
    // Select a random category and topic
    const categoryData = blogTopics[Math.floor(Math.random() * blogTopics.length)];
    const topic = categoryData.topics[Math.floor(Math.random() * categoryData.topics.length)];
    
    // Generate content using Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: `You are an expert medical educator and residency application advisor. Write a comprehensive, helpful blog post about: "${topic}"

The blog post should be targeted at medical students applying for residency through ERAS.

Please provide the response in JSON format with the following structure:
{
  "content": "HTML content of the main article",
  "metaDescription": "A 150-160 character SEO description",
  "faqSection": [
    {
      "question": "Frequently asked question",
      "answer": "Detailed answer"
    }
  ]
}

For the main content:
1. Start with an engaging introduction (2-3 paragraphs)
2. Include 3-5 main sections with clear subheadings
3. Use bullet points and numbered lists where appropriate
4. Include specific, actionable advice
5. End with a conclusion that summarizes key points

Write the content in HTML format with proper tags:
- Use <h2> for main section headings
- Use <h3> for subsection headings
- Use <p> for paragraphs
- Use <ul> and <li> for bullet points
- Use <ol> and <li> for numbered lists
- Use <strong> for emphasis
- Use <blockquote> for important quotes or tips

Include 3-5 relevant FAQs that address common questions about the topic.

Make the content informative, practical, and engaging. Include specific examples and real scenarios that medical students face during the residency application process.`
        }
      ]
    });
    
    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';
    
    let blogData;
    let content;
    let metaDescription;
    let faqSection;
    
    try {
      blogData = JSON.parse(responseText);
      content = blogData.content || responseText;
      metaDescription = blogData.metaDescription || null;
      faqSection = blogData.faqSection || [];
    } catch (e) {
      // Fallback if response is not JSON - assume it's raw HTML content
      content = responseText;
      metaDescription = null;
      faqSection = [];
    }
    
    // Generate excerpt from meta description or content
    const plainText = metaDescription || content.replace(/<[^>]*>/g, '').substring(0, 200);
    
    // Calculate read time (assuming 200 words per minute)
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / 200);
    
    // Generate tags based on topic
    const tags = generateTags(topic, categoryData.category);
    
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
        category: categoryData.category as any,
        tags: tags.join(', '),
        icon: categoryData.icon,
        readTime,
        featured: Math.random() > 0.8, // 20% chance of being featured
        author: 'MyERAS Reviewer Team',
        metaDescription,
        faqSection: faqSection.length > 0 ? faqSection : undefined,
        schemaMarkup,
      },
    });
    
    console.log(`Successfully generated blog post: ${topic}`);
    return blogPost;
    
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
}

function generateTags(topic: string, category: string): string[] {
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
  
  // Return unique tags
  return [...new Set(tags)].slice(0, 8);
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