'use client';

import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  FileText, 
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  Target,
  Lightbulb,
  BookOpen,
  Edit3,
  TrendingUp,
  ChevronRight,
  Clock,
  Users,
  Award
} from "lucide-react";

const commonMistakes = [
  {
    mistake: "Starting with 'I have always wanted to be a doctor since I was five...'",
    why: "67% of applicants use this cliché",
    instead: "Start with a specific, recent patient encounter that showcases your growth"
  },
  {
    mistake: "Listing accomplishments without reflection",
    why: "Programs want insight, not a CV repeat",
    instead: "Show how experiences shaped your approach to medicine"
  },
  {
    mistake: "Generic statements about helping people",
    why: "Every applicant wants to help people",
    instead: "Demonstrate unique perspective through specific examples"
  },
  {
    mistake: "Ignoring specialty-specific expectations",
    why: "Each specialty values different qualities",
    instead: "Research and address what your specialty prioritizes"
  },
  {
    mistake: "Poor structure and flow",
    why: "Readers spend <2 minutes per statement",
    instead: "Use clear transitions and logical progression"
  }
];

const openingStrategies = [
  {
    type: "Patient Encounter",
    strength: "Immediately demonstrates clinical experience",
    example: "The tremor in Mrs. Chen's hand was barely perceptible, but it told a story that her words couldn't...",
    best_for: "Clinical specialties"
  },
  {
    type: "Pivotal Moment",
    strength: "Shows transformation and growth",
    example: "The pathology slide revealed more than cancer cells—it revealed my calling...",
    best_for: "Career changers, non-traditional paths"
  },
  {
    type: "Unique Perspective",
    strength: "Differentiates immediately",
    example: "As a former engineer, I see the human body as the most elegant system...",
    best_for: "Non-traditional backgrounds"
  },
  {
    type: "Philosophical Approach",
    strength: "Shows depth of thought",
    example: "Medicine is the intersection of science and humanity, where data meets compassion...",
    best_for: "Research-heavy specialties"
  }
];

const specialtyFocus = [
  {
    specialty: "Internal Medicine",
    emphasis: ["Diagnostic reasoning", "Continuity of care", "Complex problem-solving"],
    avoid: ["Over-emphasis on procedures", "Narrow focus"]
  },
  {
    specialty: "Surgery",
    emphasis: ["Technical skill development", "Decision-making under pressure", "Leadership"],
    avoid: ["Lack of teamwork examples", "No mention of patient care"]
  },
  {
    specialty: "Pediatrics",
    emphasis: ["Child advocacy", "Family-centered care", "Developmental understanding"],
    avoid: ["Generic 'love kids' statements", "No specific pediatric experiences"]
  },
  {
    specialty: "Emergency Medicine",
    emphasis: ["Thriving in chaos", "Quick decision-making", "Diverse pathology interest"],
    avoid: ["Adrenaline junkie language", "Lack of compassion examples"]
  },
  {
    specialty: "Psychiatry",
    emphasis: ["Human connection", "Psychological insight", "Holistic approach"],
    avoid: ["Personal mental health focus", "Stigmatizing language"]
  },
  {
    specialty: "Radiology",
    emphasis: ["Pattern recognition", "Technology integration", "Consultant mindset"],
    avoid: ["Introvert stereotype", "No patient interaction mention"]
  }
];

const structureGuide = {
  opening: {
    length: "10-15%",
    purpose: "Hook reader, establish voice",
    elements: ["Compelling story", "Unique perspective", "Clear writing style"]
  },
  body1: {
    length: "25-30%",
    purpose: "Why medicine",
    elements: ["Specific experiences", "Personal growth", "Values alignment"]
  },
  body2: {
    length: "25-30%",
    purpose: "Why this specialty",
    elements: ["Specialty-specific experiences", "Skills demonstration", "Future vision"]
  },
  body3: {
    length: "20-25%",
    purpose: "What you bring",
    elements: ["Unique contributions", "Leadership examples", "Research/achievements"]
  },
  closing: {
    length: "10-15%",
    purpose: "Future vision",
    elements: ["Career goals", "Program fit", "Commitment statement"]
  }
};

