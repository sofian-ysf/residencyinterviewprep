"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, ArrowRight, Users, Award, Target, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/seo/FAQSection";
import RelatedInterviewLinks from "@/components/RelatedInterviewLinks";

interface SpecialtyData {
  name: string;
  slug: string;
  description: string;
  whySpecial: {
    title: string;
    points: string[];
  };
  commonQuestions: string[];
  stats: {
    matchRate: string;
    avgInterviews: string;
    programsTrained: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    program: string;
    stats: string;
  };
}

interface Props {
  specialty: SpecialtyData;
}

export default function SpecialtyInterviewPage({ specialty }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              <span>Specialty-Specific Interview Coaching</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {specialty.name}<br />
              <span className="text-gray-600">Interview Preparation & Mock Interviews</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {specialty.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/mock-interviews#packages">
                <Button size="lg" className="px-8 py-6 text-base bg-gray-900 hover:bg-gray-800 text-white cursor-pointer">
                  View Coaching Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="px-8 py-6 text-base border-gray-300 cursor-pointer text-black">
                  Book Free Consultation
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{specialty.stats.matchRate}</div>
                <div className="text-sm text-gray-600">Match Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{specialty.stats.avgInterviews}</div>
                <div className="text-sm text-gray-600">Avg Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{specialty.stats.programsTrained}</div>
                <div className="text-sm text-gray-600">Programs Trained</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Specialty-Specific Prep Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {specialty.whySpecial.title}
            </h2>
            <p className="text-lg text-gray-600">
              Generic interview prep won't cut it. You need {specialty.name}-specific coaching from experts who understand your field.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {specialty.whySpecial.points.map((point, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-gray-700">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Questions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
              Common {specialty.name} Interview Questions We Practice
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center">
              Our ex-program directors know the exact questions {specialty.name} programs ask
            </p>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <ul className="space-y-4">
                {specialty.commonQuestions.map((question, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{question}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-gray-600 text-center mb-4">
                  We'll help you craft perfect responses to these and 50+ more {specialty.name}-specific questions
                </p>
                <div className="text-center">
                  <Link href="/mock-interviews">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white cursor-pointer">
                      Start Mock Interview Practice
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What's Included in {specialty.name} Interview Coaching
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive preparation designed specifically for {specialty.name} residency interviews
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Specialty-Specific Mock Interviews
              </h3>
              <p className="text-gray-600">
                Practice with {specialty.name} program directors who know exactly what your programs look for.
                Realistic simulations of actual {specialty.name} interviews.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Expert {specialty.name} Coaches
              </h3>
              <p className="text-gray-600">
                All coaches are ex-program directors or chief residents from top {specialty.name} programs.
                They've evaluated thousands of {specialty.name} applicants.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Program-Specific Preparation
              </h3>
              <p className="text-gray-600">
                We research your target {specialty.name} programs and help you develop customized talking points,
                thoughtful questions, and program-specific strategies.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/mock-interviews">
              <Button size="lg" className="px-8 py-6 text-base bg-gray-900 hover:bg-gray-800 text-white cursor-pointer">
                View All Packages & Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-gray-900 text-gray-900" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 mb-8 leading-relaxed">
              "{specialty.testimonial.quote}"
            </blockquote>
            <div className="border-t border-gray-100 pt-6">
              <div className="font-semibold text-gray-900 text-lg">{specialty.testimonial.author}</div>
              <div className="text-gray-600 mb-2">{specialty.testimonial.program}</div>
              <div className="text-sm text-gray-500">{specialty.testimonial.stats}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={specialty.faqs}
        title={`${specialty.name} Interview Prep FAQs`}
        description={`Common questions about ${specialty.name} residency interview preparation`}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Master Your {specialty.name} Interviews?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join hundreds of {specialty.name} residents who prepared with our specialty-specific coaching
          </p>

          <Link href="/mock-interviews">
            <Button size="lg" className="px-10 py-6 text-base bg-white hover:bg-gray-100 text-gray-900 cursor-pointer">
              Start {specialty.name} Interview Prep
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Specialty-specific coaching</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Ex-program directors</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <RelatedInterviewLinks currentPage={`/interview-prep/${specialty.slug}`} specialty={specialty.slug} />

      <Footer />
    </div>
  );
}
