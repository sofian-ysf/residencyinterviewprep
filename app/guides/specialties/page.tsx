'use client';

import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Stethoscope,
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  Award,
  Users,
  Target,
  BarChart3
} from "lucide-react";

const matchStatistics = [
  {
    specialty: "Anesthesiology",
    positions: "1,804",
    applicants: "2,089",
    matchRate: "73%",
    avgStep1: "234",
    avgStep2: "246",
    avgPubs: "3.7",
    competitiveness: "Moderate"
  },
  {
    specialty: "Dermatology",
    positions: "490",
    applicants: "849",
    matchRate: "58%",
    avgStep1: "248",
    avgStep2: "256",
    avgPubs: "8.3",
    competitiveness: "Very High"
  },
  {
    specialty: "Emergency Medicine",
    positions: "2,665",
    applicants: "3,442",
    matchRate: "77%",
    avgStep1: "231",
    avgStep2: "243",
    avgPubs: "2.8",
    competitiveness: "Moderate-High"
  },
  {
    specialty: "Family Medicine",
    positions: "4,916",
    applicants: "4,881",
    matchRate: "93%",
    avgStep1: "221",
    avgStep2: "232",
    avgPubs: "1.2",
    competitiveness: "Low"
  },
  {
    specialty: "Internal Medicine",
    positions: "9,536",
    applicants: "11,234",
    matchRate: "85%",
    avgStep1: "235",
    avgStep2: "246",
    avgPubs: "3.9",
    competitiveness: "Moderate"
  },
  {
    specialty: "Neurosurgery",
    positions: "234",
    applicants: "397",
    matchRate: "59%",
    avgStep1: "245",
    avgStep2: "253",
    avgPubs: "12.1",
    competitiveness: "Very High"
  },
  {
    specialty: "OB/GYN",
    positions: "1,503",
    applicants: "2,124",
    matchRate: "71%",
    avgStep1: "231",
    avgStep2: "243",
    avgPubs: "2.5",
    competitiveness: "Moderate-High"
  },
  {
    specialty: "Orthopedic Surgery",
    positions: "875",
    applicants: "1,435",
    matchRate: "61%",
    avgStep1: "244",
    avgStep2: "252",
    avgPubs: "7.2",
    competitiveness: "Very High"
  },
  {
    specialty: "Pediatrics",
    positions: "3,036",
    applicants: "3,124",
    matchRate: "97%",
    avgStep1: "228",
    avgStep2: "240",
    avgPubs: "2.1",
    competitiveness: "Low-Moderate"
  },
  {
    specialty: "Psychiatry",
    positions: "2,047",
    applicants: "2,518",
    matchRate: "81%",
    avgStep1: "226",
    avgStep2: "237",
    avgPubs: "1.8",
    competitiveness: "Low-Moderate"
  },
  {
    specialty: "Radiology",
    positions: "1,093",
    applicants: "1,834",
    matchRate: "60%",
    avgStep1: "241",
    avgStep2: "250",
    avgPubs: "4.5",
    competitiveness: "High"
  },
  {
    specialty: "Surgery (General)",
    positions: "1,432",
    applicants: "2,876",
    matchRate: "50%",
    avgStep1: "237",
    avgStep2: "248",
    avgPubs: "5.8",
    competitiveness: "High"
  }
];