export default function PersonalStatementGuide() {
  const [activeSection, setActiveSection] = useState('structure');

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
            <span className="text-gray-900 font-medium">Personal Statement</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-gray-700" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Personal Statement Guide
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Craft a compelling narrative that resonates with program directors and showcases your unique journey to medicine.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl">
              <div>
                <div className="text-2xl font-bold text-gray-900">67%</div>
                <div className="text-sm text-gray-600">Use clichéd openings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">40+ hrs</div>
                <div className="text-sm text-gray-600">Average time spent</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">&lt;2 min</div>
                <div className="text-sm text-gray-600">Reading time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">750</div>
                <div className="text-sm text-gray-600">Word limit</div>
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
              { id: 'structure', label: 'Structure & Format', icon: BookOpen },
              { id: 'opening', label: 'Opening Strategies', icon: Lightbulb },
              { id: 'mistakes', label: 'Common Mistakes', icon: X },
              { id: 'specialty', label: 'Specialty Focus', icon: Target }
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
          {/* Structure & Format */}
          {activeSection === 'structure' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Structure & Format</h2>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">The 5-Part Framework</h3>
                <div className="space-y-4">
                  {Object.entries(structureGuide).map(([key, section]) => (
                    <div key={key} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 capitalize">
                          {key.replace(/\d+/, '')} ({section.length})
                        </h4>
                        <span className="text-sm text-gray-500">{section.purpose}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {section.elements.map((element, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Formatting Guidelines</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Single-spaced, 1-inch margins, 11-12pt standard font</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>5-6 paragraphs with clear transitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Active voice and specific examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Proofread by at least 3 people</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Opening Strategies */}
          {activeSection === 'opening' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Strategies</h2>
              
              <div className="space-y-6">
                {openingStrategies.map((strategy, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-900 text-lg">{strategy.type}</h3>
                      <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {strategy.best_for}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{strategy.strength}</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm italic text-gray-700">"{strategy.example}"</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pro Tip</h4>
                    <p className="text-sm text-gray-700">
                      Write 3-5 different openings and test them with mentors. The right opening 
                      should feel authentic to your story and grab attention within the first sentence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {activeSection === 'mistakes' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid</h2>
              
              <div className="space-y-6">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                      <div className="flex items-start gap-3">
                        <X className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.mistake}</h3>
                          <p className="text-sm text-red-700 mt-1">{item.why}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 px-6 py-4">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Instead:</p>
                          <p className="text-sm text-gray-700 mt-1">{item.instead}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specialty Focus */}
          {activeSection === 'specialty' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Specialty-Specific Guidance</h2>
              
              <div className="grid gap-6">
                {specialtyFocus.map((specialty, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 text-lg mb-4">{specialty.specialty}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Emphasize
                        </h4>
                        <ul className="space-y-2">
                          {specialty.emphasis.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-green-600 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <X className="h-4 w-4 text-red-600" />
                          Avoid
                        </h4>
                        <ul className="space-y-2">
                          {specialty.avoid.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-red-600 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Recommended Timeline</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { week: "Week 1-2", task: "Brainstorm and outline", detail: "Reflect on experiences, identify themes" },
                { week: "Week 3-4", task: "First draft", detail: "Focus on content, not perfection" },
                { week: "Week 5-6", task: "Major revisions", detail: "Structure, flow, and clarity" },
                { week: "Week 7", task: "Peer review", detail: "Get feedback from 3-5 readers" },
                { week: "Week 8", task: "Final polish", detail: "Grammar, word choice, formatting" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-24 flex-shrink-0">
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
            Need Professional Review?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our physicians have reviewed 10,000+ personal statements and know exactly what programs look for.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Get Your Statement Reviewed
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