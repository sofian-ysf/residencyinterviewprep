"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/seo/FAQSection";
import { 
  CheckCircle, 
  Star, 
  Clock, 
  FileText, 
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Activity,
  Target,
  Briefcase,
  BookOpen,
  Heart,
  Trophy,
  Zap,
  BarChart3
} from "lucide-react";

const experienceFAQs = [
  {
    question: "How many ERAS experiences should I include?",
    answer: "ERAS allows up to 15 experiences. We recommend including 10-12 high-quality experiences rather than filling all 15 slots with weak entries. Quality over quantity is key. Include a mix of clinical experiences (60%), research (20%), volunteering (10%), and leadership/other (10%). Our reviewers help you select and prioritize the most impactful experiences."
  },
  {
    question: "What's the STAR method and how do you apply it?",
    answer: "STAR stands for Situation, Task, Action, Result. Each experience description should follow this framework: Set the context (where/when), explain your responsibility, describe specific actions you took, and highlight measurable outcomes. We transform vague descriptions like 'assisted in clinic' into compelling narratives that demonstrate competence and impact."
  },
  {
    question: "How do you make research experiences stand out?",
    answer: "Research descriptions should emphasize your intellectual contribution, not just tasks. We highlight hypothesis development, methodology decisions, data analysis, and conclusions drawn. If published, we optimize citation format. For ongoing research, we focus on preliminary findings and expected impact. Numbers matter - patient cohort size, statistical significance, presentation venues."
  },
  {
    question: "Should I include non-medical experiences?",
    answer: "Yes, selectively. Non-medical experiences can demonstrate leadership, teamwork, and unique perspectives. Teaching, military service, entrepreneurship, or significant volunteer work can strengthen your application. We help identify which non-medical experiences add value and frame them to highlight transferable skills relevant to medicine."
  },
  {
    question: "How do you handle gaps or weak experiences?",
    answer: "We strategically frame challenging situations. A research project that didn't yield results becomes a lesson in perseverance and scientific rigor. Limited clinical exposure due to COVID becomes an opportunity to highlight telemedicine skills. We never fabricate, but we ensure every experience contributes positively to your narrative."
  }
];