const specialtyRequirements = {
  "Internal Medicine": {
    required: ["Step 2 CK", "ECFMG certification (if IMG)", "3+ LoRs"],
    preferred: ["Sub-internship", "Medicine research", "Step 3"],
    redFlags: ["Multiple Step attempts", "Gaps in training", "No US clinical experience"],
    uniqueConsiderations: "Emphasize clinical reasoning and continuity of care interest"
  },
  "Surgery": {
    required: ["Strong Step scores", "Surgery sub-internship", "Research experience"],
    preferred: ["Away rotations", "Publications", "Leadership roles"],
    redFlags: ["Low Step scores (<230)", "No research", "Lack of commitment evidence"],
    uniqueConsiderations: "Demonstrate manual dexterity and ability to handle stress"
  },
  "Emergency Medicine": {
    required: ["2 SLOEs", "EM rotation", "Step 2 CK"],
    preferred: ["Away rotations", "Ultrasound experience", "EMS involvement"],
    redFlags: ["Poor SLOE ratings", "No EM experience", "Cannot handle chaos"],
    uniqueConsiderations: "Show ability to multitask and make quick decisions"
  },
  "Pediatrics": {
    required: ["Pediatric rotations", "Step scores", "Interest in children"],
    preferred: ["Child advocacy work", "Pediatric research", "Camp counselor experience"],
    redFlags: ["No pediatric experience", "Discomfort with families", "Poor communication"],
    uniqueConsiderations: "Emphasize patience and ability to work with families"
  },
  "Radiology": {
    required: ["Strong Step scores", "Preliminary year plan", "Research helpful"],
    preferred: ["AI/Tech experience", "Publications", "Away rotations"],
    redFlags: ["Poor visual-spatial skills", "No technology interest", "Weak Step scores"],
    uniqueConsiderations: "Balance tech interest with patient care commitment"
  },
  "Psychiatry": {
    required: ["Psychiatry rotations", "Strong personal statement", "Interpersonal skills"],
    preferred: ["Mental health advocacy", "Research", "Humanities background"],
    redFlags: ["Stigmatizing language", "Boundary issues", "Personal agenda"],
    uniqueConsiderations: "Show emotional intelligence and cultural sensitivity"
  }
};

const redFlags = {
  universal: [
    {
      flag: "Failed Step Attempts",
      impact: "High",
      mitigation: "Address directly, show improvement, highlight strengths"
    },
    {
      flag: "Professionalism Issues",
      impact: "Very High",
      mitigation: "Get letter from dean, demonstrate growth and insight"
    },
    {
      flag: "Extended Gaps in Training",
      impact: "Moderate-High",
      mitigation: "Explain productively (research, family), show continued learning"
    },
    {
      flag: "Poor Clinical Grades",
      impact: "Moderate",
      mitigation: "Show upward trend, strong Sub-I performance, good letters"
    },
    {
      flag: "No Specialty Experience",
      impact: "High",
      mitigation: "Difficult to overcome - consider gap year for experience"
    }
  ],
  specialtySpecific: {
    "Surgical Specialties": ["No research", "Poor manual skills", "Can't handle criticism"],
    "Primary Care": ["No continuity experience", "Poor communication", "Lack of empathy"],
    "Competitive Specialties": ["Below average scores", "No connections", "Generic application"]
  }
};

const successStories = [
  {
    background: "IMG with Step 1 failure",
    specialty: "Internal Medicine",
    strategy: "Retook and scored 245, did observerships, strong clinical letters",
    outcome: "Matched at university program",
    lesson: "Recovery and persistence matter more than perfection"
  },
  {
    background: "DO student, average scores",
    specialty: "Anesthesiology",
    strategy: "4 away rotations, 8 interviews, great SLOEs, regional focus",
    outcome: "Matched at #2 choice",
    lesson: "Away rotations can overcome score deficits"
  },
  {
    background: "Career changer at 35",
    specialty: "Psychiatry",
    strategy: "Leveraged prior career, unique perspective, strong narrative",
    outcome: "Matched at top program",
    lesson: "Life experience can be an advantage"
  },
  {
    background: "Low Step 2 score (225)",
    specialty: "Family Medicine",
    strategy: "Rural focus, community service, Spanish fluency",
    outcome: "Matched with scholarship",
    lesson: "Align strengths with program needs"
  },
  {
    background: "No home program",
    specialty: "Emergency Medicine",
    strategy: "6 away rotations, networking, geographic flexibility",
    outcome: "Matched at academic center",
    lesson: "Create opportunities through aways"
  }
];

