import { Metadata } from 'next';
import MockInterviewsContent from './MockInterviewsContent';

export const metadata: Metadata = {
  title: 'Residency Mock Interviews | Expert Practice with Ex-Program Directors | 95% Match Rate',
  description: 'Master your residency interviews with realistic mock interviews led by ex-program directors. Personalized feedback, proven techniques, and comprehensive preparation. Virtual sessions available. Packages from $499. 95% match success rate.',
  keywords: [
    'mock interview residency',
    'residency mock interviews',
    'medical residency mock interview',
    'residency interview practice',
    'mock interview medical school',
    'program director mock interview',
    'virtual mock interview residency',
    'IMG mock interview',
    'residency interview coaching',
    'mock interview preparation',
    'medical interview practice',
    'residency match interview prep',
    'online mock interviews residency',
    'best residency mock interview service'
  ].join(', '),
  openGraph: {
    title: 'Residency Mock Interviews | Expert Practice with Ex-Program Directors',
    description: 'Master your residency interviews with realistic mock interviews. Led by ex-program directors. 95% match success rate. Virtual sessions available.',
    url: 'https://www.myerasediting.com/mock-interviews',
    siteName: 'MyERAS Editing',
    images: [
      {
        url: 'https://www.myerasediting.com/og-mock-interviews.png',
        width: 1200,
        height: 630,
        alt: 'Residency Mock Interviews - Expert Practice with Ex-Program Directors'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Residency Mock Interviews | Ex-Program Directors',
    description: 'Master your residency interviews with realistic mock interview practice. 95% match success rate.',
    images: ['https://www.myerasediting.com/og-mock-interviews.png'],
  },
  alternates: {
    canonical: 'https://www.myerasediting.com/mock-interviews',
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

export default function MockInterviewsPage() {
  return <MockInterviewsContent />;
}
