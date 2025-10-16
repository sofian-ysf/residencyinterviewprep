"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Shield, Clock, Users, Award, AlertTriangle, Target, Trophy, ChevronRight, Video, BookOpen, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SitelinksSchema from "@/components/SitelinksSchema";
import { ServiceListSchema } from "@/components/seo/ServiceSchema";
import Script from "next/script";
import { useState } from "react";

const packages = [
  {
    name: "Essential Interview Prep",
    price: 499,
    description: "Perfect for first-time applicants",
    features: [
      "3 Full-Length Mock Interviews with Detailed Feedback",
      "Comprehensive Preparation Booklet",
      "Virtual Interview Setup & Technical Guide",
      "Common Question Response Framework",
      "Email Support for 30 Days"
    ],
    popular: false,
  },
  {
    name: "Professional Interview Mastery",
    price: 899,
    description: "Most comprehensive preparation",
    features: [
      "Everything in Essential Package",
      "6 Full-Length Mock Interviews with Expert Coaching",
      "Advanced Preparation Booklet by Ex-Program Directors",
      "2 One-on-One Strategy Sessions (45 min each)",
      "Personalized Weakness Analysis & Improvement Plan",
      "Behavioral Question Deep-Dive Sessions",
      "Program-Specific Research & Talking Points",
      "Priority Email & Phone Support for 60 Days"
    ],
    popular: true,
  },
  {
    name: "Elite Interview Concierge",
    price: 1399,
    description: "White-glove coaching service",
    features: [
      "Everything in Professional Package",
      "10 Full-Length Mock Interviews with Video Analysis",
      "Premium Preparation Booklet + Competitive Program Guide",
      "4 One-on-One Strategy Sessions (60 min each)",
      "Dedicated Ex-Program Director Mentor",
      "Program-by-Program Customized Preparation",
      "Post-Interview Debrief Calls (within 24 hours)",
      "Body Language & Communication Coaching",
      "Direct Phone/Text Access to Your Mentor",
      "100% Money-Back Guarantee if No Interview Improvement"
    ],
    popular: false,
  }
];

const stats = [
  { value: "95%", label: "Match Rate" },
  { value: "500+", label: "Residents Trained" },
  { value: "4.8×", label: "More Callbacks" },
  { value: "24", label: "Specialties Covered" }
];

const testimonials = [
  {
    name: "Dr. James P., MD",
    program: "Internal Medicine, Johns Hopkins",
    content: "From zero confidence to crushing every interview. The mock interviews with ex-program directors were game-changing.",
    stats: "Mock Interviews: 6 | Real Interviews: 15 | Matched: #1"
  },
  {
    name: "Dr. Sarah K., DO",
    program: "General Surgery, Mayo Clinic",
    content: "As an IMG, I was terrified of interviews. This program gave me the tools and confidence to excel. Worth every penny.",
    stats: "Mock Interviews: 8 | Real Interviews: 12 | Matched: Top 3"
  },
  {
    name: "Dr. Michael L., MD",
    program: "Ortho, Stanford",
    content: "The preparation materials and personalized coaching gave me unstoppable confidence in every interview.",
    stats: "Mock Interviews: 10 | Real Interviews: 18 | Matched: #1"
  }
];