const strategyByCompetitiveness = {
  "Very Competitive": {
    specialties: ["Dermatology", "Neurosurgery", "Orthopedics", "Interventional Radiology"],
    strategy: [
      "Apply to 60-80+ programs",
      "Need backup specialty",
      "Research is essential (5+ publications)",
      "Away rotations critical",
      "Network aggressively",
      "Consider research year"
    ]
  },
  "Competitive": {
    specialties: ["Radiology", "Anesthesiology", "Ophthalmology", "ENT"],
    strategy: [
      "Apply to 40-60 programs",
      "Strong Step scores essential",
      "2-3 away rotations helpful",
      "Research important (2-3 publications)",
      "Regional ties matter",
      "Have preliminary year plan"
    ]
  },
  "Moderate": {
    specialties: ["Internal Medicine", "General Surgery", "OB/GYN", "Emergency Medicine"],
    strategy: [
      "Apply to 30-45 programs",
      "Focus on fit over prestige",
      "1-2 away rotations if desired",
      "Some research helpful",
      "Strong clinical performance",
      "Good letters crucial"
    ]
  },
  "Accessible": {
    specialties: ["Family Medicine", "Pediatrics", "Psychiatry", "Physical Medicine"],
    strategy: [
      "Apply to 20-35 programs",
      "Focus on mission alignment",
      "Community service important",
      "Personal statement crucial",
      "Geographic clustering okay",
      "Unique experiences valued"
    ]
  }
};

