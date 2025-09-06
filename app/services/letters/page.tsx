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
  Shield,
  Users,
  Award,
  AlertTriangle,
  Target,
  Mail,
  UserCheck,
  FileSignature,
  AlertCircle,
  BookOpen,
  Briefcase,
  Heart,
  MessageSquare,
  PenTool,
  XCircle
} from "lucide-react";

const lettersFAQs = [
  {
    question: "How many letters of recommendation do I need for ERAS?",
    answer: "Most programs require 3-4 letters minimum. The typical combination is: 1 department chair letter (often required), 2-3 clinical letters from attendings in your specialty, and 1 additional letter (research mentor, sub-specialty, or strong clinical). Some specialties have specific requirements - surgery often wants a surgery chair letter, while psychiatry values letters that speak to interpersonal skills."
  },
  {
    question: "What if my letter writer asks me to draft the letter?",
    answer: "This is more common than you think. We provide templates and guidance for self-drafted letters that sound authentic, highlight your strengths appropriately, and avoid common red flags like being too self-promotional. We ensure the tone matches what a attending would actually write and includes specific examples that only someone who worked closely with you would know."
  },
  {
    question: "How do you identify red flags in letters?",
    answer: "Red flags include: generic language ('solid medical student'), damning with faint praise ('usually on time'), inappropriate comparisons, missing key endorsements, or subtle negativity. We also catch formatting issues, outdated information, and inconsistencies between letters. Our reviewers know exactly what program directors look for and what raises concerns."
  },
  {
    question: "Can you help if I can't get a letter from a specific specialty?",
    answer: "Yes! We help you strategize alternatives. A strong medicine letter can work for anesthesia. Research letters can substitute for clinical ones if they emphasize relevant skills. We also provide talking points for approaching new letter writers and templates for update letters if you've lost touch with previous attendings."
  },
  {
    question: "What about the MSPE (Dean's Letter)?",
    answer: "While you can't edit your MSPE directly, we review it to identify potential concerns and help you address them proactively in your personal statement or interviews. We also ensure your other letters complement and don't contradict your MSPE narrative."
  }
];

