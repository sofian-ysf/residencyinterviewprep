import { Metadata } from 'next';
import SpecialtyInterviewPage from '@/components/SpecialtyInterviewPage';

export const metadata: Metadata = {
  title: 'Surgery Residency Interview Prep & Mock Interviews | Expert General Surgery Coaching',
  description: 'Master your General Surgery residency interviews with specialty-specific mock interviews. Ex-surgery program directors coach you on technical knowledge, operative cases, research, and work ethic demonstration. Competitive specialty preparation.',
  keywords: [
    'surgery interview prep',
    'general surgery interview coaching',
    'surgery residency mock interviews',
    'surgical residency interview questions',
    'surgery interview tips',
    'competitive surgery interview prep'
  ].join(', '),
  openGraph: {
    title: 'Surgery Residency Interview Prep | Expert Mock Interviews',
    description: 'Master your surgery interviews with specialty-specific coaching from ex-program directors.',
    url: 'https://www.myerasediting.com/interview-prep/surgery',
  },
  alternates: {
    canonical: 'https://www.myerasediting.com/interview-prep/surgery',
  },
};

const surgeryData = {
  name: "General Surgery",
  slug: "surgery",
  description: "Master your General Surgery residency interviews with coaching from ex-surgery program directors. Learn to discuss operative cases, research, work ethic, and demonstrate surgical aptitude. Competitive specialty preparation that works.",
  whySpecial: {
    title: "Why Surgery Interviews Require Specialized Coaching",
    points: [
      "Surgery programs evaluate your surgical aptitude, manual dexterity discussions, and operative exposure differently than other specialties. You need to articulate your OR experiences compellingly without sounding arrogant or inexperienced.",
      "Work ethic, resilience, and ability to handle long hours are critical. Programs are assessing: Can you survive a brutal residency? How do you handle criticism? Do you thrive under pressure?",
      "Research expectations are HIGH for competitive programs. You'll need to discuss your projects with sophistication, show intellectual curiosity, and demonstrate your understanding of surgical innovation.",
      "Surgery culture is unique. Programs evaluate team dynamics, humility despite confidence, and whether you'll fit with their culture. Our surgery-specific coaches know exactly what programs want to see."
    ]
  },
  commonQuestions: [
    "Why surgery? What specific moment made you realize this was your calling?",
    "Tell me about your most memorable operative case and what you learned from it.",
    "Describe your research. What was your hypothesis? What were the results? What's next?",
    "How do you handle stress and long hours? Give me a specific example from your rotations.",
    "Tell me about a time you made a mistake or poor judgment. What did you learn?",
    "What are your long-term career goals? Do you see yourself in academics, private practice, or both?",
    "How do you handle receiving critical feedback in the OR?",
    "What makes you stand out from other applicants with similar scores?",
    "Tell me about a challenging interaction with a difficult attending or resident.",
    "Why our program specifically? What do you know about our faculty's research?"
  ],
  stats: {
    matchRate: "94%",
    avgInterviews: "14",
    programsTrained: "80+"
  },
  faqs: [
    {
      question: "How do I demonstrate surgical aptitude without OR skills yet?",
      answer: "Focus on your intellectual curiosity about surgical decision-making, your comfort in high-pressure situations, your manual dexterity (even from non-medical experiences like playing instruments or building things), and your genuine excitement during OR rotations. Discuss cases where you anticipated the next step or asked insightful questions. Programs understand you're a student - they're evaluating potential, not current skill."
    },
    {
      question: "Do I need research to match in surgery?",
      answer: "For university programs and competitive programs, research is almost mandatory. For community programs, it's valued but less critical. If you have limited research, be prepared to explain your clinical focus and express interest in future projects. Our coaches help you frame whatever research experience you have (QI, case reports, posters) in the most compelling way."
    },
    {
      question: "How do I answer questions about work-life balance in surgery?",
      answer: "Be honest but strategic. Don't say you don't need sleep or have no life outside surgery (red flag for burnout). Instead, emphasize your passion for surgery, your effective time management, your support system, and your healthy coping mechanisms. Programs want residents who will last 5+ years, not burn out in year 2."
    },
    {
      question: "Should I mention my interest in a specific subspecialty?",
      answer: "Approach this carefully. It's fine to express interest in a subspecialty (trauma, plastics, vascular, etc.) as long as you: (1) Express commitment to completing general surgery first, (2) Show genuine interest in broad surgical training, (3) Don't sound inflexible. Never say you're only interested in one subspecialty - programs want residents committed to general surgery."
    },
    {
      question: "How important are my Step scores for surgery?",
      answer: "Step scores matter, especially for competitive programs, but they're not everything. If your scores are below average for surgery (Step 1: 230+, Step 2: 245+), you need to emphasize your clinical performance, surgical letters of recommendation, research, and work ethic. We help you address scores strategically without dwelling on them."
    }
  ],
  testimonial: {
    quote: "Surgery interviews are intense. The mock interviews prepared me for the rapid-fire questions about my research and operative cases. I felt confident discussing every aspect of my application. Matched at Mayo Clinic!",
    author: "Dr. Sarah K., DO",
    program: "General Surgery, Mayo Clinic",
    stats: "8 Mock Interviews | 12 Real Interviews | Matched Top Choice"
  }
};

export default function SurgeryInterviewPage() {
  return <SpecialtyInterviewPage specialty={surgeryData} />;
}
