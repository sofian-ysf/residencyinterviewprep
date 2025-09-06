'use client';

import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Award,
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  Calendar,
  Users,
  FileText,
  ChevronRight,
  Clock,
  Mail,
  Package,
  Star
} from "lucide-react";

const writerSelection = [
  {
    type: "Department Chair",
    strength: "Institutional weight",
    when: "Strong clinical performance in their department",
    avoid: "If minimal interaction or generic letter likely"
  },
  {
    type: "Research Mentor",
    strength: "Detailed project knowledge",
    when: "Significant research contribution with publications",
    avoid: "If research is minor part of application"
  },
  {
    type: "Clinical Attending",
    strength: "Direct observation of skills",
    when: "Worked closely for 4+ weeks with excellent performance",
    avoid: "If only worked nights/weekends with minimal interaction"
  },
  {
    type: "Program Director",
    strength: "Understanding of residency readiness",
    when: "Away rotation or special program participation",
    avoid: "If from your home institution (conflict of interest)"
  }
];

const timeline = [
  {
    weeks: "8-10 weeks before",
    task: "Initial request",
    details: [
      "Send formal request email",
      "Provide CV and personal statement draft",
      "Suggest meeting to discuss"
    ]
  },
  {
    weeks: "6-8 weeks before",
    task: "Provide packet",
    details: [
      "Final personal statement",
      "List of programs applying to",
      "Key points to emphasize",
      "Submission deadline reminder"
    ]
  },
  {
    weeks: "4 weeks before",
    task: "Gentle reminder",
    details: [
      "Thank them for agreeing",
      "Confirm submission method",
      "Ask if they need anything else"
    ]
  },
  {
    weeks: "2 weeks before",
    task: "Final check",
    details: [
      "Verify submission status",
      "Provide ERAS Letter ID",
      "Express gratitude"
    ]
  },
  {
    weeks: "After submission",
    task: "Follow up",
    details: [
      "Send thank you note",
      "Update on interview invites",
      "Share match results"
    ]
  }
];

const packetComponents = [
  {
    item: "Cover Letter",
    purpose: "Summarize your request and provide context",
    include: [
      "Why you chose them as a writer",
      "Your career goals",
      "Submission deadline"
    ]
  },
  {
    item: "CV",
    purpose: "Complete overview of accomplishments",
    include: [
      "Highlighted relevant experiences",
      "Recent updates since they last worked with you",
      "Awards and publications"
    ]
  },
  {
    item: "Personal Statement",
    purpose: "Share your narrative and goals",
    include: [
      "Final or near-final version",
      "Specialty choice rationale",
      "Career vision"
    ]
  },
  {
    item: "Talking Points",
    purpose: "Guide letter content",
    include: [
      "Specific examples of your work together",
      "Unique strengths to emphasize",
      "Growth and improvement shown"
    ]
  },
  {
    item: "Program List",
    purpose: "Tailor letter if needed",
    include: [
      "Top choice programs",
      "Geographic preferences",
      "Program types (academic vs community)"
    ]
  }
];

const redFlags = [
  {
    flag: "Letter writer asks you to write it yourself",
    why: "Shows lack of investment and knowledge",
    solution: "Politely decline and find another writer"
  },
  {
    flag: "Vague commitment ('I'll try to get to it')",
    why: "High risk of late or missing letter",
    solution: "Seek more enthusiastic writer"
  },
  {
    flag: "No recent interaction (>2 years)",
    why: "Letter will lack specific, current examples",
    solution: "Reconnect first or choose someone more recent"
  },
  {
    flag: "Suggests a committee letter",
    why: "Generic and impersonal",
    solution: "Request individual letter or find alternative"
  },
  {
    flag: "Mentions they're writing many letters",
    why: "Your letter may be generic or delayed",
    solution: "Provide exceptional packet and follow up regularly"
  }
];

const emailTemplates = {
  initial: `Dear Dr. [Name],

I hope this email finds you well. I am currently applying for residency in [specialty] and would be honored if you would write a letter of recommendation on my behalf.

During our time working together [specific context], I greatly valued [specific learning/experience]. Your mentorship in [specific area] has been instrumental in my development as a future [specialty] physician.

I am applying to [number] programs with a focus on [program characteristics]. My application will highlight [key strengths], which you observed firsthand when [specific example].

The deadline for submission is [date]. I would be happy to provide any materials that would be helpful, including my CV, personal statement, and a summary of our work together.

Would you be available to meet briefly to discuss my application? I am flexible with timing and happy to work around your schedule.

Thank you for considering this request.

Best regards,
[Your name]`,

  reminder: `Dear Dr. [Name],

I wanted to thank you again for agreeing to write a letter of recommendation for my residency application.

As a reminder, the submission deadline is [date] through ERAS. The Letter ID is [ID number].

Please let me know if you need any additional information or if there's anything else I can provide to assist you.

Thank you again for your support.

Best regards,
[Your name]`,

  thanks: `Dear Dr. [Name],

I wanted to express my sincere gratitude for writing my letter of recommendation.

I'm excited to share that I have received interview invitations from [number/names of programs]. Your support has been invaluable in this process.

I will keep you updated on my progress and final match results.

Thank you again for your mentorship and advocacy.

Warm regards,
[Your name]`
};

