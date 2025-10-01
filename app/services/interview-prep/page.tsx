import { Metadata } from 'next';
import InterviewPrepContent from './InterviewPrepContent';

export const metadata: Metadata = {
  title: 'Residency Interview Coaching by Ex-Program Directors | Mock Interviews & Expert Preparation',
  description: 'Master your residency interviews with personalized coaching from physicians who served on selection committees. Mock interviews, strategic preparation materials, and insider guidance. 97% match success rate. Packages from $500-$1500.',
  keywords: [
    'residency interview coaching',
    'mock interview residency',
    'program director interview prep',
    'residency interview preparation',
    'medical residency interview coaching',
    'IMG interview coaching',
    'residency match interview prep',
    'ex program director coaching',
    'residency interview course',
    'mock interview medical residency'
  ].join(', '),
  openGraph: {
    title: 'Residency Interview Coaching by Ex-Program Directors',
    description: 'Master your residency interviews with expert coaching. Mock interviews, personalized feedback, and insider preparation materials. 97% match success rate.',
    url: 'https://www.myerasediting.com/services/interview-prep',
    siteName: 'MyERAS Editing',
    images: [
      {
        url: 'https://www.myerasediting.com/og-interview-prep.png',
        width: 1200,
        height: 630,
        alt: 'Residency Interview Coaching by Ex-Program Directors'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Residency Interview Coaching by Ex-Program Directors',
    description: 'Master your residency interviews with expert coaching. 97% match success rate.',
    images: ['https://www.myerasediting.com/og-interview-prep.png'],
  },
  alternates: {
    canonical: 'https://www.myerasediting.com/services/interview-prep',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function InterviewPrepPage() {
  return <InterviewPrepContent />;
}