const faqs = [
  {
    question: "How soon should I start preparing?",
    answer: "Ideally 4-8 weeks before your first interview. However, we've helped candidates succeed with as little as 1-2 weeks of intensive preparation."
  },
  {
    question: "Are the mock interviews realistic?",
    answer: "Absolutely. Our coaches are ex-program directors and chief residents who conducted thousands of real residency interviews. They replicate the exact format, questions, and pressure of actual interviews."
  },
  {
    question: "What if I'm applying to a competitive specialty?",
    answer: "Perfect! We specialize in competitive specialties like Dermatology, Orthopedics, and Neurosurgery. Our Elite package includes program-specific preparation and red flag mitigation."
  },
  {
    question: "Do you help IMGs and reapplicants?",
    answer: "Yes! Many of our most successful students are IMGs and reapplicants. We provide specialized coaching to address unique challenges and turn potential weaknesses into strengths."
  },
  {
    question: "What's the money-back guarantee?",
    answer: "If you complete our Elite package and don't see measurable improvement in your interview performance, we'll refund 100% of your investment. We're that confident."
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Services for ItemList schema
  const services = [
    {
      name: "Mock Interview Coaching",
      description: "Realistic residency interview practice with ex-program directors",
      url: "https://www.residencyinterviewprep.com/services/mock-interviews",
      price: "499"
    },
    {
      name: "Interview Prep Booklets",
      description: "Comprehensive preparation guides with insider knowledge from ex-program directors",
      url: "https://www.residencyinterviewprep.com/services/prep-booklets",
      price: "499"
    },
    {
      name: "One-on-One Strategy Sessions",
      description: "Personalized coaching sessions with ex-program directors",
      url: "https://www.residencyinterviewprep.com/services/strategy-sessions",
      price: "899"
    }
  ];

  // Aggregate Rating schema
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ResidencyInterviewPrep",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "487",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SitelinksSchema />
      <ServiceListSchema services={services} />
      <Script
        id="aggregate-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingSchema)
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="line-clamp-1">Interview performance determines 70% of match decisions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Master your residency
              <span className="block text-gray-400">interviews with</span>
              <span className="block">expert mock interviews.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">
              Practice with ex-program directors who conducted 1,000+ real residency interviews.
              Realistic simulations, personalized feedback, and proven techniques. 95% match rate.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link href="/mock-interviews" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6 bg-gray-900 hover:bg-gray-800 text-white rounded-lg cursor-pointer">
                  View Mock Interview Packages
                  <Video className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link href="#testimonials" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6 border-gray-300 rounded-lg cursor-pointer text-black">
                  See Success Stories
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
              {stats.slice(0, 3).map((stat, i) => (
                <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                  <span className="whitespace-nowrap">{stat.value} {stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              The interview makes or breaks your match
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Your application gets you the interview. Your interview performance gets you the match.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl">
              <div className="text-3xl font-bold text-gray-900 mb-2">15 min</div>
              <div className="text-gray-600">Average interview duration to prove yourself</div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl">
              <div className="text-3xl font-bold text-gray-900 mb-2">70%</div>
              <div className="text-gray-600">Weight of interview in final ranking</div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl">
              <div className="text-3xl font-bold text-gray-900 mb-2">1 shot</div>
              <div className="text-gray-600">No second chances with your dream program</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                Walk into every interview with confidence
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Realistic Mock Interviews</h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Practice with ex-program directors who replicate real interview conditions.</p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Comprehensive Prep Booklets</h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Insider knowledge and proven response frameworks from ex-program directors.</p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Personalized Coaching</h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">One-on-one sessions to eliminate weaknesses and maximize your strengths.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl mt-8 lg:mt-0">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6">Recent Success Stories</h3>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">This week</p>
                  <p className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Matched Ortho at Stanford</p>
                  <p className="text-xs sm:text-sm text-gray-600">15 interviews after our prep (had 3 before)</p>
                </div>
                <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Last week</p>
                  <p className="font-medium text-gray-900 mb-1 text-sm sm:text-base">IMG Matched Derm at NYU</p>
                  <p className="text-xs sm:text-sm text-gray-600">Overcame red flags with our coaching</p>
                </div>
                <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">2 weeks ago</p>
                  <p className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Reapplicant Matched IM at Hopkins</p>
                  <p className="text-xs sm:text-sm text-gray-600">From 0 to 14 interviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-[#f3f4f6] text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
      <section id="pricing" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Choose your preparation level
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              From essential preparation to white-glove coaching
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 ${
                  pkg.popular
                    ? 'ring-2 ring-gray-900'
                    : 'border border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-900 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">{pkg.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">${pkg.price}</span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup" className="block">
                  <Button
                    className={`w-full rounded-lg py-2.5 sm:py-3 cursor-pointer text-sm ${
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

          <div className="text-center mt-8 sm:mt-12 px-4">
            <p className="text-xs sm:text-sm text-gray-600">
              All plans include 100% money-back guarantee and lifetime access to prep materials
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              From nervous to confident
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Real results from residents who prepared with us
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl">
                <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-gray-900 text-gray-900" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="pt-4 sm:pt-6 border-t border-gray-100">
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{testimonial.program}</div>
                  <div className="text-xs text-gray-500 font-mono">{testimonial.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Frequently asked questions
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900 text-sm sm:text-base pr-2">{faq.question}</span>
                  <ChevronRight className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform flex-shrink-0 ${
                    openFaq === index ? 'rotate-90' : ''
                  }`} />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                    <p className="text-gray-600 text-sm sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-[#f3f4f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to ace your interviews?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10">
            Join 500+ residents who prepared with us and matched at their dream programs
          </p>

          <Link href="/auth/signup">
            <Button size="lg" className="text-sm sm:text-base px-6 sm:px-10 py-4 sm:py-6 bg-white hover:bg-gray-100 text-gray-900 rounded-lg cursor-pointer">
              Start Your Preparation
              <Video className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>100% Money-back guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>Start within 24 hours</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>Lifetime booklet access</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
