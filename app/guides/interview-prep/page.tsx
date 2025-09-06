'use client';

import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Users,
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  Video,
  MessageSquare,
  Mail,
  ChevronRight,
  Monitor,
  Mic,
  Camera,
  Clock
} from "lucide-react";

const virtualSetup = {
  technical: [
    {
      item: "Internet Connection",
      requirement: "Stable, 10+ Mbps",
      test: "Run speed test, have backup hotspot ready",
      common_issues: "Lag, freezing, disconnections"
    },
    {
      item: "Camera",
      requirement: "HD webcam at eye level",
      test: "Check lighting, background, and angle",
      common_issues: "Poor lighting, distracting background"
    },
    {
      item: "Audio",
      requirement: "Clear microphone, quiet environment",
      test: "Use headphones, test echo cancellation",
      common_issues: "Echo, background noise, muffled sound"
    },
    {
      item: "Software",
      requirement: "Updated Zoom/Teams/Skype",
      test: "Test screen sharing, virtual background",
      common_issues: "Outdated version, permission issues"
    }
  ],
  environment: [
    "Neutral, professional background",
    "Good frontal lighting (face the window)",
    "Eliminate distractions (pets, people, phones)",
    "Professional attire (full suit, even bottom half)",
    "Have water, tissues, and notes nearby but off-camera"
  ]
};

const commonQuestions = {
  tellMeAboutYourself: {
    category: "Opening",
    frequency: "100%",
    approach: "2-minute structured response",
    framework: "Present (medical school) → Past (what led you here) → Future (career goals)",
    example: "I'm a fourth-year medical student at X, currently completing my sub-I in internal medicine. My path to medicine began... Looking forward, I'm excited about..."
  },
  whyThisSpecialty: {
    category: "Specialty Interest",
    frequency: "95%",
    approach: "Specific experiences + personal fit",
    framework: "Initial exposure → Confirming experiences → What you love about it → Future vision",
    example: "My interest in emergency medicine crystallized during... What excites me most is the intersection of..."
  },
  whyOurProgram: {
    category: "Program Specific",
    frequency: "100%",
    approach: "Research-based, specific features",
    framework: "Unique aspects → How they align with your goals → What you contribute",
    example: "Three aspects particularly attract me: your global health track aligns with my experience in..."
  },
  strengthsWeaknesses: {
    category: "Self-Assessment",
    frequency: "80%",
    approach: "Honest but strategic",
    framework: "Strength with evidence → Real weakness → Steps to improve",
    example: "My greatest strength is building rapport with difficult patients... An area I'm working on is..."
  },
  difficultSituation: {
    category: "Behavioral",
    frequency: "75%",
    approach: "STAR method",
    framework: "Situation → Task → Action → Result → Learning",
    example: "During my surgery rotation, I encountered a situation where..."
  },
  questionsForUs: {
    category: "Closing",
    frequency: "100%",
    approach: "Thoughtful, researched questions",
    framework: "Show you've done homework → Genuine curiosity → Not found on website",
    example: "I noticed residents can pursue the QI certificate - how do residents typically integrate this with clinical duties?"
  }
};

const behavioralQuestions = [
  {
    type: "Teamwork",
    questions: [
      "Describe a time you worked with a difficult team member",
      "Tell me about a successful team project",
      "How do you handle disagreements with colleagues?"
    ],
    tip: "Focus on collaboration and communication"
  },
  {
    type: "Leadership",
    questions: [
      "Give an example of when you led a team",
      "Describe a time you motivated others",
      "How do you delegate responsibilities?"
    ],
    tip: "Show initiative and ability to inspire others"
  },
  {
    type: "Problem-Solving",
    questions: [
      "Describe a complex problem you solved",
      "Tell me about a time you had to think creatively",
      "How do you approach systematic issues?"
    ],
    tip: "Demonstrate analytical thinking and innovation"
  },
  {
    type: "Ethics",
    questions: [
      "Describe an ethical dilemma you faced",
      "How would you handle a colleague's mistake?",
      "What would you do if asked to do something against policy?"
    ],
    tip: "Show integrity and professional judgment"
  }
];

