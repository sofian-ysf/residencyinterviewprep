import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample blog posts
  const blogPosts = [
    {
      title: "10 Essential Tips for Your ERAS Personal Statement",
      slug: "essential-tips-eras-personal-statement",
      excerpt: "Learn how to craft a compelling personal statement that stands out to residency program directors.",
      content: "<p>Your personal statement is one of the most important components of your ERAS application...</p>",
      category: "PERSONAL_STATEMENT" as const,
      tags: "personal statement, ERAS, residency application",
      icon: "document",
      featured: true,
      readTime: 8,
      views: 1250,
      metaDescription: "Master the art of writing an outstanding ERAS personal statement with these proven tips from admission committee members."
    },
    {
      title: "Complete Timeline for 2024-2025 Residency Application",
      slug: "complete-timeline-2024-2025-residency",
      excerpt: "A month-by-month guide to stay on track with your residency application process.",
      content: "<p>Planning your residency application timeline is crucial for success...</p>",
      category: "TIMELINE_PLANNING" as const,
      tags: "timeline, planning, ERAS, match",
      icon: "calendar",
      featured: true,
      readTime: 12,
      views: 980,
      metaDescription: "Stay organized with our comprehensive timeline for the 2024-2025 residency application cycle."
    },
    {
      title: "How to Choose the Right Residency Programs",
      slug: "how-to-choose-residency-programs",
      excerpt: "Strategic advice for selecting programs that align with your career goals and qualifications.",
      content: "<p>Selecting the right residency programs to apply to is a critical decision...</p>",
      category: "PROGRAM_SELECTION" as const,
      tags: "program selection, residency, strategy",
      icon: "search",
      featured: true,
      readTime: 10,
      views: 856,
      metaDescription: "Learn how to strategically select residency programs that match your qualifications and career goals."
    },
    {
      title: "Interview Preparation: Common Questions and Best Answers",
      slug: "interview-preparation-common-questions",
      excerpt: "Prepare for your residency interviews with our comprehensive guide to common questions.",
      content: "<p>Residency interviews are your opportunity to showcase your personality...</p>",
      category: "INTERVIEW_PREP" as const,
      tags: "interview, preparation, questions",
      icon: "microphone",
      readTime: 15,
      views: 1100,
      metaDescription: "Ace your residency interviews with our guide to common questions and effective answering strategies."
    },
    {
      title: "IMG Success Story: Matching into Competitive Specialties",
      slug: "img-success-story-competitive-specialties",
      excerpt: "Inspiring stories and strategies from IMGs who matched into competitive residency programs.",
      content: "<p>International Medical Graduates face unique challenges...</p>",
      category: "SUCCESS_STORIES" as const,
      tags: "IMG, success story, match",
      icon: "star",
      readTime: 6,
      views: 750,
      metaDescription: "Read inspiring success stories from IMGs who matched into competitive residency programs."
    },
    {
      title: "Understanding USMLE Score Requirements by Specialty",
      slug: "usmle-score-requirements-by-specialty",
      excerpt: "A comprehensive breakdown of average USMLE scores for different medical specialties.",
      content: "<p>USMLE scores play a crucial role in residency applications...</p>",
      category: "SPECIALTY_GUIDES" as const,
      tags: "USMLE, scores, specialties",
      icon: "chart",
      readTime: 7,
      views: 2100,
      metaDescription: "Discover the average USMLE score requirements for different medical specialties in 2024."
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });