import { Metadata } from 'next';
import SpecialtyInterviewPage from '@/components/SpecialtyInterviewPage';

export const metadata: Metadata = {
  title: 'Internal Medicine Interview Prep & Mock Interviews | Expert IM Coaching | 97% Match Rate',
  description: 'Master your Internal Medicine residency interviews with specialty-specific mock interviews and coaching. Led by ex-IM program directors. Practice behavioral questions, clinical scenarios, and program-specific preparation. 97% match success rate. Virtual sessions available.',
  keywords: [
    'internal medicine interview prep',
    'IM interview coaching',
    'internal medicine mock interviews',
    'residency interview internal medicine',
    'IM residency interview questions',
    'internal medicine interview tips',
    'mock interview IM',
    'internal medicine residency coaching'
  ].join(', '),
  openGraph: {
    title: 'Internal Medicine Interview Prep | Expert Mock Interviews',
    description: 'Master your IM interviews with specialty-specific coaching from ex-program directors. 97% match rate.',
    url: 'https://www.myerasediting.com/interview-prep/internal-medicine',
  },
  alternates: {
    canonical: 'https://www.myerasediting.com/interview-prep/internal-medicine',
  },
};

const internalMedicineData = {
  name: "Internal Medicine",
  slug: "internal-medicine",
  description: "Master your Internal Medicine residency interviews with specialty-specific coaching from ex-IM program directors. Practice behavioral questions, clinical scenarios, and program-specific preparation tailored to IM.",
  whySpecial: {
    title: "Why Internal Medicine Interviews Require Specialty-Specific Prep",
    points: [
      "IM programs emphasize longitudinal patient care, chronic disease management, and systems-based practice. Generic prep won't address these IM-specific themes that dominate interview conversations.",
      "You need to demonstrate genuine interest in primary care vs subspecialty tracks (cards, GI, pulm). Programs evaluate your long-term goals and whether you fit their mission (academic, community, research-focused).",
      "IM interviews include detailed discussions of your research, QI projects, and population health interests. You'll need sophisticated frameworks to discuss these topics at the level IM programs expect.",
      "Programs ask nuanced questions about healthcare systems, insurance coverage, social determinants of health, and health equity. Our IM coaches prepare you for these complex discussions."
    ]
  },
  commonQuestions: [
    "Why Internal Medicine over other specialties? (Be specific about longitudinal care, diagnostic reasoning, breadth)",
    "Do you plan to pursue a fellowship? If so, which one and why? If not, why general IM?",
    "Tell me about a complex patient case you managed during rotations. (They want diagnostic reasoning)",
    "How do you handle diagnostic uncertainty? Walk me through your approach.",
    "Describe a quality improvement project you participated in. What did you learn?",
    "How do you address social determinants of health in patient care?",
    "What interests you about our program specifically? (Requires deep research)",
    "Tell me about a time you had to manage multiple sick patients simultaneously.",
    "How do you stay current with medical literature and guidelines?",
    "What are your thoughts on primary care vs subspecialty training?"
  ],
  stats: {
    matchRate: "97%",
    avgInterviews: "18",
    programsTrained: "150+"
  },
  faqs: [
    {
      question: "What makes IM interviews different from other specialties?",
      answer: "Internal Medicine interviews focus heavily on your interest in longitudinal patient care, diagnostic reasoning, systems-based practice, and long-term career goals (fellowship vs primary care). Programs want to assess your intellectual curiosity about complex medical decision-making and your approach to managing chronic diseases. Unlike surgical specialties that emphasize technical skills, IM interviews dive deep into your clinical reasoning, research interests, and commitment to comprehensive patient care."
    },
    {
      question: "How do I answer the 'fellowship vs primary care' question?",
      answer: "Be honest but strategic. If you're interested in fellowship, name a specific subspecialty and explain why, while emphasizing your commitment to comprehensive IM training first. If you're interested in primary care, highlight your passion for continuity of care and managing complex comorbidities. What programs don't want to hear: 'I'm keeping my options open' or 'I'll decide later.' Show you've thought deeply about your career direction, even if you're genuinely open to both paths."
    },
    {
      question: "Do I need to prepare clinical scenarios for IM interviews?",
      answer: "Yes! Many IM programs ask you to walk through complex patient cases, particularly those involving diagnostic uncertainty or multiple comorbidities. You should prepare 3-5 detailed patient cases from your IM rotations that demonstrate your clinical reasoning, use of evidence-based medicine, and approach to complex decision-making. Our mock interviews help you present these cases concisely and compellingly."
    },
    {
      question: "How important are research and QI projects for IM interviews?",
      answer: "Very important, especially for university programs. Be prepared to discuss any research or quality improvement projects in detail: your hypothesis, methodology, results, and implications. Even if you're not research-focused, you should demonstrate interest in evidence-based medicine and quality improvement. We help you frame your experiences effectively, even if they're limited."
    },
    {
      question: "Should I mention my Step scores in my IM interview?",
      answer: "Only if asked directly. IM programs already have your scores. If your scores are strong (240+), programs may ask about your interest in IM given you could pursue competitive specialties. If your scores are lower, focus on your clinical performance, patient care skills, and commitment to IM. We coach you on how to address score-related questions strategically."
    }
  ],
  testimonial: {
    quote: "As an IMG applying to Internal Medicine, I was nervous about demonstrating my commitment to US healthcare. The IM-specific coaching helped me articulate my long-term goals clearly and confidently. I matched at Johns Hopkins!",
    author: "Dr. Priya S., MD",
    program: "Internal Medicine, Johns Hopkins",
    stats: "6 Mock Interviews | 16 Real Interviews | Matched #1"
  }
};

export default function InternalMedicineInterviewPage() {
  return <SpecialtyInterviewPage specialty={internalMedicineData} />;
}
