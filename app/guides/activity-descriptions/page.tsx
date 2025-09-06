'use client';

import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  BookOpen,
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  Target,
  Lightbulb,
  TrendingUp,
  ChevronRight,
  BarChart,
  Users,
  Award,
  Edit3
} from "lucide-react";

const starMethod = {
  S: {
    title: "Situation",
    description: "Set the context",
    example: "During my rotation at City Hospital's busy emergency department...",
    tips: ["Be specific about setting", "Include relevant challenges", "Keep it concise"]
  },
  T: {
    title: "Task",
    description: "Explain your responsibility",
    example: "I was tasked with improving patient flow and reducing wait times...",
    tips: ["Clarify your role", "Highlight leadership", "Show initiative"]
  },
  A: {
    title: "Action",
    description: "Detail what you did",
    example: "I developed a triage protocol, trained staff, and implemented...",
    tips: ["Use action verbs", "Be specific", "Show skills"]
  },
  R: {
    title: "Result",
    description: "Quantify the impact",
    example: "Reduced wait times by 35% and improved satisfaction scores by 20%...",
    tips: ["Use numbers", "Show outcomes", "Link to medicine"]
  }
};

const quantifyingExamples = [
  {
    category: "Clinical Experience",
    weak: "Saw many patients in clinic",
    strong: "Evaluated 30+ patients weekly, maintaining 98% documentation compliance",
    improvement: "Added specific numbers and quality metric"
  },
  {
    category: "Research",
    weak: "Contributed to research project",
    strong: "Analyzed 500+ patient records, contributing to 2 publications with 15+ citations",
    improvement: "Specified scope and tangible outputs"
  },
  {
    category: "Leadership",
    weak: "Led student organization",
    strong: "Led 25-member organization, increasing membership 40% and securing $5,000 funding",
    improvement: "Quantified team size and achievements"
  },
  {
    category: "Volunteer Work",
    weak: "Volunteered at free clinic",
    strong: "Provided care to 200+ underserved patients over 150 volunteer hours",
    improvement: "Added hours and patient impact"
  },
  {
    category: "Teaching",
    weak: "Tutored other students",
    strong: "Tutored 15 students, with 93% achieving target scores and 100% passing rate",
    improvement: "Included success metrics"
  }
];

const leadershipExamples = [
  {
    title: "Clinical Leadership",
    description: "Chief resident responsibilities",
    elements: [
      "Coordinated schedules for 12 residents",
      "Implemented new handoff protocol",
      "Reduced medical errors by 25%"
    ]
  },
  {
    title: "Research Leadership",
    description: "Principal investigator role",
    elements: [
      "Managed $50,000 grant budget",
      "Supervised 5 research assistants",
      "Published in high-impact journal"
    ]
  },
  {
    title: "Community Leadership",
    description: "Health initiative founder",
    elements: [
      "Established diabetes screening program",
      "Recruited 20 volunteers",
      "Screened 500+ community members"
    ]
  },
  {
    title: "Educational Leadership",
    description: "Curriculum development",
    elements: [
      "Designed new clinical skills course",
      "Trained 8 faculty instructors",
      "Improved student scores by 15%"
    ]
  }
];

const researchWriting = {
  structure: [
    { section: "Project Overview", content: "Brief description of research question and significance" },
    { section: "Your Role", content: "Specific responsibilities and contributions" },
    { section: "Methods/Skills", content: "Techniques learned and applied" },
    { section: "Results/Impact", content: "Findings and their clinical relevance" },
    { section: "Future Direction", content: "How this shapes your career goals" }
  ],
  powerWords: [
    "Investigated", "Analyzed", "Developed", "Designed", "Discovered",
    "Validated", "Optimized", "Characterized", "Established", "Pioneered"
  ],
  avoidWords: [
    "Helped", "Assisted", "Participated", "Involved", "Some", "Various"
  ]
};

const activityTypes = [
  {
    type: "Work Experience",
    limit: "15 entries",
    priority: "Most relevant clinical experiences first",
    tips: ["Include all clinical rotations", "Highlight unique responsibilities", "Show progression"]
  },
  {
    type: "Research Experience",
    limit: "10 entries",
    priority: "Publications and presentations prominently",
    tips: ["List all authors correctly", "Include submission status", "Explain your contribution"]
  },
  {
    type: "Volunteer Experience",
    limit: "10 entries",
    priority: "Medical and leadership roles",
    tips: ["Show long-term commitment", "Highlight patient interaction", "Quantify impact"]
  },
  {
    type: "Extracurricular Activities",
    limit: "10 entries",
    priority: "Leadership and unique interests",
    tips: ["Show well-roundedness", "Include non-medical if significant", "Demonstrate soft skills"]
  }
];

