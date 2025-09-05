'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  FileText, 
  Stethoscope, 
  Users, 
  Target, 
  Award, 
  BookOpen,
  ArrowRight,
  Check,
  Clock,
  Shield,
  AlertCircle,
  TrendingUp,
  ChevronRight
} from "lucide-react";

// Calculate days until ERAS deadline (September 28)
const calculateDaysUntilDeadline = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  let deadline = new Date(currentYear, 8, 28); // September 28
  
  if (today > deadline) {
    deadline = new Date(currentYear + 1, 8, 28);
  }
  
  const diffTime = Math.abs(deadline.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const guides = [
  {
    title: "Personal Statement",
    icon: FileText,
    href: "/guides/personal-statement",
    description: "Craft a compelling narrative that resonates with program directors",
    keyInsight: "67% of statements use clichéd openings",
    timeInvestment: "40+ hours average",
    topics: ["Structure & Format", "Opening Strategies", "Common Mistakes", "Specialty Focus"],
  },
  {
    title: "Activity Descriptions", 
    icon: BookOpen,
    href: "/guides/activity-descriptions",
    description: "Transform experiences into quantified achievements",
    keyInsight: "82% miss quantifiable impacts",
    timeInvestment: "3-4 hours per description",
    topics: ["STAR Method", "Quantifying Impact", "Leadership Examples", "Research Writing"],
  },
  {
    title: "Letters of Recommendation",
    icon: Award,
    href: "/guides/letters-of-recommendation",
    description: "Secure strong endorsements from the right recommenders",
    keyInsight: "45% choose suboptimal writers",
    timeInvestment: "2-3 weeks coordination",
    topics: ["Choosing Writers", "Timeline Strategy", "Packet Preparation", "Follow-up"],
  },
  {
    title: "Program Selection",
    icon: Target,
    href: "/guides/program-selection",
    description: "Build a strategic list that maximizes your match potential",
    keyInsight: "71% apply to wrong tier programs",
    timeInvestment: "100+ hours research",
    topics: ["Signal Strategy", "Geographic Factors", "Program Research", "Application Tiers"],
  },
  {
    title: "Interview Preparation",
    icon: Users,
    href: "/guides/interview-prep",
    description: "Present yourself confidently in virtual and in-person settings",
    keyInsight: "58% struggle with common questions",
    timeInvestment: "20+ practice sessions",
    topics: ["Virtual Setup", "Common Questions", "MMI Format", "Thank You Notes"],
  },
  {
    title: "Specialty Strategy",
    icon: Stethoscope,
    href: "/guides/specialties",
    description: "Navigate specialty-specific requirements and expectations",
    keyInsight: "89% miss specialty red flags",
    timeInvestment: "Varies by specialty",
    topics: ["Match Statistics", "Requirements", "Red Flags", "Success Stories"],
  }
];

const stats = [
  { value: "73%", label: "Make critical mistakes", subtext: "in their applications" },
  { value: "12-15", label: "Interview invites", subtext: "with professional review" },
  { value: "95%", label: "Match rate", subtext: "for our clients" },
  { value: "48hr", label: "Turnaround time", subtext: "for complete review" }
];

const processSteps = [
  {
    step: "1",
    title: "Submit Your Application",
    description: "Upload your draft for comprehensive analysis"
  },
  {
    step: "2", 
    title: "Receive Expert Review",
    description: "Get line-by-line edits and strategic recommendations"
  },
  {
    step: "3",
    title: "Implement & Refine",
    description: "Apply changes with ongoing support"
  },
  {
    step: "4",
    title: "Submit with Confidence",
    description: "Know you're in the top 5% of applicants"
  }
];

export default function GuidesPage() {
  const [daysLeft, setDaysLeft] = useState(0);
  
  useEffect(() => {
    setDaysLeft(calculateDaysUntilDeadline());
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Subtle deadline reminder */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              ERAS submission deadline: September 28 ({daysLeft} days remaining)
            </span>
            <Link href="/auth/signup" className="text-gray-900 font-medium hover:text-gray-700">
              Start your review →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Hero Section - Clean and Professional */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Application Guides
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive resources to perfect every component of your ERAS application.
              Based on insights from reviewing 10,000+ successful applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#guides">
                <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Browse Guides
                </button>
              </Link>
              <Link href="#process">
                <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
                  How We Help
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Clean data presentation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid - Professional cards */}
      <section id="guides" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Master Each Component
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you prefer self-study or professional guidance, we provide the resources you need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Link key={index} href={guide.href} className="group">
                <div className="h-full bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-lg transition-all">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <guide.icon className="h-5 w-5 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {guide.description}
                      </p>
                    </div>
                  </div>

                  {/* Key Insight */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">{guide.keyInsight}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-6">
                      Time investment: {guide.timeInvestment}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="space-y-2">
                    {guide.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Check className="h-3 w-3 text-gray-400 mr-2 flex-shrink-0" />
                        {topic}
                      </div>
                    ))}
                  </div>

                  {/* Subtle CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      Read Guide
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - How we help */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Review Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your application with expert guidance from physicians who successfully matched.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {processSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Professional Review Matters
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Insider Knowledge</p>
                      <p className="text-sm text-gray-600">We know exactly what programs look for</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Algorithm Optimization</p>
                      <p className="text-sm text-gray-600">Ensure you pass automated screening</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Strategic Positioning</p>
                      <p className="text-sm text-gray-600">Stand out in your specialty of choice</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Peace of Mind</p>
                      <p className="text-sm text-gray-600">Submit knowing you've done everything right</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                  Success Metrics
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Interview Rate</span>
                      <span className="font-medium text-gray-900">5.2× higher</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-900 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Match Rate</span>
                      <span className="font-medium text-gray-900">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-900 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Top Choice Match</span>
                      <span className="font-medium text-gray-900">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-900 h-2 rounded-full" style={{width: '67%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  "The review completely transformed my application. I went from generic to compelling. 
                  The specific feedback on my personal statement and activity descriptions made all the difference. 
                  Matched at my #1 choice."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Chen, MD</p>
                  <p className="text-sm text-gray-600">Internal Medicine, Johns Hopkins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean and professional */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to perfect your application?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of successful applicants who trusted us with their future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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
          
          <p className="text-sm text-gray-400">
            <Shield className="inline h-4 w-4 mr-1" />
            100% satisfaction guarantee
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}