const mmiFormat = {
  structure: "6-10 stations, 7-10 minutes each",
  types: [
    {
      station: "Ethical Scenario",
      example: "A colleague asks to copy your research data",
      approach: "Identify stakeholders → Consider perspectives → Propose balanced solution"
    },
    {
      station: "Role Play",
      example: "Comfort an angry patient",
      approach: "Listen actively → Empathize → Address concerns → Follow up"
    },
    {
      station: "Teamwork Task",
      example: "Build structure with partner",
      approach: "Communicate clearly → Collaborate → Adapt strategy → Support partner"
    },
    {
      station: "Critical Thinking",
      example: "Healthcare policy discussion",
      approach: "Consider multiple viewpoints → Use evidence → Acknowledge limitations"
    }
  ],
  tips: [
    "Read prompts carefully - use full prep time",
    "Structure responses with clear framework",
    "Think aloud to show reasoning process",
    "Stay calm if you struggle - recovery matters",
    "Practice with timer to manage pace"
  ]
};

const thankYouNotes = {
  timeline: "Within 24-48 hours",
  format: "Email (unless specifically told otherwise)",
  structure: [
    "Thank for time and specific conversation point",
    "Reiterate interest with specific program aspect",
    "Brief mention of your fit/contribution",
    "Professional closing"
  ],
  template: `Dear Dr. [Name],

Thank you for taking the time to speak with me yesterday about the [Specialty] residency program at [Institution]. I particularly enjoyed our discussion about [specific topic discussed].

Our conversation reinforced my interest in your program, especially [specific program feature]. I believe my experience in [relevant experience] would allow me to contribute meaningfully to [specific aspect].

I look forward to the possibility of joining your program and contributing to [specific mission/goal discussed].

Best regards,
[Your name]`,
  dos: [
    "Personalize each note with specific details",
    "Keep it concise (under 200 words)",
    "Proofread carefully for errors",
    "Send to all interviewers if possible",
    "Save copies for reference"
  ],
  donts: [
    "Send generic template to everyone",
    "Mention other programs you're considering",
    "Try to clarify interview answers",
    "Be overly casual or familiar",
    "Forget to spell names correctly"
  ]
};

