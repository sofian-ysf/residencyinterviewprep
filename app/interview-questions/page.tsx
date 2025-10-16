import { Metadata } from 'next';
import InterviewQuestionsContent from './InterviewQuestionsContent';

export const metadata: Metadata = {
  title: '200+ Residency Interview Questions & Answers | Complete Question Bank 2025',
  description: 'Complete database of 200+ residency interview questions with expert answer frameworks. Behavioral questions, clinical scenarios, ethical dilemmas, specialty-specific questions, and red flag responses. Free resource from ex-program directors.',
  keywords: [
    'residency interview questions',
    'residency interview questions and answers',
    'common residency interview questions',
    'medical residency interview questions',
    'residency interview question bank',
    'behavioral interview questions residency',
    'clinical scenario interview questions',
    'residency interview prep questions',
    'program director interview questions',
    'IMG interview questions'
  ].join(', '),
  openGraph: {
    title: '200+ Residency Interview Questions & Answers | Complete Database',
    description: 'Free database of 200+ residency interview questions with expert frameworks from ex-program directors.',
    url: 'https://www.myerasediting.com/interview-questions',
  },
  alternates: {
    canonical: 'https://www.myerasediting.com/interview-questions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function InterviewQuestionsPage() {
  return <InterviewQuestionsContent />;
}
