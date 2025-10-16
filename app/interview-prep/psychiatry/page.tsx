import { Metadata } from 'next';
import SpecialtyInterviewPage from '@/components/SpecialtyInterviewPage';

export const metadata: Metadata = {
  title: 'Psychiatry Interview Prep & Mock Interviews | Expert Psych Residency Coaching',
  description: 'Master your Psychiatry residency interviews with specialty-specific coaching from ex-psych program directors. Practice discussing your therapeutic approach, mental health advocacy, and demonstrate your interpersonal skills. Psychiatry interview mastery.',
  keywords: [
    'psychiatry interview prep',
    'psych interview coaching',
    'psychiatry residency mock interviews',
    'psychiatry interview questions',
    'psych residency interview tips',
    'mental health interview preparation'
  ].join(', '),
  openGraph: {
    title: 'Psychiatry Interview Prep | Expert Mock Interviews',
    description: 'Master your psychiatry interviews with specialty-specific coaching from ex-psych program directors.',
    url: 'https://www.myerasediting.com/interview-prep/psychiatry',
  },
  alternates: {
    canonical: 'https://www.myerasediting.com/interview-prep/psychiatry',
  },
};

const psychiatryData = {
  name: "Psychiatry",
  slug: "psychiatry",
  description: "Master your Psychiatry residency interviews with coaching from ex-psych program directors. Learn to articulate your therapeutic philosophy, discuss mental health advocacy, and demonstrate exceptional interpersonal skills. Excel in psychiatry interviews.",
  whySpecial: {
    title: "Why Psychiatry Interviews Require Unique Preparation",
    points: [
      "Psychiatry programs evaluate your interpersonal skills, empathy, and self-awareness more than any other specialty. The interview IS a demonstration of your therapeutic presence. How you communicate, listen, and connect matters immensely.",
      "You need to articulate your therapeutic philosophy thoughtfully. Programs ask about your approach to psychotherapy, medication management balance, and theoretical orientation. Generic answers won't work - you need depth and nuance.",
      "Personal experiences with mental health are common in psychiatry applications. If you mention personal/family mental health history, you must frame it professionally and demonstrate healthy boundaries and self-awareness.",
      "Mental health stigma, advocacy, and social determinants are central to psychiatry. Programs want candidates who understand systemic issues in mental healthcare and have thoughtful perspectives on policy and advocacy."
    ]
  },
  commonQuestions: [
    "Why psychiatry? What drew you to mental health care specifically?",
    "Describe your therapeutic approach. How do you balance medication management and psychotherapy?",
    "Tell me about a memorable psychiatric patient interaction. What did you learn?",
    "How do you handle your own mental health and maintain boundaries with patients?",
    "What's your understanding of different psychotherapy modalities (CBT, DBT, psychodynamic)?",
    "How do you approach involuntary commitment decisions?",
    "Tell me about your perspective on the mental health system and its challenges.",
    "Have you had personal experience with mental illness? How does that inform your approach?",
    "Describe a time you had to manage a suicidal or agitated patient.",
    "Why our program? What aspects of our psychiatry training interest you?"
  ],
  stats: {
    matchRate: "96%",
    avgInterviews: "17",
    programsTrained: "90+"
  },
  faqs: [
    {
      question: "Should I mention my personal mental health history in my psychiatry interview?",
      answer: "This is a personal decision. If you choose to mention it: (1) Frame it as professionally resolved/managed, (2) Demonstrate healthy boundaries and self-awareness, (3) Explain how it informs (not drives) your interest in psychiatry, (4) Show you have strong personal coping strategies. Never mention active, untreated mental health issues. If you're uncomfortable sharing, you don't have to - many successful psychiatry applicants don't disclose personal history."
    },
    {
      question: "How do I demonstrate good interpersonal skills in my psychiatry interview?",
      answer: "Remember: the interview itself IS a test of your interpersonal skills. Make good eye contact, listen actively, show empathy and curiosity about your interviewer, demonstrate emotional intelligence, and be authentic. Programs are evaluating: Do I want to work with this person? Would I feel comfortable sending my family member to them? Your communication style matters as much as your answers."
    },
    {
      question: "Do I need psychotherapy training or experience before residency?",
      answer: "No formal training is expected (you'll learn in residency), but you should demonstrate intellectual curiosity about psychotherapy. Read about different modalities (CBT, DBT, psychodynamic), discuss therapy you've observed, and show you understand that psychiatry is more than prescribing medications. We help you frame whatever exposure you have compellingly."
    },
    {
      question: "How important are research and Step scores for psychiatry?",
      answer: "Research is valued, especially for academic programs, but it's less critical than in many other specialties. Psychiatry is more holistic in evaluation. Step scores matter less than in competitive specialties - programs focus more on personal statement, interviews, and interpersonal skills. If scores are lower, emphasize your clinical skills, empathy, and fit for psychiatry."
    },
    {
      question: "How do I answer questions about the stigma in psychiatry?",
      answer: "Acknowledge that stigma exists both in medicine and society. Discuss your role as an advocate for mental health, the importance of destigmatizing mental illness, and how you'd educate other physicians. Show you understand the systemic issues but remain optimistic about psychiatry's role in integrated care. Programs want advocates who understand challenges but remain passionate about the field."
    }
  ],
  testimonial: {
    quote: "Psychiatry interviews felt more like therapeutic conversations than interrogations. The coaching helped me be authentic while still strategic. I learned how to discuss my personal connection to mental health professionally. Matched at Yale!",
    author: "Dr. Jessica L., MD",
    program: "Psychiatry, Yale",
    stats: "5 Mock Interviews | 16 Real Interviews | Matched #1"
  }
};

export default function PsychiatryInterviewPage() {
  return <SpecialtyInterviewPage specialty={psychiatryData} />;
}