export default function InterviewPrepGuide() {
  const [activeSection, setActiveSection] = useState('virtual');

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
            <span className="text-gray-900 font-medium">Interview Preparation</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-700" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Interview Preparation
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Present yourself confidently in virtual and in-person settings with comprehensive preparation strategies.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl">
              <div>
                <div className="text-2xl font-bold text-gray-900">58%</div>
                <div className="text-sm text-gray-600">Struggle with common Qs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">20+</div>
                <div className="text-sm text-gray-600">Practice sessions needed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">70%</div>
                <div className="text-sm text-gray-600">Virtual interviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24-48hr</div>
                <div className="text-sm text-gray-600">Thank you window</div>
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
              { id: 'virtual', label: 'Virtual Setup', icon: Video },
              { id: 'questions', label: 'Common Questions', icon: MessageSquare },
              { id: 'mmi', label: 'MMI Format', icon: Clock },
              { id: 'thankyou', label: 'Thank You Notes', icon: Mail }
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
          {/* Virtual Setup */}
          {activeSection === 'virtual' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Virtual Interview Setup</h2>
              
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Technical Requirements</h3>
                <div className="space-y-4">
                  {virtualSetup.technical.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {item.item === 'Camera' && <Camera className="h-5 w-5 text-gray-400" />}
                          {item.item === 'Audio' && <Mic className="h-5 w-5 text-gray-400" />}
                          {item.item === 'Internet Connection' && <Monitor className="h-5 w-5 text-gray-400" />}
                          {item.item === 'Software' && <Monitor className="h-5 w-5 text-gray-400" />}
                          <h4 className="font-medium text-gray-900">{item.item}</h4>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">Requirement</p>
                          <p className="text-gray-700">{item.requirement}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">How to Test</p>
                          <p className="text-gray-700">{item.test}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Common Issues</p>
                          <p className="text-gray-700">{item.common_issues}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Environment Setup Checklist</h3>
                <div className="space-y-2">
                  {virtualSetup.environment.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Day-Of Tips</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Log in 5 minutes early, but not more</li>
                      <li>• Have phone on silent as backup device</li>
                      <li>• Close all other applications</li>
                      <li>• Have program website open in browser</li>
                      <li>• Keep notes visible but look at camera when speaking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common Questions */}
          {activeSection === 'questions' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Interview Questions</h2>
              
              <div className="space-y-6">
                {Object.entries(commonQuestions).map(([key, question]) => (
                  <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{question.category}</p>
                        </div>
                        <span className="text-sm bg-white px-2 py-1 rounded text-gray-700">
                          Asked {question.frequency}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Approach:</p>
                          <p className="text-sm text-gray-600">{question.approach}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Framework:</p>
                          <p className="text-sm text-gray-600">{question.framework}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Example Response:</p>
                          <p className="text-sm text-gray-600 italic">"{question.example}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Behavioral Questions by Category</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {behavioralQuestions.map((category, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-medium text-gray-900 mb-3">{category.type}</h4>
                      <ul className="space-y-2 mb-4">
                        {category.questions.map((q, idx) => (
                          <li key={idx} className="text-sm text-gray-700">• {q}</li>
                        ))}
                      </ul>
                      <p className="text-sm text-blue-700 font-medium">
                        💡 {category.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MMI Format */}
          {activeSection === 'mmi' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">MMI (Multiple Mini Interview) Format</h2>
              
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Format Overview</h4>
                    <p className="text-sm text-gray-700">{mmiFormat.structure}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <h3 className="font-semibold text-gray-900">Station Types</h3>
                {mmiFormat.types.map((station, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <h4 className="font-medium text-gray-900 mb-3">{station.station}</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">
                          <strong>Example:</strong> {station.example}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Approach:</p>
                        <p className="text-sm text-gray-600">{station.approach}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">MMI Success Tips</h3>
                <div className="space-y-2">
                  {mmiFormat.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Thank You Notes */}
          {activeSection === 'thankyou' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Thank You Notes</h2>
              
              <div className="mb-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    Timing & Format
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>When:</strong> {thankYouNotes.timeline}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>How:</strong> {thankYouNotes.format}
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Structure</h3>
                  <ol className="space-y-2">
                    {thankYouNotes.structure.map((step, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        {idx + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Sample Thank You Email</h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans bg-white rounded-lg p-4 border border-gray-200">
                  {thankYouNotes.template}
                </pre>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    Do's
                  </h3>
                  <ul className="space-y-2">
                    {thankYouNotes.dos.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <X className="h-5 w-5 text-red-600" />
                    Don'ts
                  </h3>
                  <ul className="space-y-2">
                    {thankYouNotes.donts.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Practice Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Interview Practice Timeline</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { week: "4 weeks before", task: "Research programs", detail: "Study each program's unique features" },
                { week: "3 weeks before", task: "Practice basics", detail: "Master tell me about yourself, why specialty" },
                { week: "2 weeks before", task: "Mock interviews", detail: "Full mock interviews with feedback" },
                { week: "1 week before", task: "Final prep", detail: "Review notes, test technology, prepare outfit" },
                { week: "Day before", task: "Light review", detail: "Relax, review key points, early sleep" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-32 flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-900">{item.week}</span>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900">{item.task}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Perfect Your Interview Skills
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Get personalized coaching and feedback to ensure you're ready for any interview format.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Get Interview Coaching
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