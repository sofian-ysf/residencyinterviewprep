import { Metadata } from 'next';
import SpecialtyInterviewPage from '@/components/SpecialtyInterviewPage';

export const metadata: Metadata = {
  title: 'Pediatrics Interview Prep & Mock Interviews | Expert Peds Residency Coaching',
  description: 'Master your Pediatrics residency interviews with specialty-specific coaching. Ex-peds program directors help you articulate your passion for child health, family communication skills, and pediatric subspecialty interests. Mock interviews and proven strategies.',
  keywords: [
    'pediatrics interview prep',
    'peds interview coaching',
    'pediatrics residency mock interviews',
    'pediatrics interview questions',
    'peds residency interview tips',
    'child health interview preparation'
  ].join(', '),
  openGraph: {
    title: 'Pediatrics Interview Prep | Expert Mock Interviews',
    description: 'Master your pediatrics interviews with specialty-specific coaching from ex-peds program directors.',
    url: 'https://www.myerasediting.com/interview-prep/pediatrics',
  },
  alternates: {
    canonical: 'https://www.myerasediting.com/interview-prep/pediatrics',
  },
};

const pediatricsData = {
  name: "Pediatrics",
  slug: "pediatrics",
  description: "Master your Pediatrics residency interviews with coaching from ex-peds program directors. Learn to articulate your passion for child health, demonstrate family communication skills, and discuss subspecialty interests. Stand out in peds interviews.",
  whySpecial: {
    title: "Why Pediatrics Interviews Need Specialty-Specific Preparation",
    points: [
      "Peds programs evaluate your genuine love for working with children AND families. You need compelling stories that demonstrate patience, playfulness, creativity, and your ability to connect with kids of all ages.",
      "Communication with families is critical. Programs assess your ability to explain complex medical information to worried parents, navigate difficult conversations, and demonstrate cultural sensitivity with diverse families.",
      "Subspecialty interests matter (cards, hem-onc, neonatology, etc.), but programs want to know you're committed to comprehensive pediatrics training first. We help you frame your interests appropriately.",
      "Advocacy and community pediatrics are increasingly important. Programs look for candidates who understand health equity, vaccination advocacy, child poverty, and social determinants of pediatric health."
    ]
  },
  commonQuestions: [
    "Why pediatrics? When did you know you wanted to work with children?",
    "Tell me about a memorable patient interaction with a child. How did you build rapport?",
    "How do you handle emotional situations, like delivering bad news to parents?",
    "Describe a time you had to communicate complex medical information to a worried family.",
    "Do you have interest in a pediatric subspecialty? If so, which one and why?",
    "How would you handle a parent who refuses vaccines for their child?",
    "Tell me about your experience working with children from diverse backgrounds.",
    "What do you know about child advocacy and health policy?",
    "Describe a challenging pediatric case you managed. What made it difficult?",
    "Why our program? What specific aspects of our pediatrics training appeal to you?"
  ],
  stats: {
    matchRate: "96%",
    avgInterviews: "16",
    programsTrained: "120+"
  },
  faqs: [
    {
      question: "Do I need to have my own children to match in pediatrics?",
      answer: "Absolutely not! While some applicants are parents, many successful pediatrics residents have no children of their own. What matters is your genuine connection with children, your patience, creativity, and ability to relate to kids. Focus on your clinical experiences, volunteer work with children, or other interactions that demonstrate your comfort and effectiveness with pediatric patients."
    },
    {
      question: "How do I show passion for pediatrics in my interview?",
      answer: "Use specific stories and examples. Don't just say 'I love kids' - describe a memorable patient encounter that moved you, explain what you love about pediatric development, or discuss a moment when you realized pediatrics was your calling. Show enthusiasm for the unique aspects of pediatrics: watching kids grow, partnering with families, preventive care, and advocacy."
    },
    {
      question: "Should I mention my subspecialty interest in my pediatrics interview?",
      answer: "Yes, but frame it carefully. It's great to have subspecialty interests (cards, hem-onc, neonatology, etc.), but emphasize your commitment to comprehensive pediatrics training first. Say something like: 'I'm really interested in exploring pediatric cardiology, but I'm excited to get broad training first and see what resonates most during residency.' Never say you're ONLY interested in one subspecialty."
    },
    {
      question: "How do I handle vaccine refusal questions?",
      answer: "This is a common ethics question in peds interviews. The best approach: (1) Acknowledge parents' concerns empathetically, (2) Provide evidence-based information without being condescending, (3) Build trust over time, (4) Know when to involve the attending. Don't say you'd refuse to care for unvaccinated children (wrong answer). We practice this scenario extensively in mock interviews."
    },
    {
      question: "What if I have limited pediatric experience beyond my core rotation?",
      answer: "Highlight what you DO have: your core pediatrics rotation, any pediatric research or volunteer work, experiences tutoring or working with children, even relevant personal experiences. Be honest about limited exposure but emphasize how every pediatric interaction confirmed your desire to pursue peds. We help you maximize whatever experiences you have."
    }
  ],
  testimonial: {
    quote: "I struggled to articulate my passion for pediatrics without sounding cliché. The mock interviews helped me develop authentic, compelling stories about my patient interactions. I felt prepared for every question and matched at my top choice!",
    author: "Dr. Emily R., MD",
    program: "Pediatrics, Boston Children's Hospital",
    stats: "5 Mock Interviews | 15 Real Interviews | Matched #1"
  }
};

export default function PediatricsInterviewPage() {
  return <SpecialtyInterviewPage specialty={pediatricsData} />;
}