export default function LettersPage() {
  const [activeStrategy, setActiveStrategy] = useState("selection");

  const strategies = [
    {
      id: "selection",
      title: "Letter Writer Selection",
      description: "Choose writers who strengthen your application"
    },
    {
      id: "approach",
      title: "Approaching Writers",
      description: "Scripts and strategies for securing strong letters"
    },
    {
      id: "content",
      title: "Content Optimization",
      description: "What makes letters stand out to programs"
    },
    {
      id: "timeline",
      title: "Timeline & Follow-up",
      description: "When and how to manage the process"
    }
  ];

  const redFlags = [
    {
      flag: "Generic Language",
      example: "She is a good medical student",
      issue: "Shows writer doesn't know you well",
      fix: "Provide specific examples and achievements to your writer"
    },
    {
      flag: "Faint Praise",
      example: "Usually prepared for rounds",
      issue: "Implies you're sometimes unprepared",
      fix: "Ensure writers use definitively positive language"
    },
    {
      flag: "Wrong Specialty Focus",
      example: "Would make a great internist (for surgery applicant)",
      issue: "Suggests lack of commitment to specialty",
      fix: "Brief writers on your specialty choice and reasons"
    },
    {
      flag: "Missing Comparisons",
      example: "No ranking among peers",
      issue: "Programs want to know where you stand",
      fix: "Ask writers to include comparative statements"
    }
  ];

  const packages = [
    {
      name: "Letter Review",
      price: 199,
      turnaround: "48 hours",
      features: [
        "Review up to 4 letters",
        "Red flag identification",
        "Improvement suggestions",
        "Strength highlighting",
        "Written feedback report"
      ]
    },
    {
      name: "Letter Package Plus",
      price: 399,
      popular: true,
      turnaround: "48 hours",
      features: [
        "Everything in Letter Review",
        "Letter writer coaching guide",
        "Template letters for writers",
        "Approach scripts",
        "Thank you note templates",
        "30-minute strategy call"
      ]
    },
    {
      name: "Complete Letter Support",
      price: 599,
      turnaround: "24 hours",
      features: [
        "Everything in Plus",
        "Unlimited letter reviews",
        "MSPE analysis",
        "Backup letter strategies",
        "Interview talking points",
        "1-hour consultation",
        "30-day support"
      ]
    }
  ];

  const letterComponents = [
    {
      component: "Opening",
      importance: "Sets the tone",
      example: "It is my genuine pleasure to recommend...",
      tip: "Should convey enthusiasm, not obligation"
    },
    {
      component: "Relationship Context",
      importance: "Establishes credibility",
      example: "I supervised Sarah directly for 8 weeks during her sub-I...",
      tip: "Specific timeframe and interaction level"
    },
    {
      component: "Clinical Skills",
      importance: "Core competency",
      example: "Demonstrated advanced procedural skills, successfully completing 15 intubations...",
      tip: "Quantify when possible"
    },
    {
      component: "Personal Qualities",
      importance: "Differentiator",
      example: "Her compassion was evident when she spent extra hours with a dying patient's family...",
      tip: "Specific anecdotes over generic traits"
    },
    {
      component: "Comparison",
      importance: "Contextualizes performance",
      example: "Ranks in the top 10% of students I've worked with in 15 years...",
      tip: "Comparative statements carry significant weight"
    },
    {
      component: "Final Endorsement",
      importance: "Clear recommendation",
      example: "I recommend without reservation for your program...",
      tip: "Should be unequivocal and enthusiastic"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileSignature className="h-4 w-4" />
              <span>Expert Letter of Recommendation Services</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Strong Letters Open Doors.
              <span className="text-purple-600"> Weak Letters Close Them.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Letters of recommendation can override weak scores or elevate strong applications. 
              One lukewarm letter can sink your chances. We ensure every letter advocates powerfully for your match.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard/new">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg">
                  Review My Letters
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#red-flags">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  Check for Red Flags
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <span>Physician Reviewers</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span>5,000+ Letters Reviewed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem with Letters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why 40% of Letters Hurt More Than Help
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Well-meaning letter writers often unknowingly sabotage applications
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="border-l-4 border-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">The Generic Letter</h3>
                      <p className="text-gray-600">
                        "Solid student, good work ethic" - could describe anyone. Programs see hundreds of these.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">The Backhanded Compliment</h3>
                      <p className="text-gray-600">
                        "Despite initial struggles, eventually improved" - raises questions about your abilities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">The Wrong Focus</h3>
                      <p className="text-gray-600">
                        Great research letter for a clinical program - shows misaligned interests.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="shadow-xl bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl">What Programs Actually Want</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Specific examples</strong>
                        <p className="text-gray-600 text-sm mt-1">Not "hardworking" but "stayed late to ensure Mr. Smith understood his diagnosis"</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Comparative context</strong>
                        <p className="text-gray-600 text-sm mt-1">"Top 5% of students I've supervised in 20 years"</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Specialty alignment</strong>
                        <p className="text-gray-600 text-sm mt-1">Clear endorsement for your chosen field</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Unequivocal endorsement</strong>
                        <p className="text-gray-600 text-sm mt-1">"Highest recommendation without reservation"</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Letter Strategy Guide */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Letter Strategy Guide
            </h2>
            <p className="text-xl text-gray-600">
              From selection to submission - we guide every step
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {strategies.map((strategy) => (
                <Button
                  key={strategy.id}
                  variant={activeStrategy === strategy.id ? "default" : "outline"}
                  onClick={() => setActiveStrategy(strategy.id)}
                  size="sm"
                >
                  {strategy.title}
                </Button>
              ))}
            </div>
            
            <Card className="shadow-xl">
              <CardContent className="p-8">
                {activeStrategy === "selection" && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Strategic Letter Writer Selection</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Ideal Letter Writer Hierarchy</h4>
                        <ol className="space-y-2 text-gray-700">
                          <li>1. Department Chair in your specialty (if required)</li>
                          <li>2. Attending who supervised you directly for 4+ weeks</li>
                          <li>3. Research mentor with publication together</li>
                          <li>4. Sub-specialty attending aligned with interests</li>
                          <li>5. Away rotation attending (shows adaptability)</li>
                        </ol>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Writers to Avoid</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Residents or fellows (unless specifically allowed)</li>
                          <li>• Attendings who barely know you</li>
                          <li>• Anyone hesitant when asked</li>
                          <li>• Writers known for generic letters</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStrategy === "approach" && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Approach Letter Writers</h3>
                    <div className="space-y-4">
                      <Card className="bg-green-50">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-gray-900 mb-3">The Perfect Ask</h4>
                          <p className="text-gray-700 italic mb-4">
                            "Dr. Smith, I really enjoyed working with you during my surgery rotation. 
                            I'm applying to general surgery residency and wondered if you could write me a 
                            strong letter of recommendation highlighting my technical skills and clinical reasoning?"
                          </p>
                          <p className="text-sm text-green-800">
                            ✓ Specific about specialty ✓ Mentions "strong" letter ✓ Gives focus areas
                          </p>
                        </CardContent>
                      </Card>
                      
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">What to Provide Your Writers</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>✓ Your CV and personal statement</li>
                          <li>✓ Specific patient cases you worked on together</li>
                          <li>✓ Key achievements during the rotation</li>
                          <li>✓ Your career goals and program preferences</li>
                          <li>✓ Deadline (2 weeks before ERAS submission)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStrategy === "content" && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Letter Content That Gets Interviews</h3>
                    <div className="space-y-6">
                      {letterComponents.map((comp, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{comp.component}</h4>
                            <span className="text-sm text-gray-600">{comp.importance}</span>
                          </div>
                          <p className="text-gray-700 italic mb-2">"{comp.example}"</p>
                          <p className="text-sm text-blue-700">💡 {comp.tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeStrategy === "timeline" && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Letter Timeline & Management</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card className="bg-purple-50">
                          <CardHeader>
                            <CardTitle className="text-lg">3 Months Before ERAS</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Identify potential writers</li>
                              <li>• Reconnect with past attendings</li>
                              <li>• Schedule meetings to ask</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-blue-50">
                          <CardHeader>
                            <CardTitle className="text-lg">2 Months Before</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Formal letter requests</li>
                              <li>• Provide supporting materials</li>
                              <li>• Confirm ERAS ID numbers</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-green-50">
                          <CardHeader>
                            <CardTitle className="text-lg">1 Month Before</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Gentle reminder email</li>
                              <li>• Verify upload to ERAS</li>
                              <li>• Have backup plan ready</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-yellow-50">
                          <CardHeader>
                            <CardTitle className="text-lg">After Submission</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Thank you notes</li>
                              <li>• Update on match results</li>
                              <li>• Maintain relationships</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Red Flags Section */}
      <section id="red-flags" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Red Flags That Kill Applications
            </h2>
            <p className="text-xl text-gray-600">
              These common letter mistakes cost interviews every year
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {redFlags.map((flag, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    {flag.flag}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-sm text-red-900">
                        <strong>Example:</strong> "{flag.example}"
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Why it's bad:</strong> {flag.issue}
                    </p>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-sm text-green-900">
                        <strong>Solution:</strong> {flag.fix}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Letter Review & Support Packages
            </h2>
            <p className="text-xl text-gray-600">
              From basic review to complete letter strategy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-purple-500 shadow-xl scale-105' : 'shadow-lg'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-4">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900">${pkg.price}</div>
                  <p className="text-gray-600 mt-2">{pkg.turnaround} turnaround</p>
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
        faqs={lettersFAQs}
        title="Letter of Recommendation FAQs"
        description="Expert answers about letters, MSPE, and recommendations"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Don't Let a Weak Letter Derail Your Match
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            We've reviewed 5,000+ letters. We know exactly what programs look for and what raises red flags.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/new">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Review My Letters Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                See All Services
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-purple-100">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>48hr Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}