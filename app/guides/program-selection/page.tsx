'use client';

import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Target,
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  MapPin,
  Signal,
  TrendingUp,
  ChevronRight,
  BarChart3,
  Search,
  Layers,
  Star
} from "lucide-react";

const signalStrategy = {
  overview: "Programs receive a signal that you have genuine interest. Use strategically - signals significantly increase interview chances.",
  distribution: [
    {
      tier: "Reach Programs",
      percentage: "20-30%",
      signals: "1-2 signals",
      description: "Top-tier programs where you're below average stats"
    },
    {
      tier: "Target Programs",
      percentage: "50-60%",
      signals: "3-4 signals",
      description: "Programs where your stats align with their averages"
    },
    {
      tier: "Safety Programs",
      percentage: "20-30%",
      signals: "0-1 signals",
      description: "Programs where you exceed their typical stats"
    }
  ],
  tips: [
    "Signal programs you genuinely want to attend",
    "Consider geographic ties when signaling",
    "Don't waste signals on extreme reaches",
    "Research program-specific signal impact"
  ]
};

const geographicFactors = [
  {
    factor: "Home State/Region",
    impact: "High",
    strategy: "Apply broadly to home state programs",
    example: "CA residents have advantage at CA programs"
  },
  {
    factor: "Medical School Region",
    impact: "Moderate-High",
    strategy: "Leverage regional connections",
    example: "Northeast schools favor northeast applicants"
  },
  {
    factor: "Away Rotation Location",
    impact: "Moderate",
    strategy: "Apply where you've rotated",
    example: "Away rotation = demonstrated interest"
  },
  {
    factor: "No Geographic Ties",
    impact: "Variable",
    strategy: "Explain interest in personal statement",
    example: "Research specific program features"
  }
];

const programResearch = {
  sources: [
    {
      name: "FREIDA (AMA)",
      type: "Database",
      info: "Program demographics, salary, benefits",
      cost: "Free"
    },
    {
      name: "Doximity Residency Navigator",
      type: "Rankings & Reviews",
      info: "Rankings, resident reviews, match data",
      cost: "Free"
    },
    {
      name: "Program Websites",
      type: "Official Info",
      info: "Curriculum, faculty, culture",
      cost: "Free"
    },
    {
      name: "NRMP Charting Outcomes",
      type: "Match Statistics",
      info: "Score ranges, research requirements",
      cost: "Free"
    },
    {
      name: "Reddit/SDN Forums",
      type: "Peer Discussion",
      info: "Interview experiences, culture insights",
      cost: "Free"
    }
  ],
  keyMetrics: [
    "Step score ranges of matched applicants",
    "Average number of publications",
    "Percentage of IMGs/DOs matched",
    "Geographic distribution of residents",
    "Fellowship match rates",
    "Board pass rates",
    "Resident satisfaction scores",
    "Program size and structure"
  ]
};

const applicationTiers = [
  {
    tier: "Reach",
    percentage: "20-25%",
    characteristics: [
      "Step scores 10+ points above yours",
      "Top 20 programs in specialty",
      "Historically low IMG/DO acceptance",
      "No geographic connection"
    ],
    number: "5-8 programs",
    strategy: "Apply if genuinely interested, but don't over-invest"
  },
  {
    tier: "Target",
    percentage: "50-60%",
    characteristics: [
      "Step scores within 5 points",
      "Similar applicant profiles match",
      "Some geographic connection",
      "Aligned research interests"
    ],
    number: "15-25 programs",
    strategy: "Core of your application list - research thoroughly"
  },
  {
    tier: "Safety",
    percentage: "20-25%",
    characteristics: [
      "Step scores below yours",
      "Community programs",
      "Strong geographic ties",
      "History of matching similar applicants"
    ],
    number: "5-10 programs",
    strategy: "Ensure good fit - don't apply somewhere you wouldn't go"
  }
];

const specialtyGuidelines = [
  {
    specialty: "Internal Medicine",
    avgPrograms: "30-40",
    competitive: "Moderate",
    notes: "Apply broadly, consider categorical vs preliminary"
  },
  {
    specialty: "Surgery",
    avgPrograms: "40-60",
    competitive: "High",
    notes: "Need backup specialty, strong research important"
  },
  {
    specialty: "Pediatrics",
    avgPrograms: "25-35",
    competitive: "Moderate",
    notes: "Geographic clustering common"
  },
  {
    specialty: "Emergency Medicine",
    avgPrograms: "35-45",
    competitive: "Moderate-High",
    notes: "Away rotations crucial, SLOEs matter most"
  },
  {
    specialty: "Radiology",
    avgPrograms: "35-45",
    competitive: "High",
    notes: "Need preliminary year, research important"
  },
  {
    specialty: "Psychiatry",
    avgPrograms: "25-35",
    competitive: "Low-Moderate",
    notes: "Personal statement crucial, diverse backgrounds welcome"
  },
  {
    specialty: "Anesthesiology",
    avgPrograms: "30-40",
    competitive: "Moderate",
    notes: "Away rotations helpful, regional preferences strong"
  },
  {
    specialty: "Dermatology",
    avgPrograms: "60-80",
    competitive: "Very High",
    notes: "Need backup specialty, research essential"
  }
];

