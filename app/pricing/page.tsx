'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PRICING_PLANS, INTERVIEW_PREP_PACKAGES } from '@/config/pricing';
import PaymentModal from '@/components/payment/PaymentModal';
import { Button } from '@/components/ui/button';
import { Video, Star, Trophy } from 'lucide-react';

export default function PricingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleSelectPlan = (plan: any) => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/pricing');
      return;
    }
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Package
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert review and coaching services to maximize your residency match success.
            All packages include personalized feedback from experienced physicians.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 ${
                plan.highlighted ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  {plan.badge}
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">
                    {plan.interval === 'one-time' ? 'one-time' : '/month'}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Interview Preparation Packages */}
        <div className="mt-16 mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Video className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Interview Preparation Coaching</h2>
            </div>
            <p className="text-center text-blue-100 text-lg max-w-3xl mx-auto">
              Master your residency interviews with expert coaching from ex-program directors.
              Mock interviews, personalized feedback, and insider preparation materials.
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">5.8x</div>
                <div className="text-sm text-blue-100">More Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">97%</div>
                <div className="text-sm text-blue-100">Match Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-blue-100">Students Coached</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {INTERVIEW_PREP_PACKAGES.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 border-2 ${
                  plan.highlighted
                    ? 'border-blue-500 shadow-2xl'
                    : 'border-gray-200'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute top-0 right-0 px-4 py-1 text-sm font-semibold rounded-bl-lg ${
                    plan.highlighted
                      ? 'bg-blue-500 text-white'
                      : 'bg-yellow-400 text-gray-900'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>

                  {plan.valueProps && plan.valueProps.length > 0 && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      {plan.valueProps.slice(0, 2).map((prop: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
                          <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-blue-900 font-medium">{prop}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="space-y-3 mb-8">
                    {plan.features.slice(0, 6).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 6 && (
                      <li className="text-sm text-blue-600 font-medium">
                        + {plan.features.length - 6} more features
                      </li>
                    )}
                  </ul>

                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      plan.highlighted
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services/interview-prep"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <Trophy className="h-5 w-5" />
              View Complete Interview Prep Details & Success Stories →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Why Choose Our Services?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2 1 1 0 100-2 2 2 0 012 2v8a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Expert Reviewers</h3>
              <p className="text-sm text-gray-600">Experienced medical professionals</p>
            </div>
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">High Success Rate</h3>
              <p className="text-sm text-gray-600">95% match rate improvement</p>
            </div>
            <div>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Fast Turnaround</h3>
              <p className="text-sm text-gray-600">Quick review times available</p>
            </div>
            <div>
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Personalized Feedback</h3>
              <p className="text-sm text-gray-600">Tailored to your specialty</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Questions about our packages? We're here to help.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push('/contact')}
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Contact Support
          </Button>
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          amount={selectedPlan.price}
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedPlan(null);
          }}
        />
      )}
    </div>
  );
}