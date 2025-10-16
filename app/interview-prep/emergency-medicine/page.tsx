import { Metadata } from 'next';
import SpecialtyInterviewPage from '@/components/SpecialtyInterviewPage';

export const metadata: Metadata = {
  title: 'Emergency Medicine Interview Prep & Mock Interviews | Expert EM Coaching',
  description: 'Master your Emergency Medicine residency interviews with specialty-specific coaching from ex-EM program directors. Practice clinical scenarios, shift work discussions, and demonstrate your ability to thrive in high-acuity environments. Proven EM interview strategies.',
  keywords: [
    'emergency medicine interview prep',
    'EM interview coaching',
    'emergency medicine mock interviews',
    'EM residency interview questions',
    'emergency medicine interview tips',
    'EM interview preparation'
  ].join(', '),
  openGraph: {
    title: 'Emergency Medicine Interview Prep | Expert Mock Interviews',
    description: 'Master your EM interviews with specialty-specific coaching from ex-EM program directors.',
    url: 'https://www.myerasediting.com/interview-prep/emergency-medicine',
  },
  alternates: {
    canonical: 'https://www.myerasediting.com/interview-prep/emergency-medicine',
  },
};

const emergencyMedicineData = {
  name: "Emergency Medicine",
  slug: "emergency-medicine",
  description: "Master your Emergency Medicine residency interviews with coaching from ex-EM program directors. Learn to discuss clinical decision-making under pressure, shift work adaptability, and your approach to high-acuity patient care. Stand out in competitive EM interviews.",
  whySpecial: {
    title: "Why Emergency Medicine Interviews Require Specific Preparation",
    points: [
      "EM programs evaluate your decision-making under pressure, comfort with clinical uncertainty, and ability to multitask in chaotic environments. You need concrete examples that demonstrate these skills, not just generic statements about 'loving fast-paced medicine.'",
      "Shift work, work-life balance, and burnout are major topics. Programs want residents who understand the realities of EM and have strategies to maintain wellness. Your answer to 'why EM?' must address the shift work lifestyle thoughtfully.",
      "Clinical breadth, procedural skills, and resuscitation experience matter. Be prepared to discuss your most challenging cases, interesting procedures, and approach to critically ill patients. EM programs want to see your clinical judgment and confidence.",
      "EM culture values team dynamics, humility, and teaching. Programs assess whether you'll be a good colleague, whether you can take constructive criticism, and how you handle difficult situations with consultants or patients."
    ]
  },
  commonQuestions: [
    "Why Emergency Medicine? How did you realize EM was the right fit?",
    "Tell me about your most challenging case in the ED. How did you manage it?",
    "How do you handle clinical uncertainty when you have to make quick decisions?",
    "Describe a time you had to manage multiple critically ill patients simultaneously.",
    "How do you approach burnout and maintain wellness given EM's shift work?",
    "Tell me about a difficult interaction with a consultant or another team member. How did you handle it?",
    "What procedures are you most comfortable with? Which do you want to learn?",
    "How do you handle aggressive or violent patients?",
    "What's your approach to end-of-life conversations in the ED?",
    "Why our program? What aspects of our EM training appeal to you specifically?"
  ],
  stats: {
    matchRate: "95%",
    avgInterviews: "15",
    programsTrained: "100+"
  },
  faqs: [
    {
      question: "How do I show I understand the realities of EM shift work?",
      answer: "Be honest and strategic. Acknowledge that shift work is challenging but emphasize the benefits: no call from home, defined work hours, flexibility, and separation between work and personal life. Discuss how you've handled night shifts during rotations, your sleep strategies, and your support system. Don't pretend shift work is easy - programs respect candidates who understand the trade-offs but have a plan."
    },
    {
      question: "Do I need extensive procedure experience to match in EM?",
      answer: "Not necessarily. Programs understand you're a medical student with limited procedure experience. What matters is: (1) You've done basic procedures (IVs, LPs, intubations if possible), (2) You show enthusiasm for learning procedures, (3) You can discuss procedures you've observed intelligently. We help you frame your procedure experience, even if it's limited."
    },
    {
      question: "How important are EM rotations at multiple sites?",
      answer: "Multiple EM rotations (especially at academic and community sites) demonstrate your commitment to EM and give you diverse experiences to discuss. If you have limited EM rotations, emphasize quality over quantity: discuss what you learned, interesting cases, and how each rotation confirmed your interest in EM. We help you maximize whatever rotations you have."
    },
    {
      question: "How do I answer 'Why EM over hospitalist medicine or critical care?'",
      answer: "Focus on what draws you TO EM specifically: the variety, procedural aspects, acute stabilization rather than longitudinal management, shift work lifestyle, breadth of pathology, and the challenge of rapid decision-making. Don't bash other specialties - instead, emphasize what excites you about EM's unique characteristics."
    },
    {
      question: "Should I mention burnout concerns in my EM interview?",
      answer: "You can acknowledge burnout exists in EM (programs know this), but frame it positively: 'I know EM has high burnout rates, which is why I've developed strong wellness strategies including [exercise, hobbies, support system]. I'm drawn to EM's shift work because it allows me to fully disconnect when I'm off.' Never say you're worried YOU'LL burn out."
    }
  ],
  testimonial: {
    quote: "EM interviews were tough - lots of clinical scenario questions. The mock interviews prepared me to think on my feet and discuss my decision-making process clearly. I felt confident in every interview and matched at my dream program!",
    author: "Dr. Michael T., MD",
    program: "Emergency Medicine, UCSF",
    stats: "6 Mock Interviews | 14 Real Interviews | Matched #2"
  }
};

export default function EmergencyMedicineInterviewPage() {
  return <SpecialtyInterviewPage specialty={emergencyMedicineData} />;
}
