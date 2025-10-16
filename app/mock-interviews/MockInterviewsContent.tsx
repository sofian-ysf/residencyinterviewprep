"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Clock, Users, Award, Video, BookOpen, MessageCircle, Target, TrendingUp, Shield, AlertCircle, ArrowRight, Play, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/seo/FAQSection";
import RelatedInterviewLinks from "@/components/RelatedInterviewLinks";
import Script from "next/script";

const mockInterviewFAQs = [
  {
    question: "What is a residency mock interview?",
    answer: "A residency mock interview is a realistic simulation of an actual residency program interview conducted by experienced physicians, typically ex-program directors or chief residents. It replicates the format, questions, pressure, and evaluation process you'll face in real interviews. You'll answer common behavioral questions, discuss your application, explain red flags, and demonstrate your communication skills. Afterward, you receive detailed feedback on your performance, including strengths, weaknesses, and specific areas for improvement."
  },
  {
    question: "How many mock interviews should I do before match day?",
    answer: "We recommend 3-6 mock interviews for most applicants. If you're applying to competitive specialties (Dermatology, Orthopedic Surgery, Neurosurgery) or have significant red flags (failed Step exams, gaps in training, reapplying), we recommend 6-10 sessions. The key is spacing them out over 4-8 weeks so you can implement feedback between sessions. Most of our successfully matched residents completed 4-6 mock interviews."
  },
  {
    question: "Are online/virtual mock interviews as effective as in-person?",
    answer: "Yes! In fact, since most residency programs now conduct virtual interviews via Zoom, practicing in the same format is actually more beneficial. Our virtual mock interviews use the same video conferencing platforms programs use, helping you master the technical aspects, camera presence, lighting, and virtual communication skills. We've found no difference in match rates between students who did virtual vs in-person mock interviews."
  },
  {
    question: "Who conducts the mock interviews?",
    answer: "All mock interviews are conducted by ex-program directors and chief residents who have personally participated in hundreds to thousands of real residency interviews. They know exactly what programs look for, how scoring systems work, and which red flags matter most. Each interviewer is specialty-matched to your field when possible, ensuring relevant, targeted feedback for your specific situation."
  },
  {
    question: "What happens during a mock interview session?",
    answer: "Each session lasts 45-60 minutes. You'll spend 30-40 minutes in the actual mock interview, answering questions exactly as you would in a real interview. Then, 15-20 minutes of detailed feedback where we review your responses, body language, communication style, and overall performance. You'll receive a written evaluation with specific improvement recommendations and practice exercises for weak areas."
  },
  {
    question: "How is this different from practicing with friends or classmates?",
    answer: "While peer practice is helpful, mock interviews with ex-program directors provide three critical advantages: (1) They know what programs actually look for and how scoring systems work. (2) They can identify subtle red flags and communication issues you and your friends might miss. (3) They provide professional, unbiased feedback without the social pressure of criticizing a friend. Plus, they create real interview pressure that helps you perform under stress."
  },
  {
    question: "Can mock interviews help with interview anxiety and nerves?",
    answer: "Absolutely! Interview anxiety is one of the top reasons candidates underperform. By simulating real interview conditions repeatedly, you desensitize yourself to the pressure. You'll learn to manage nerves, handle unexpected questions, and recover from mistakes. Most students report feeling 70-80% less anxious in real interviews after completing our mock interview program."
  },
  {
    question: "Do you help IMG (International Medical Graduate) applicants?",
    answer: "Yes! Over 40% of our mock interview clients are IMGs. We specialize in helping IMGs address common challenges: explaining your decision to practice in the US, discussing visa requirements, handling questions about international training, and overcoming potential communication barriers. Our IMG-specialized interviewers understand your unique situation and provide targeted coaching."
  },
  {
    question: "What if I have red flags (failed Step exams, gaps, reapplying)?",
    answer: "This is exactly why mock interviews are crucial for you. We specialize in red flag mitigation and have helped hundreds of candidates with challenging situations successfully match. We'll coach you on how to address failures honestly while reframing them positively, how to explain gaps convincingly, and how to demonstrate growth and resilience. Our Elite package includes dedicated red flag strategy sessions."
  },
  {
    question: "How soon before my interviews should I start mock interview practice?",
    answer: "Ideally, start 6-8 weeks before your first interview. This gives you time for 4-6 sessions spaced out over several weeks, allowing you to implement feedback between sessions. However, even if you have interviews starting in 1-2 weeks, intensive mock interview preparation can still significantly improve your performance. We've had successful clients who started with just 5 days before their first interview."
  },
  {
    question: "Will you ask me the exact questions programs will ask?",
    answer: "While we can't predict exact questions, we'll cover the most common question categories that account for 80-90% of interview content: 'Tell me about yourself,' 'Why our program?', 'Why this specialty?', weakness questions, clinical scenarios, ethical dilemmas, conflict resolution, leadership examples, research discussion, and red flag explanations. We also customize questions based on your specific application."
  },
  {
    question: "Do you provide recorded sessions I can review later?",
    answer: "Yes! In our Professional and Elite packages, we record all sessions (with your permission) and provide you with the videos. Watching yourself interview is incredibly valuable for identifying nervous habits, verbal fillers, body language issues, and communication patterns you might not notice in the moment. Many students say reviewing recordings was the most valuable part of their preparation."
  },
  {
    question: "Can you help me prepare for specific programs I'm interviewing at?",
    answer: "Absolutely! In our Professional and Elite packages, we research your specific programs and help you develop customized talking points, thoughtful questions to ask, and program-specific preparation. We'll help you understand each program's mission, recent achievements, faculty research, and unique characteristics so you can demonstrate genuine interest and cultural fit."
  },
  {
    question: "What's the success rate for students who complete mock interviews?",
    answer: "Our clients who complete 4+ mock interviews have a 95% match rate, compared to the national average of 81% for US MD seniors and 60% for IMGs. They also receive an average of 5.2x more interview invitations and rank 2.8 positions higher on programs' rank lists compared to before coaching. Students consistently report feeling significantly more confident and prepared."
  },
  {
    question: "How much do residency mock interviews cost?",
    answer: "Our mock interview packages range from $499 to $1,399 depending on the level of preparation you need. Essential Interview Prep ($499) includes 3 mock interviews. Professional Interview Mastery ($899) includes 6 mock interviews with strategy sessions. Elite Interview Concierge ($1,399) includes 10 mock interviews with dedicated mentorship. All packages include preparation materials, feedback reports, and email support."
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer: "Yes! Our Elite package includes a 100% money-back guarantee. If you complete all sessions, implement our feedback, and don't see measurable improvement in your interview performance, we'll refund your full investment. We're that confident in our mock interview program's effectiveness. We've never had to honor this guarantee because our methods work."
  },
  {
    question: "Can I do mock interviews for multiple specialties?",
    answer: "Yes, though we recommend focusing on your primary specialty. If you're applying to multiple specialties (e.g., Internal Medicine and Family Medicine), we can customize questions and coaching for each. However, excelling in one specialty's interview typically transfers well to others, as the core competencies programs evaluate are similar."
  },
  {
    question: "How do virtual mock interviews work technically?",
    answer: "We use Zoom, Microsoft Teams, or whichever platform your programs use. After booking, you'll receive a calendar invitation with the video link. We'll test your tech setup (camera, microphone, internet, lighting, background) before the session starts. You'll need a quiet space, reliable internet, a computer with webcam, and professional attire (at least from the waist up)."
  },
  {
    question: "What if I need to reschedule my mock interview?",
    answer: "We understand medical school schedules are unpredictable. You can reschedule any session with 24 hours notice without penalty. For last-minute emergencies (hospital obligations, family issues), we'll work with you to find a solution. We want you to be fully present and prepared for each session, so we're flexible with scheduling."
  },
  {
    question: "Will mock interviews help me even if I'm a strong interviewer already?",
    answer: "Absolutely! Even confident, experienced interviewers benefit from professional feedback. We help strong candidates polish their performance, eliminate small mistakes that add up, develop more sophisticated answer frameworks, and prepare for curveball questions. The difference between a good interview and a great interview often determines whether you're ranked #5 or #1 on a program's list."
  }
];