export default function ProgramSelectionGuide() {
  const [activeSection, setActiveSection] = useState('signal');

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
            <span className="text-gray-900 font-medium">Program Selection</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-gray-700" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Program Selection Strategy
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Build a strategic list that maximizes your match potential with the right mix of reach, target, and safety programs.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl">
              <div>
                <div className="text-2xl font-bold text-gray-900">71%</div>
                <div className="text-sm text-gray-600">Apply to wrong tier</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">35-45</div>
                <div className="text-sm text-gray-600">Optimal programs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">100+ hrs</div>
                <div className="text-sm text-gray-600">Research time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5-7</div>
                <div className="text-sm text-gray-600">Signals available</div>
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
              { id: 'signal', label: 'Signal Strategy', icon: Signal },
              { id: 'geographic', label: 'Geographic Factors', icon: MapPin },
              { id: 'research', label: 'Program Research', icon: Search },
              { id: 'tiers', label: 'Application Tiers', icon: Layers }
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
          {/* Signal Strategy */}
          {activeSection === 'signal' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Signal Strategy</h2>
              
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Signal className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What are Signals?</h4>
                    <p className="text-sm text-gray-700">
                      {signalStrategy.overview}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <h3 className="font-semibold text-gray-900">Signal Distribution Strategy</h3>
                {signalStrategy.distribution.map((tier, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{tier.tier}</h4>
                      <div className="flex gap-2">
                        <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tier.percentage}
                        </span>
                        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {tier.signals}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{tier.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Signal Best Practices</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {signalStrategy.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Geographic Factors */}
          {activeSection === 'geographic' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Geographic Factors</h2>
              
              <div className="space-y-6">
                {geographicFactors.map((factor, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{factor.factor}</h3>
                        <p className="text-sm text-gray-600 mt-1">{factor.strategy}</p>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                        factor.impact === 'High' 
                          ? 'bg-green-100 text-green-700'
                          : factor.impact === 'Moderate-High'
                          ? 'bg-blue-100 text-blue-700'
                          : factor.impact === 'Moderate'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {factor.impact} Impact
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <strong>Example:</strong> {factor.example}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Geographic Strategy Tips</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Programs favor regional applicants to reduce flight risk</li>
                      <li>• Explain any geographic preferences in your personal statement</li>
                      <li>• Consider couples match geographic limitations early</li>
                      <li>• Research cost of living differences between regions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Program Research */}
          {activeSection === 'research' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Research Methods</h2>
              
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Research Sources</h3>
                <div className="space-y-4">
                  {programResearch.sources.map((source, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{source.name}</h4>
                        <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {source.cost}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{source.type}</p>
                      <p className="text-sm text-gray-700">{source.info}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Key Metrics to Research</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {programResearch.keyMetrics.map((metric, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <BarChart3 className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">Research Spreadsheet Template</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Create a comprehensive spreadsheet with these columns:
                </p>
                <div className="bg-white rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {[
                      "Program Name", "Location", "Program Size",
                      "Step 1 Average", "Step 2 Average", "Research Required",
                      "IMG Friendly", "DO Friendly", "Geographic Preference",
                      "Signal?", "Personal Connection", "Notes"
                    ].map((col, idx) => (
                      <div key={idx} className="bg-gray-50 px-2 py-1 rounded text-gray-700">
                        {col}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Application Tiers */}
          {activeSection === 'tiers' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Building Your Application Tiers</h2>
              
              <div className="space-y-6 mb-8">
                {applicationTiers.map((tier, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className={`px-6 py-4 border-b ${
                      tier.tier === 'Reach' 
                        ? 'bg-purple-50 border-purple-200'
                        : tier.tier === 'Target'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">{tier.tier} Programs</h3>
                        <div className="flex gap-2">
                          <span className="text-sm bg-white px-2 py-1 rounded text-gray-700">
                            {tier.percentage}
                          </span>
                          <span className="text-sm bg-white px-2 py-1 rounded text-gray-700">
                            {tier.number}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-700 font-medium mb-3">Characteristics:</p>
                      <ul className="space-y-2 mb-4">
                        {tier.characteristics.map((char, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{char}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">
                          <strong>Strategy:</strong> {tier.strategy}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Specialty-Specific Guidelines</h3>
                <div className="space-y-3">
                  {specialtyGuidelines.map((specialty, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{specialty.specialty}</h4>
                        <div className="flex gap-2">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {specialty.avgPrograms} programs
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            specialty.competitive === 'Very High'
                              ? 'bg-red-100 text-red-700'
                              : specialty.competitive === 'High'
                              ? 'bg-orange-100 text-orange-700'
                              : specialty.competitive === 'Moderate-High'
                              ? 'bg-yellow-100 text-yellow-700'
                              : specialty.competitive === 'Moderate'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {specialty.competitive}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{specialty.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Program Selection Timeline</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { month: "April-May", task: "Initial research", detail: "Create preliminary list of 60-80 programs" },
                { month: "June-July", task: "Deep dive research", detail: "Narrow to 40-50 programs, schedule away rotations" },
                { month: "August", task: "Finalize list", detail: "Final list of 35-45 programs, assign signal strategy" },
                { month: "September", task: "Submit applications", detail: "Send signals, complete secondaries promptly" },
                { month: "October+", task: "Track & adjust", detail: "Monitor interview invites, consider adding programs if needed" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-28 flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-900">{item.month}</span>
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
            Optimize Your Program List
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our reviewers help ensure you're applying to the right programs for your profile.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Get Strategic Review
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