export default function LettersOfRecommendationGuide() {
  const [activeSection, setActiveSection] = useState('choosing');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/guides" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Guides
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Letters of Recommendation</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-gray-700" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Letters of Recommendation
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Secure strong endorsements from the right recommenders with strategic planning and professional communication.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl">
              <div>
                <div className="text-2xl font-bold text-gray-900">45%</div>
                <div className="text-sm text-gray-600">Choose suboptimal writers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">3-4</div>
                <div className="text-sm text-gray-600">Letters required</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">8-10 wks</div>
                <div className="text-sm text-gray-600">Advance notice needed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2-3 wks</div>
                <div className="text-sm text-gray-600">Coordination time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'choosing', label: 'Choosing Writers', icon: Users },
              { id: 'timeline', label: 'Timeline Strategy', icon: Calendar },
              { id: 'packet', label: 'Packet Preparation', icon: Package },
              { id: 'followup', label: 'Follow-up', icon: Mail }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Choosing Writers */}
          {activeSection === 'choosing' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choosing the Right Writers</h2>
              
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">The Ideal Letter Writer</h4>
                    <p className="text-sm text-gray-700">
                      Someone who knows you well, can speak to your clinical abilities, has observed your growth, 
                      and carries weight in the medical community. Quality trumps title every time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {writerSelection.map((writer, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-900 text-lg">{writer.type}</h3>
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Strength</p>
                        <p className="text-sm text-gray-700">{writer.strength}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Best When</p>
                        <p className="text-sm text-gray-700">{writer.when}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Avoid If</p>
                        <p className="text-sm text-gray-700">{writer.avoid}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Red Flags to Watch For</h3>
                <div className="space-y-4">
                  {redFlags.map((flag, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <X className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">{flag.flag}</p>
                          <p className="text-sm text-gray-600 mb-2">{flag.why}</p>
                          <p className="text-sm text-green-700">
                            <strong>Solution:</strong> {flag.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Timeline Strategy */}
          {activeSection === 'timeline' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline Strategy</h2>
              
              <div className="space-y-6">
                {timeline.map((phase, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-32 bg-gray-100 rounded-lg px-3 py-2 text-center">
                        <Clock className="h-4 w-4 text-gray-600 mx-auto mb-1" />
                        <p className="text-xs font-semibold text-gray-900">{phase.weeks}</p>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">{phase.task}</h3>
                      <ul className="space-y-2">
                        {phase.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Critical Deadline</h4>
                    <p className="text-sm text-gray-700">
                      Most programs require letters by the ERAS submission deadline (late September), 
                      but some may have earlier deadlines. Always verify with each program and give 
                      your writers the earliest deadline to ensure all letters arrive on time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Packet Preparation */}
          {activeSection === 'packet' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Packet Preparation</h2>
              
              <div className="space-y-6">
                {packetComponents.map((component, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{component.item}</h3>
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{component.purpose}</p>
                    </div>
                    <div className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Include:</p>
                      <ul className="space-y-2">
                        {component.include.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Pro Tips for Packet Success</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Make it easy - provide everything in one organized PDF",
                    "Be specific - give concrete examples they can use",
                    "Show growth - highlight how you've improved",
                    "Be memorable - remind them of standout moments",
                    "Stay professional - proofread everything carefully",
                    "Express gratitude - acknowledge their time investment"
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Follow-up */}
          {activeSection === 'followup' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow-up & Communication</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Email Templates</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h4 className="font-medium text-gray-900">Initial Request</h4>
                      </div>
                      <div className="p-6">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans bg-gray-50 rounded-lg p-4">
                          {emailTemplates.initial}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h4 className="font-medium text-gray-900">Reminder Email</h4>
                      </div>
                      <div className="p-6">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans bg-gray-50 rounded-lg p-4">
                          {emailTemplates.reminder}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h4 className="font-medium text-gray-900">Thank You Note</h4>
                      </div>
                      <div className="p-6">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans bg-gray-50 rounded-lg p-4">
                          {emailTemplates.thanks}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Follow-up Best Practices</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        <strong>Be respectful:</strong> Give at least 2 weeks between reminders
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        <strong>Stay organized:</strong> Track submission status for each writer
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        <strong>Offer assistance:</strong> Ask if they need any additional information
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        <strong>Express gratitude:</strong> Thank them multiple times throughout the process
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        <strong>Close the loop:</strong> Always update them on your match results
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Maximize Your Letters' Impact
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our review service helps ensure your entire application package, including how you present yourself to letter writers, is optimized for success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start Your Review
              </button>
            </Link>
            <Link href="/pricing">
              <button className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700">
                View Pricing
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}