export default function MockInterviewsContent() {
  const mockInterviewSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Residency Mock Interview Preparation",
    "description": "Expert mock interviews for medical residency applicants led by ex-program directors. Realistic practice, personalized feedback, and proven techniques to master your residency interviews.",
    "provider": {
      "@type": "Organization",
      "name": "MyERAS Editing"
    },
    "serviceType": "Mock Interview Coaching",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.myerasediting.com/mock-interviews",
      "serviceType": "Online Service"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Essential Interview Prep",
        "price": "499",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "3 full-length mock interviews with comprehensive feedback"
      },
      {
        "@type": "Offer",
        "name": "Professional Interview Mastery",
        "price": "899",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "6 mock interviews with strategy sessions and video analysis"
      },
      {
        "@type": "Offer",
        "name": "Elite Interview Concierge",
        "price": "1399",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "10 mock interviews with dedicated ex-program director mentor"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "487",
      "bestRating": "5"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="mock-interview-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mockInterviewSchema)
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-gray-600" />
              <span>Rated 4.9/5 by 487+ Residency Applicants</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your Residency Interviews with<br />
              <span className="text-gray-600">Expert Mock Interviews</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Practice with ex-program directors who conducted 1,000+ real residency interviews.
              Realistic simulations, personalized feedback, and proven techniques. Virtual sessions available nationwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="#packages">
                <Button size="lg" className="px-8 py-6 text-base bg-gray-900 hover:bg-gray-800 text-white cursor-pointer">
                  View Mock Interview Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="px-8 py-6 text-base border-gray-300 cursor-pointer text-black">
                  See How It Works
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
                <div className="text-sm text-gray-600">Match Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Residents Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">5.2x</div>
                <div className="text-sm text-gray-600">More Callbacks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
                <div className="text-sm text-gray-600">Specialties</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Mock Interviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Residency Mock Interviews Are Essential for Match Success
            </h2>
            <p className="text-lg text-gray-600">
              Your interview performance determines 70% of your final rank. Don't leave it to chance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Programs Judge You in 15 Minutes
              </h3>
              <p className="text-gray-600">
                The average residency interview lasts just 15-20 minutes. You have one shot to prove you belong.
                Mock interviews help you make every second count by refining your answers, eliminating rambling,
                and showcasing your best self under pressure.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Red Flags Need Strategic Responses
              </h3>
              <p className="text-gray-600">
                Failed Step exams? Gap year? Reapplying? These red flags require carefully crafted responses.
                Our ex-program directors know exactly what programs want to hear and coach you to turn weaknesses
                into demonstrations of resilience and growth.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Confidence Directly Impacts Performance
              </h3>
              <p className="text-gray-600">
                Interview anxiety causes even strong candidates to underperform. By practicing in realistic,
                high-pressure simulations, you desensitize yourself to nerves. Our students report 70% less
                anxiety in real interviews after mock practice.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ex-Program Directors Know What Works
              </h3>
              <p className="text-gray-600">
                Practicing with friends is helpful, but they don't know what programs actually look for.
                Our interviewers are ex-program directors who evaluated thousands of candidates. They know
                the scoring systems, subtle red flags, and what separates ranked candidates from wait-listed ones.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Virtual Interviews Require Different Skills
              </h3>
              <p className="text-gray-600">
                Virtual interviewing isn't the same as in-person. You need to master camera presence, lighting,
                background setup, eye contact through a webcam, and managing technical issues. Our mock interviews
                simulate the exact virtual format programs use.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Competitive Specialties Demand Perfection
              </h3>
              <p className="text-gray-600">
                Applying to Dermatology, Orthopedic Surgery, or Neurosurgery? Competition is fierce and interview
                performance matters more than ever. Our specialized coaching helps you stand out in fields where
                even small mistakes can cost you your dream program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Our Mock Interview Process Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven 4-step system that transforms nervous candidates into confident interviewers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Application Review & Strategy Session
                  </h3>
                  <p className="text-gray-600">
                    Before your first mock interview, we review your ERAS application, personal statement, CV, and
                    identify potential red flags or weak areas. We develop a customized preparation strategy based
                    on your specialty, background (US MD/DO vs IMG), and interview timeline.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Realistic Mock Interview Simulation
                  </h3>
                  <p className="text-gray-600">
                    You'll participate in a 30-40 minute mock interview that replicates real residency interviews.
                    Our ex-program director asks behavioral questions, discusses your application, probes red flags,
                    and evaluates your communication skills. We create authentic pressure so you learn to perform
                    under stress.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Detailed Performance Feedback
                  </h3>
                  <p className="text-gray-600">
                    After the interview, we spend 15-20 minutes reviewing your performance in detail. You'll learn
                    what worked, what didn't, and exactly how to improve. We provide a written evaluation report
                    with specific action items, answer frameworks, and practice exercises.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Iterative Improvement & Mastery
                  </h3>
                  <p className="text-gray-600">
                    Between sessions, you practice implementing feedback. Each subsequent mock interview builds on
                    previous sessions, gradually addressing weaknesses until you achieve mastery. By your final
                    session, you'll have polished responses, controlled nerves, and unstoppable confidence.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                What You'll Receive After Each Session
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Detailed written evaluation (2-3 pages)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Recording of your mock interview (Professional & Elite packages)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Customized answer frameworks for common questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Body language and communication improvement tips</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Practice exercises to implement before next session</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Specialty-specific insights and advice</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Email support for questions between sessions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Mock Interview Packages
            </h2>
            <p className="text-lg text-gray-600">
              Choose the preparation level that matches your needs and timeline
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Essential Package */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Essential Interview Prep</h3>
              <p className="text-gray-600 mb-6">Perfect for first-time applicants</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$499</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">3 Full-Length Mock Interviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Detailed Written Feedback After Each Session</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Comprehensive Preparation Booklet</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Virtual Interview Technical Setup Guide</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Common Question Response Framework</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Email Support for 30 Days</span>
                </li>
              </ul>
              <Link href="/auth/signup">
                <Button className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Professional Package */}
            <div className="bg-gray-900 text-white rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional Interview Mastery</h3>
              <p className="text-gray-300 mb-6">Most comprehensive preparation</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$899</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Everything in Essential Package</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">6 Full-Length Mock Interviews with Expert Coaching</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Video Recordings of All Sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">2 One-on-One Strategy Sessions (45 min each)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Personalized Weakness Analysis & Improvement Plan</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Behavioral Question Deep-Dive Sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Program-Specific Research & Talking Points</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Priority Email & Phone Support for 60 Days</span>
                </li>
              </ul>
              <Link href="/auth/signup">
                <Button className="w-full bg-white hover:bg-gray-100 text-gray-900 cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Elite Package */}
            <div className="bg-white border-2 border-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Elite Interview Concierge</h3>
              <p className="text-gray-600 mb-6">White-glove coaching service</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$1,399</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Everything in Professional Package</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">10 Full-Length Mock Interviews with Video Analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Dedicated Ex-Program Director Mentor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">4 One-on-One Strategy Sessions (60 min each)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Program-by-Program Customized Preparation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Post-Interview Debrief Calls (within 24 hours)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Body Language & Communication Coaching</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Direct Phone/Text Access to Your Mentor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-semibold">100% Money-Back Guarantee</span>
                </li>
              </ul>
              <Link href="/auth/signup">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              All packages include lifetime access to preparation materials and 100% satisfaction guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Mock Interview Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Real results from residents who practiced with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gray-900 text-gray-900" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "I was terrified of interviews as an IMG. After 6 mock interviews, I felt completely confident.
                Matched at my #1 choice!"
              </p>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">Dr. Priya S., MD</div>
                <div className="text-sm text-gray-600">Internal Medicine, Johns Hopkins</div>
                <div className="text-xs text-gray-500 mt-2">6 Mock Interviews | 14 Real Interviews | Matched #1</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gray-900 text-gray-900" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Failed Step 2. Thought my career was over. Mock interviews taught me how to address it confidently.
                Now I'm at my dream surgery program."
              </p>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">Dr. Marcus J., DO</div>
                <div className="text-sm text-gray-600">General Surgery, Mayo Clinic</div>
                <div className="text-xs text-gray-500 mt-2">8 Mock Interviews | 11 Real Interviews | Matched Top 3</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gray-900 text-gray-900" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Competitive specialty, average stats. The mock interview coaching was the difference-maker.
                Programs told me I interviewed exceptionally well."
              </p>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">Dr. Emily R., MD</div>
                <div className="text-sm text-gray-600">Dermatology, Northwestern</div>
                <div className="text-xs text-gray-500 mt-2">10 Mock Interviews | 18 Real Interviews | Matched #1</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={mockInterviewFAQs}
        title="Frequently Asked Questions About Mock Interviews"
        description="Everything you need to know about residency mock interview preparation"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Master Your Residency Interviews?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join 500+ residents who prepared with our mock interviews and matched at their dream programs
          </p>

          <Link href="/auth/signup">
            <Button size="lg" className="px-10 py-6 text-base bg-white hover:bg-gray-100 text-gray-900 cursor-pointer">
              Start Mock Interview Preparation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>100% Money-back guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Start within 24 hours</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Virtual sessions available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <RelatedInterviewLinks currentPage="/mock-interviews" />

      <Footer />
    </div>
  );
}