export default function ActivityDescriptionsGuide() {
  const [activeSection, setActiveSection] = useState('star');

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
            <span className="text-gray-900 font-medium">Activity Descriptions</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-gray-700" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Activity Descriptions
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform your experiences into quantified achievements that demonstrate your readiness for residency.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl">
              <div>
                <div className="text-2xl font-bold text-gray-900">82%</div>
                <div className="text-sm text-gray-600">Miss quantifiable impacts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">700</div>
                <div className="text-sm text-gray-600">Character limit</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">15</div>
                <div className="text-sm text-gray-600">Max work entries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">3-4 hrs</div>
                <div className="text-sm text-gray-600">Per description</div>
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
              { id: 'star', label: 'STAR Method', icon: Target },
              { id: 'quantify', label: 'Quantifying Impact', icon: BarChart },
              { id: 'leadership', label: 'Leadership Examples', icon: Users },
              { id: 'research', label: 'Research Writing', icon: Edit3 }
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
          {/* STAR Method */}
          {activeSection === 'star' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">The STAR Method Framework</h2>
              
              <div className="space-y-6">
                {Object.entries(starMethod).map(([key, section]) => (
                  <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold">
                          {key}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <p className="text-sm italic text-gray-700">"{section.example}"</p>
                      </div>
                      <div className="space-y-2">
                        {section.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Complete STAR Example</h3>
                <div className="bg-white rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                  <p className="mb-2">
                    <strong>S:</strong> During my internal medicine rotation at a 500-bed urban hospital, our team struggled with high readmission rates for CHF patients.
                  </p>
                  <p className="mb-2">
                    <strong>T:</strong> I took initiative to develop an improved discharge education protocol for heart failure patients.
                  </p>
                  <p className="mb-2">
                    <strong>A:</strong> I researched best practices, created visual aids in English and Spanish, conducted teach-back sessions with 50+ patients, and trained 8 nurses on the new protocol.
                  </p>
                  <p>
                    <strong>R:</strong> 30-day readmission rates decreased from 22% to 14% over 3 months, and patient satisfaction scores improved by 25%. The protocol was adopted hospital-wide.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quantifying Impact */}
          {activeSection === 'quantify' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quantifying Your Impact</h2>
              
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">The Power of Numbers</h4>
                    <p className="text-sm text-gray-700">
                      Programs use algorithms to screen applications. Quantified achievements signal 
                      high performance and make your experiences memorable and comparable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {quantifyingExamples.map((example, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">{example.category}</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Weak:</p>
                            <p className="text-sm text-gray-700 italic">"{example.weak}"</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Strong:</p>
                            <p className="text-sm text-gray-700 italic">"{example.strong}"</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">
                          <strong>Improvement:</strong> {example.improvement}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Metrics to Track</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Number of patients/cases",
                    "Percentage improvements",
                    "Dollar amounts (grants, funding)",
                    "Time saved/efficiency gains",
                    "Team size managed",
                    "Publications/presentations",
                    "Success/pass rates",
                    "Awards/recognition received"
                  ].map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Leadership Examples */}
          {activeSection === 'leadership' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership Examples</h2>
              
              <div className="grid gap-6">
                {leadershipExamples.map((example, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{example.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                      </div>
                      <Award className="h-5 w-5 text-gray-400" />
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Key Accomplishments
                      </p>
                      <ul className="space-y-2">
                        {example.elements.map((element, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{element}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">Leadership Formula</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Context:</strong> What challenge or opportunity did you identify?</p>
                  <p><strong>Initiative:</strong> What solution did you propose/implement?</p>
                  <p><strong>Execution:</strong> How did you mobilize resources and people?</p>
                  <p><strong>Impact:</strong> What measurable change did you achieve?</p>
                  <p><strong>Legacy:</strong> What lasting improvement did you leave?</p>
                </div>
              </div>
            </div>
          )}

          {/* Research Writing */}
          {activeSection === 'research' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Writing</h2>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Research Description Structure</h3>
                <div className="space-y-3">
                  {researchWriting.structure.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.section}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    Power Words to Use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {researchWriting.powerWords.map((word, idx) => (
                      <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-green-200">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <X className="h-5 w-5 text-red-600" />
                    Words to Avoid
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {researchWriting.avoidWords.map((word, idx) => (
                      <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-red-200">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sample Research Description</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                  <p>
                    Investigated novel biomarkers for early detection of pancreatic adenocarcinoma under Dr. Smith 
                    at Memorial Cancer Center. Designed and validated ELISA protocols for measuring serum CA19-9 
                    and CEA levels in 200+ patient samples. Performed statistical analysis using R, identifying 
                    a 3-marker panel with 85% sensitivity and 90% specificity for stage I-II disease. Results 
                    contributed to Nature Medicine publication (2nd author) and NIH R01 grant renewal. Presented 
                    findings at AACR conference, receiving Outstanding Abstract Award. This experience solidified 
                    my interest in combining clinical practice with translational research in oncology.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Activity Types Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Activity Categories</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {activityTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900">{type.type}</h3>
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {type.limit}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{type.priority}</p>
                <div className="space-y-2">
                  {type.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Transform Your Experiences
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our reviewers help you craft descriptions that make programs take notice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Get Your Activities Reviewed
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