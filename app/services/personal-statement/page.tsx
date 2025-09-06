"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSection, { homepageFAQs } from "@/components/seo/FAQSection";
import { 
  CheckCircle, 
  Star, 
  Clock, 
  FileText, 
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  AlertTriangle,
  Target,
  Sparkles
} from "lucide-react";

const personalStatementFAQs = [
  {
    question: "How long should my ERAS personal statement be?",
    answer: "Your ERAS personal statement must not exceed 28,000 characters including spaces (approximately 5 pages single-spaced). Most successful statements are between 700-850 words. Our reviewers ensure your statement maximizes impact within these constraints while maintaining proper flow and readability."
  },
  {
    question: "What makes a personal statement stand out to program directors?",
    answer: "Program directors look for authenticity, clear motivation for the specialty, unique experiences that demonstrate fit, and evidence of resilience. They want to understand your 'why' - not just that you want to be a doctor, but why this specific specialty at their program. Our reviewers, many of whom serve on admissions committees, know exactly what catches attention."
  },
  {
    question: "How do you handle red flags in personal statements?",
    answer: "Red flags like gaps in education, failed exams, or leaves of absence should be addressed briefly and professionally. We help you frame challenges as growth opportunities without dwelling on negatives. Our approach: acknowledge, explain the lesson learned, pivot to strengths. We've successfully helped hundreds of applicants with red flags match into competitive programs."
  },
  {
    question: "Can you help with specialty-specific personal statements?",
    answer: "Absolutely! Each specialty values different qualities. Surgery programs want to see manual dexterity and decisiveness. Pediatrics values compassion and patience. Radiology appreciates attention to detail. Our reviewers are matched to your specialty - a surgeon reviews surgery statements, an internist reviews IM statements, ensuring specialty-specific optimization."
  },
  {
    question: "How many revisions are included?",
    answer: "It depends on your package. Essential includes one round, Comprehensive includes two rounds, and Premium includes three rounds. Our Complete package offers unlimited revisions for 30 days. Most statements are perfected within 2-3 rounds. Each revision includes detailed feedback and tracked changes."
  }
];