export default function SpecialtyStrategyGuide() {
  const [activeSection, setActiveSection] = useState('statistics');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Internal Medicine');

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
            <span className="text-gray-900 font-medium">Specialty Strategy</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-gray-700" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Specialty Strategy
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Navigate specialty-specific requirements and expectations to maximize your match potential in your chosen field.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl">
              <div>
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <div className="text-sm text-gray-600">Miss specialty red flags</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">14</div>
                <div className="text-sm text-gray-600">Core specialties</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2-12</div>
                <div className="text-sm text-gray-600">Avg publications needed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50-97%</div>
                <div className="text-sm text-gray-600">Match rate range</div>
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
              { id: 'statistics', label: 'Match Statistics', icon: BarChart3 },
              { id: 'requirements', label: 'Requirements', icon: Target },
              { id: 'redflags', label: 'Red Flags', icon: AlertCircle },
              { id: 'success', label: 'Success Stories', icon: Award }
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
          {/* Match Statistics */}
          {activeSection === 'statistics' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2024 Match Statistics by Specialty</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Specialty
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Positions
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Match Rate
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Step 1
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Step 2
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Pubs
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Competitiveness
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {matchStatistics.map((specialty, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {specialty.specialty}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600">
                          {specialty.positions}
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <span className={`font-medium ${
                            parseInt(specialty.matchRate) >= 80 
                              ? 'text-green-600' 
                              : parseInt(specialty.matchRate) >= 65
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}>
                            {specialty.matchRate}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600">
                          {specialty.avgStep1}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600">
                          {specialty.avgStep2}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600">
                          {specialty.avgPubs}
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            specialty.competitiveness === 'Very High'
                              ? 'bg-red-100 text-red-700'
                              : specialty.competitiveness === 'High'
                              ? 'bg-orange-100 text-orange-700'
                              : specialty.competitiveness === 'Moderate-High'
                              ? 'bg-yellow-100 text-yellow-700'
                              : specialty.competitiveness === 'Moderate'
                              ? 'bg-blue-100 text-blue-700'
                              : specialty.competitiveness === 'Low-Moderate'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {specialty.competitiveness}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                {Object.entries(strategyByCompetitiveness).map(([level, data]) => (
                  <div key={level} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">{level} Specialties</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {data.specialties.join(', ')}
                    </p>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Strategy:
                    </p>
                    <ul className="space-y-1">
                      {data.strategy.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <ChevronRight className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {activeSection === 'requirements' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Specialty-Specific Requirements</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Specialty:
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.keys(specialtyRequirements).map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {selectedSpecialty && specialtyRequirements[selectedSpecialty as keyof typeof specialtyRequirements] && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      Required Elements
                    </h3>
                    <ul className="space-y-2">
                      {specialtyRequirements[selectedSpecialty as keyof typeof specialtyRequirements].required.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">•</span>
                          <span className="text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Preferred Qualifications
                    </h3>
                    <ul className="space-y-2">
                      {specialtyRequirements[selectedSpecialty as keyof typeof specialtyRequirements].preferred.map((pref, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span className="text-sm text-gray-700">{pref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <X className="h-5 w-5 text-red-600" />
                      Red Flags to Avoid
                    </h3>
                    <ul className="space-y-2">
                      {specialtyRequirements[selectedSpecialty as keyof typeof specialtyRequirements].redFlags.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">•</span>
                          <span className="text-sm text-gray-700">{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Unique Considerations</h3>
                    <p className="text-sm text-gray-700">
                      {specialtyRequirements[selectedSpecialty as keyof typeof specialtyRequirements].uniqueConsiderations}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Red Flags */}
          {activeSection === 'redflags' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Red Flags</h2>
              
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Universal Red Flags</h3>
                <div className="space-y-4">
                  {redFlags.universal.map((flag, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-900">{flag.flag}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          flag.impact === 'Very High'
                            ? 'bg-red-100 text-red-700'
                            : flag.impact === 'High'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {flag.impact} Impact
                        </span>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">
                          <strong className="text-green-700">Mitigation:</strong> {flag.mitigation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Specialty-Specific Red Flags</h3>
                <div className="space-y-4">
                  {Object.entries(redFlags.specialtySpecific).map(([category, flags]) => (
                    <div key={category}>
                      <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {flags.map((flag, idx) => (
                          <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Addressing Red Flags</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Be honest and take responsibility</li>
                      <li>• Show growth and learning from the experience</li>
                      <li>• Keep explanations brief and forward-looking</li>
                      <li>• Have your advisor review your approach</li>
                      <li>• Consider applying more broadly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Stories */}
          {activeSection === 'success' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories & Lessons</h2>
              
              <div className="space-y-6">
                {successStories.map((story, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">{story.background}</h3>
                        <span className="text-sm bg-white px-3 py-1 rounded-full text-gray-700">
                          {story.specialty}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Strategy:</p>
                          <p className="text-sm text-gray-600">{story.strategy}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Outcome:</p>
                          <p className="text-sm text-gray-600">{story.outcome}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-sm text-blue-900">
                            <strong>Key Lesson:</strong> {story.lesson}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Common Success Factors</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Early and thorough preparation",
                    "Realistic self-assessment",
                    "Strategic program selection",
                    "Strong narrative and personal brand",
                    "Effective networking",
                    "Geographic flexibility",
                    "Backup plan in place",
                    "Persistence through challenges"
                  ].map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{factor}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Specialty Selection Timeline</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { year: "MS1-2", task: "Explore broadly", detail: "Shadow, join interest groups, talk to residents" },
                { year: "MS3 Fall", task: "Narrow choices", detail: "Clinical rotations, assess fit and performance" },
                { year: "MS3 Spring", task: "Commit to specialty", detail: "Plan away rotations, begin research if needed" },
                { year: "MS4 Summer", task: "Away rotations", detail: "Network, secure letters, finalize list" },
                { year: "MS4 Fall", task: "Apply and interview", detail: "Submit applications, interview prep, rank programs" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-28 flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-900">{item.year}</span>
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
            Optimize Your Specialty Strategy
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Get specialty-specific guidance to ensure your application stands out in your chosen field.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Get Specialty Review
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