export default function ExperiencesPage() {
  const [activeTab, setActiveTab] = useState("clinical");

  const experienceTypes = [
    {
      id: "clinical",
      title: "Clinical Experiences",
      icon: Activity,
      description: "Rotations, electives, observerships",
      tips: [
        "Quantify patient interactions and procedures",
        "Highlight unique cases or populations served",
        "Emphasize skills developed and autonomy gained",
        "Show progression of responsibility"
      ]
    },
    {
      id: "research",
      title: "Research & Publications",
      icon: BookOpen,
      description: "Basic science, clinical research, QI projects",
      tips: [
        "Lead with your hypothesis and methods",
        "Include publication status and impact factor",
        "Quantify data points and study size",
        "Highlight presentations and awards"
      ]
    },
    {
      id: "volunteer",
      title: "Volunteer & Service",
      icon: Heart,
      description: "Community service, medical missions, advocacy",
      tips: [
        "Show long-term commitment over one-time events",
        "Emphasize leadership roles taken",
        "Quantify impact on community served",
        "Connect to career goals and values"
      ]
    },
    {
      id: "leadership",
      title: "Leadership & Awards",
      icon: Trophy,
      description: "Student government, organizations, honors",
      tips: [
        "Describe initiatives you led or created",
        "Include measurable outcomes achieved",
        "Show collaboration and team building",
        "Highlight recognition received"
      ]
    }
  ];

  const packages = [
    {
      name: "Essential Package",
      experiences: 3,
      price: 199,
      turnaround: "72 hours",
      features: [
        "3 experience descriptions",
        "STAR method optimization",
        "Grammar and clarity check",
        "One round of revisions"
      ]
    },
    {
      name: "Comprehensive Package",
      experiences: 7,
      price: 399,
      popular: true,
      turnaround: "48 hours",
      features: [
        "7 experience descriptions",
        "Strategic selection guidance",
        "Impact maximization",
        "Keyword optimization",
        "Two rounds of revisions",
        "Priority order recommendation"
      ]
    },
    {
      name: "Complete Package",
      experiences: 15,
      price: 699,
      turnaround: "48 hours",
      features: [
        "All 15 experiences",
        "Full application coherence",
        "Narrative threading",
        "Specialty-specific focus",
        "Three rounds of revisions",
        "1-on-1 strategy call"
      ]
    }
  ];

  const transformations = [
    {
      before: "Participated in internal medicine rotation at City Hospital",
      after: "Managed 8-10 patients daily on internal medicine service at City Hospital, independently performing admissions, presenting at rounds, and coordinating discharge planning, resulting in 15% reduction in readmission rates for my patient panel",
      improvement: "+300% more specific, includes metrics"
    },
    {
      before: "Research assistant in cardiology lab",
      after: "Co-investigated novel biomarkers for heart failure progression, analyzing 500+ patient samples using ELISA and Western blot techniques, contributing to manuscript currently under review at JACC (IF: 24.0)",
      improvement: "Shows ownership and impact"
    },
    {
      before: "Volunteered at free clinic",
      after: "Clinical coordinator at student-run free clinic serving 200+ uninsured patients monthly, implemented EMR system reducing wait times by 40%, trained 15 new volunteers in triage protocols",
      improvement: "Leadership and measurable outcomes"
    }
  ];

  const stats = [
    { value: "15,000+", label: "Experiences Optimized" },
    { value: "340", label: "Characters Per Entry" },
    { value: "5.3x", label: "More Interview Invites" },
    { value: "48hr", label: "Turnaround Time" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              <span>Transform Your ERAS Experience Descriptions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Experiences Tell Your
              <span className="text-green-600"> Medical Journey</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ERAS gives you 15 chances to prove you're ready for residency. Each experience is 
              a 700-character opportunity to demonstrate excellence. Make every character count.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard/new">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg">
                  Optimize My Experiences
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#calculator">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  Experience Calculator
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Experience Descriptions Matter */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Experience Descriptions Make or Break Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Program directors spend 6 seconds scanning each experience. Here's what catches their eye:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-green-600 mb-3" />
                <CardTitle>Quantifiable Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Numbers speak louder than adjectives. "Managed 12 patients" beats "worked hard" every time.
                </p>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-semibold text-green-800">We add metrics to every description</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader>
                <Target className="h-8 w-8 text-blue-600 mb-3" />
                <CardTitle>Specialty Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generic descriptions get ignored. Specialty-specific keywords and skills get interviews.
                </p>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-blue-800">We customize for your specialty</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-purple-600 mb-3" />
                <CardTitle>Progressive Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Your experiences should show increasing responsibility and developing expertise.
                </p>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-semibold text-purple-800">We craft a narrative arc</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Types Guide */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Master Every Experience Type
            </h2>
            <p className="text-xl text-gray-600">
              Different experiences require different optimization strategies
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {experienceTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={activeTab === type.id ? "default" : "outline"}
                  onClick={() => setActiveTab(type.id)}
                  className="mb-2"
                >
                  <type.icon className="h-4 w-4 mr-2" />
                  {type.title}
                </Button>
              ))}
            </div>
            
            {experienceTypes.map((type) => (
              activeTab === type.id && (
                <Card key={type.id} className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <type.icon className="h-6 w-6 text-blue-600" />
                      {type.title}
                    </CardTitle>
                    <CardDescription className="text-lg">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-gray-900 mb-4">Optimization Tips:</h4>
                    <ul className="space-y-3">
                      {type.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <strong>Pro tip:</strong> Each {type.title.toLowerCase()} should demonstrate different competencies 
                        to avoid redundancy and maximize impact.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Transformations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600">
              From vague to vivid - real examples of our optimization
            </p>
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto">
            {transformations.map((example, index) => (
              <Card key={index} className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="p-6 bg-red-50">
                      <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                        <span className="text-red-600">✕</span> Before
                      </h4>
                      <p className="text-gray-700 italic">"{example.before}"</p>
                    </div>
                    <div className="p-6 bg-green-50">
                      <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                        <span className="text-green-600">✓</span> After
                      </h4>
                      <p className="text-gray-700">"{example.after}"</p>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 border-t">
                    <p className="text-sm font-semibold text-blue-900">
                      💡 {example.improvement}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Calculator */}
      <section id="calculator" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Experience Impact Calculator
            </h2>
            <p className="text-xl text-gray-600">
              See how optimized descriptions increase your match chances
            </p>
          </div>
          
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Your Current Experiences</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">Clinical Experiences</span>
                      <span className="font-semibold">6</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">Research Projects</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">Volunteer Activities</span>
                      <span className="font-semibold">4</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">Leadership Roles</span>
                      <span className="font-semibold">2</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Projected Improvement</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Interview Invites</span>
                        <span className="font-bold text-green-600">+5.3x</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Application Strength</span>
                        <span className="font-bold text-blue-600">+47%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Match Probability</span>
                        <span className="font-bold text-purple-600">94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm font-semibold text-green-900">
                      With optimization, your 15 experiences could generate 12-18 interview invites
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Experience Package
            </h2>
            <p className="text-xl text-gray-600">
              From essential edits to complete transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-green-500 shadow-xl scale-105' : 'shadow-lg'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Best Value
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-5xl font-bold text-gray-900">{pkg.experiences}</div>
                  <p className="text-gray-600">experiences</p>
                  <div className="text-3xl font-bold text-gray-900 mt-4">${pkg.price}</div>
                  <p className="text-gray-600 text-sm">{pkg.turnaround} turnaround</p>
                </CardHeader>
                <CardContent className="pb-8">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/dashboard/new" className="block">
                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={experienceFAQs}
        title="Experience Descriptions FAQs"
        description="Expert answers about optimizing your ERAS experiences"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            15 Experiences. 10,500 Characters. One Chance.
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Make every character work toward your match. Our experts know exactly what programs want to see.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/new">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Optimize My Experiences
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Compare All Services
              </Button>
            </Link>
          </div>
          <p className="text-green-100 mt-6">
            ⚡ Fast turnaround available • Expert reviewers standing by
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}