export default function PersonalStatementPage() {
  const [selectedExample, setSelectedExample] = useState("before");

  const stats = [
    { value: "15,000+", label: "Statements Reviewed" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "72hr", label: "Turnaround Time" },
    { value: "94%", label: "Match Rate" }
  ];

  const features = [
    {
      icon: FileText,
      title: "Narrative Structure",
      description: "Transform your experiences into a compelling story that captures attention from the first sentence"
    },
    {
      icon: Target,
      title: "Specialty Alignment",
      description: "Highlight experiences and qualities that demonstrate perfect fit for your chosen specialty"
    },
    {
      icon: AlertTriangle,
      title: "Red Flag Mitigation",
      description: "Address gaps, failures, or concerns professionally without drawing unnecessary attention"
    },
    {
      icon: Sparkles,
      title: "Language Optimization",
      description: "Eliminate passive voice, redundancies, and clichés while maintaining your authentic voice"
    },
    {
      icon: Shield,
      title: "Grammar Perfection",
      description: "Zero tolerance for errors - every comma, semicolon, and word choice meticulously reviewed"
    },
    {
      icon: Award,
      title: "Impact Maximization",
      description: "Ensure every sentence adds value and moves your narrative forward meaningfully"
    }
  ];

  const packages = [
    {
      name: "Basic Review",
      price: 149,
      turnaround: "72 hours",
      features: [
        "Complete grammar and spelling check",
        "Basic structure feedback",
        "One round of revisions",
        "Written feedback report"
      ]
    },
    {
      name: "Comprehensive Edit",
      price: 299,
      turnaround: "48 hours",
      popular: true,
      features: [
        "Everything in Basic",
        "Line-by-line editing",
        "Narrative restructuring",
        "Specialty-specific optimization",
        "Two rounds of revisions",
        "30-minute consultation call"
      ]
    },
    {
      name: "Premium Transform",
      price: 499,
      turnaround: "24 hours",
      features: [
        "Everything in Comprehensive",
        "Complete rewrite if needed",
        "Multiple specialty versions",
        "Three rounds of revisions",
        "1-hour strategy session",
        "Priority support"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen, MD",
      program: "Dermatology, NYU",
      content: "My personal statement was completely transformed. The reviewer caught nuances I never would have noticed and helped me tell my story in a way that truly reflected my passion for derm.",
      rating: 5
    },
    {
      name: "Michael Roberts, DO",
      program: "Orthopedic Surgery, Mayo Clinic",
      content: "Worth every penny. They helped me address my Step 1 failure professionally and still matched at my #1 program. The specialty-specific insights were invaluable.",
      rating: 5
    },
    {
      name: "Priya Patel, MD",
      program: "Internal Medicine, Johns Hopkins",
      content: "The difference between my draft and final version was night and day. Clear, compelling, and authentic - exactly what programs want to see.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              <span>Rated #1 Personal Statement Review Service</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Personal Statement is Your
              <span className="text-blue-600"> First Impression</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              70% of program directors rate personal statements as "extremely important" in their selection process. 
              Don't let a weak statement cost you interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard/new">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg">
                  Start Your Review
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#examples">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  See Examples
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

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Hidden Cost of a Weak Personal Statement
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 text-xs">✕</span>
                  </div>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Instant rejection:</strong> Programs spend less than 2 minutes on initial reviews
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 text-xs">✕</span>
                  </div>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Lost opportunities:</strong> Average applicant misses 8-10 interview invites due to poor presentation
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 text-xs">✕</span>
                  </div>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Generic content:</strong> 80% of statements use the same clichéd opening lines
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Don't Risk Your Future
                </p>
                <p className="text-gray-600">
                  You've worked too hard to let a mediocre personal statement derail your residency dreams.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Proven Review Process
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Expert matching:</strong> Your statement reviewed by successful physicians in your specialty
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Deep analysis:</strong> Line-by-line optimization for maximum impact
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Strategic positioning:</strong> Highlight strengths while addressing any concerns
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-green-50 rounded-xl">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  94% Match Rate
                </p>
                <p className="text-gray-600">
                  Our clients match at nearly twice the national average rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Review */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Personal Statement Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every aspect of your statement is optimized for maximum impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section id="examples" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600">
              Real examples from successful applicants (details anonymized)
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={selectedExample === "before" ? "default" : "outline"}
                onClick={() => setSelectedExample("before")}
              >
                Before Review
              </Button>
              <Button
                variant={selectedExample === "after" ? "default" : "outline"}
                onClick={() => setSelectedExample("after")}
              >
                After Review
              </Button>
            </div>
            
            <Card className="p-8">
              {selectedExample === "before" ? (
                <div className="prose max-w-none">
                  <p className="text-gray-600 italic mb-4">
                    "I have always wanted to be a doctor since I was young. Growing up, I watched medical shows and was fascinated by medicine. 
                    During medical school, I enjoyed all my rotations but internal medicine stood out to me. I like helping people and solving 
                    complex problems. I believe I would be a good fit for your program."
                  </p>
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Issues:</strong> Generic opening, clichéd reasoning, no specific examples, weak conclusion
                    </p>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-900 mb-4">
                    "The morning I diagnosed my first case of endocarditis, I understood the profound satisfaction of internal medicine. 
                    Mrs. Rodriguez had presented with vague symptoms that three providers had dismissed as 'anxiety.' By carefully 
                    listening to her story and recognizing the subtle pattern of Osler's nodes, I advocated for the echo that revealed 
                    her vegetation. This moment crystallized my calling: to be the internist who sees what others miss, who advocates 
                    when patients cannot, and who finds elegant solutions to complex puzzles."
                  </p>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Improvements:</strong> Compelling opening, specific example, demonstrates clinical acumen, shows values
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Review Package
            </h2>
            <p className="text-xl text-gray-600">
              Fast turnaround, expert reviewers, guaranteed satisfaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900">${pkg.price}</div>
                  <p className="text-gray-600 mt-2">{pkg.turnaround} turnaround</p>
                </CardHeader>
                <CardContent className="pb-8">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
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

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who matched with our help
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.program}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={personalStatementFAQs}
        title="Personal Statement Review FAQs"
        description="Everything you need to know about our personal statement review service"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your Personal Statement Determines Your Future
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Don't leave it to chance. Get expert review from physicians who've been where you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/new">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Start Your Review Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                View All Packages
              </Button>
            </Link>
          </div>
          <p className="text-blue-100 mt-6">
            ⏰ ERAS deadline approaching • 24-hour turnaround available
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}