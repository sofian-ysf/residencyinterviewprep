"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Shield, Clock, Users, Award, AlertTriangle, DollarSign, XCircle, ArrowRight, Target, Trophy, ChevronRight, Minus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

const packages = [
  {
    name: "Essential",
    price: 399,
    description: "Core application review",
    features: [
      "Personal Statement review (1 round)",
      "5 Experience descriptions", 
      "48-hour turnaround",
      "Character count optimization",
    ],
    popular: false,
  },
  {
    name: "Comprehensive",
    price: 799,
    description: "Complete application package",
    features: [
      "Personal Statement (2 rounds)",
      "All 10 Experience descriptions",
      "3 Most Meaningful Experiences",
      "Program Signal strategy",
      "48-hour turnaround",
      "Specialty-specific optimization",
      "Red flag identification"
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: 1199,
    description: "Full service with support",
    features: [
      "Everything in Comprehensive",
      "Unlimited revisions (30 days)",
      "24-hour rush option",
      "Direct messaging with reviewer",
      "Program list optimization",
      "Strategy call (30 min)"
    ],
    popular: false,
  },
  {
    name: "Complete",
    price: 1799,
    description: "End-to-end guidance",
    features: [
      "Everything in Premium",
      "Letters of Recommendation",
      "Secondary apps (10 programs)",
      "Weekly check-ins",
      "Interview prep (3 sessions)",
      "Match guarantee"
    ],
    popular: false,
  }
];

const stats = [
  { value: "85%", label: "Match Rate" },
  { value: "10,000+", label: "Applications Reviewed" },
  { value: "5.2×", label: "More Interviews" },
  { value: "48hr", label: "Turnaround" }
];

const testimonials = [
  {
    name: "Sarah M., MD",
    program: "Internal Medicine, Johns Hopkins",
    content: "From 0 interviews last year to 14 this year. The strategic positioning made all the difference.",
    stats: "USMLE: 235 | Interviews: 14 | Matched: #1"
  },
  {
    name: "Michael K., DO",
    program: "General Surgery, Mayo Clinic",
    content: "They transformed my average application into something that stood out. Worth every penny.",
    stats: "COMLEX: 580 | Interviews: 18 | Matched: #2"
  },
  {
    name: "Jennifer L., MD",
    program: "Pediatrics, CHOP",
    content: "The program signal strategy alone secured interviews at all my top choices.",
    stats: "Step 1: 251 | Interviews: 22 | Matched: #1"
  }
];

const faqs = [
  {
    question: "What if I don't match?",
    answer: "We offer a 100% money-back guarantee if you don't receive any interview invitations. Plus, we'll work with you through SOAP at no additional cost."
  },
  {
    question: "How are you different?",
    answer: "Our reviewers are physicians who've served on admission committees. We don't just edit - we strategically position you for your specific specialty."
  },
  {
    question: "Is it worth the investment?",
    answer: "Not matching costs you $300,000+ in lost attending salary. Our clients average 5x more interviews. The ROI is clear."
  },
  {
    question: "What about competitive specialties?",
    answer: "We've helped IMGs match into Dermatology, Orthopedics, and Interventional Radiology. Your reviewer will be matched to your specialty."
  },
  {
    question: "How fast is the turnaround?",
    answer: "Standard turnaround is 48 hours. Premium packages get 24-hour priority. We've never missed a deadline."
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <AlertTriangle className="h-4 w-4" />
              <span>42% of applicants didn't match last year</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Your application has
              <span className="block text-gray-400">7 seconds</span>
              <span className="block">to impress.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Program directors spend seconds scanning each application. 
              One weak statement, one poorly written experience — that's all it takes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="#pricing">
                <Button size="lg" className="text-base px-8 py-6 bg-gray-900 hover:bg-gray-800 text-white rounded-lg cursor-pointer">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#testimonials">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 border-gray-300 rounded-lg cursor-pointer">
                  See Success Stories
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-600">
              {stats.slice(0, 3).map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span>{stat.value} {stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The cost of not matching
            </h2>
            <p className="text-lg text-gray-600">
              Every unmatched year compounds into lost opportunities and income.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl">
              <div className="text-3xl font-bold text-gray-900 mb-2">$300,000</div>
              <div className="text-gray-600">Lost attending income per year</div>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="text-3xl font-bold text-gray-900 mb-2">$8,000+</div>
              <div className="text-gray-600">Reapplication costs</div>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="text-3xl font-bold text-gray-900 mb-2">12 months</div>
              <div className="text-gray-600">Career delay minimum</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Match at your dream program
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Strategic positioning</h3>
                    <p className="text-gray-600">We know exactly what program directors look for in your specialty.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">5-10× more interviews</h3>
                    <p className="text-gray-600">Our clients average 12 interviews versus the typical 2-3.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Match guarantee</h3>
                    <p className="text-gray-600">100% refund if you don't receive interview invitations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-10 rounded-2xl">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Recent Matches</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">2 hours ago</p>
                  <p className="font-medium text-gray-900 mb-1">Orthopedics at Stanford</p>
                  <p className="text-sm text-gray-600">IMG with Step 1: 245</p>
                </div>
                <div className="bg-white p-6 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Yesterday</p>
                  <p className="font-medium text-gray-900 mb-1">Dermatology at NYU</p>
                  <p className="text-sm text-gray-600">15 interview invites</p>
                </div>
                <div className="bg-white p-6 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">3 days ago</p>
                  <p className="font-medium text-gray-900 mb-1">Internal Medicine at Hopkins</p>
                  <p className="text-sm text-gray-600">Matched #1 choice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#f3f4f6] text-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the level of support that fits your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl p-8 ${
                  pkg.popular 
                    ? 'ring-2 ring-gray-900' 
                    : 'border border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 mb-6">{pkg.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/auth/signup" className="block">
                  <Button 
                    className={`w-full rounded-lg py-3 cursor-pointer ${
                      pkg.popular 
                        ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                        : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-gray-600">
              All plans include HIPAA-compliant security and 100% money-back guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by thousands
            </h2>
            <p className="text-lg text-gray-600">
              Real results from real applicants
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gray-900 text-gray-900" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="pt-6 border-t border-gray-100">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 mb-3">{testimonial.program}</div>
                  <div className="text-xs text-gray-500 font-mono">{testimonial.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently asked questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
                    openFaq === index ? 'rotate-90' : ''
                  }`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#f3f4f6]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to secure your match?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands who trusted us with their future
          </p>
          
          <Link href="/auth/signup">
            <Button size="lg" className="text-base px-10 py-6 bg-white hover:bg-gray-100 text-gray-900 rounded-lg cursor-pointer">
              Start Your Review
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <div className="mt-8 flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>100% Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>48-hour turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Payment plans available</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}