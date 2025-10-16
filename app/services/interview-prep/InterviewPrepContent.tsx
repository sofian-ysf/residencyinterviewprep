'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PaymentModal from '@/components/payment/PaymentModal';
import { INTERVIEW_PREP_PACKAGES } from '@/config/pricing';
import {
  Users,
  Video,
  Award,
  CheckCircle2,
  Star,
  TrendingUp,
  Target,
  BookOpen,
  Mic,
  Trophy,
  ArrowRight,
  MessageSquare,
  Clock,
  Shield
} from 'lucide-react';

export default function InterviewPrepContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleSelectPlan = (plan: any) => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/services/interview-prep');
      return;
    }
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#f3f4f6] py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
              <Trophy className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Curated by Ex-Program Directors</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Master Your Residency Interviews with Expert Coaching
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Get personalized mock interviews, strategic coaching, and insider preparation materials
              created by physicians who have sat on residency selection committees. Transform your
              interview performance and secure your dream match.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-1">5.8x</div>
                <div className="text-sm text-gray-600">More Interview Invites</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-1">97%</div>
                <div className="text-sm text-gray-600">Match Success Rate</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Students Coached</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-1">15+</div>
                <div className="text-sm text-gray-600">Program Directors</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const packagesSection = document.getElementById('packages');
                  packagesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                View Packages
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                href="/guides/interview-prep"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Free Interview Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Who Benefits from Our Interview Coaching?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive coaching program is designed for diverse applicants at different stages
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">International Medical Graduates (IMGs)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                IMGs face unique challenges: explaining your medical education, addressing visa questions,
                demonstrating cultural fit, and overcoming potential communication barriers. Our IMG-specialized
                coaches have helped hundreds of international graduates navigate these challenges and match into
                top programs. We understand the unique pressures IMGs face and provide targeted strategies to
                turn potential weaknesses into compelling strengths.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Applicants with Red Flags</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Failed Step exams? Gap years? Reapplying? Professionalism concerns? These red flags require
                careful, strategic responses. Our coaches specialize in red flag mitigation and have successfully
                helped candidates with challenging applications match into competitive programs. We teach you how
                to address concerns honestly while reframing them positively and demonstrating growth.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Competitive Specialty Applicants</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Applying to Dermatology, Orthopedics, Neurosurgery, or other competitive fields? Interview
                performance is even more critical when competition is fierce. Our coaches from competitive
                specialties understand what separates ranked candidates from wait-listed ones. Every small
                mistake matters - we help you polish your performance to perfection.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">First-Time Interviewers & Anxious Applicants</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Interview anxiety is real and can sabotage even strong applicants. If you struggle with public
                speaking, feel nervous under pressure, or simply want to maximize your performance, our coaching
                builds genuine confidence. Through repeated practice in realistic conditions, you'll desensitize
                yourself to interview stress and develop natural, authentic responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Our Interview Coaching Stands Out
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike generic interview prep services, our coaching is led by physicians who have
              actually interviewed and selected residents for competitive programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Ex-Program Director Expertise
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from physicians who have served on residency selection committees at top programs.
                They know exactly what evaluators look for and how to stand out.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Personalized Weakness Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We identify your specific weaknesses through detailed mock interviews and provide
                targeted coaching to transform them into strengths before your real interviews.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Video className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Realistic Mock Interview Experience
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Practice in conditions that mirror real residency interviews. Video recording, playback
                analysis, and immediate feedback help you improve rapidly.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Exclusive Preparation Materials
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access our comprehensive preparation booklet created by ex-program directors, featuring
                proven response frameworks and strategies for common interview scenarios.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Program-Specific Preparation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We research each program you're interviewing at and help you develop specific talking
                points that demonstrate genuine interest and cultural fit.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Money-Back Guarantee
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're so confident in our Elite package that we offer a 100% money-back guarantee
                if you don't see measurable improvement in your interview performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Interview Preparation Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Invest in your future with expert coaching that delivers results.
              One successful match makes this investment worth every penny.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>

                  {/* Value Props */}
                  {plan.valueProps && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      {plan.valueProps.map((prop: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
                          <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-blue-900 font-medium">{prop}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2
                          className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-4 rounded-lg font-semibold transition-all shadow-lg ${
                      plan.highlighted
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ROI Note */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Investment That Pays for Itself
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Consider this: the difference between matching into your top-choice program versus a
                  backup can mean hundreds of thousands of dollars in lifetime earnings, not to mention
                  career satisfaction. Our students who invest in interview coaching receive an average of
                  <strong className="text-green-700"> 3.2x more match offers</strong> than those who don't.
                  One successful match into your dream residency makes this investment invaluable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              10 Common Interview Mistakes That Cost Candidates Their Top Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Avoid these critical errors that program directors see repeatedly. Our coaching eliminates these mistakes before your real interviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                mistake: "Generic, Rehearsed Answers",
                explanation: "Candidates who sound scripted or give cookie-cutter responses fail to connect authentically. Programs want genuine enthusiasm, not memorized speeches. We teach you frameworks, not scripts, so your answers feel natural while remaining strategic."
              },
              {
                mistake: "Failing to Research the Program",
                explanation: "Saying 'I don't know much about your program' is an instant red flag. Programs expect you to know their mission, faculty research, unique features, and recent achievements. We help you research effectively and develop specific talking points for each program."
              },
              {
                mistake: "Poor Body Language & Eye Contact",
                explanation: "Fidgeting, avoiding eye contact, or appearing disengaged sabotages even strong verbal responses. In virtual interviews, staring at the screen instead of the camera breaks connection. We analyze your body language through video review and provide specific corrections."
              },
              {
                mistake: "Rambling or Off-Topic Responses",
                explanation: "Long-winded answers that meander lose evaluators' attention. Concise, structured responses show clear thinking. We train you to answer questions in 60-90 seconds, hitting key points without rambling or going off-topic."
              },
              {
                mistake: "Defensive Red Flag Responses",
                explanation: "Getting defensive about failed exams, gaps, or weaknesses raises more concerns. Programs want candidates who take ownership, show growth, and demonstrate self-awareness. Our coaches perfect your red flag responses to turn weaknesses into demonstrations of resilience."
              },
              {
                mistake: "Asking Poor or No Questions",
                explanation: "Asking 'What's the call schedule?' or having no questions signals lack of genuine interest. Thoughtful questions demonstrate engagement and help you evaluate programs. We prepare 15+ excellent questions tailored to different interviewers (faculty, residents, PD)."
              },
              {
                mistake: "Badmouthing Other Programs or Specialties",
                explanation: "Speaking negatively about other programs, specialties, or medical schools reflects poorly on your professionalism. Even subtle negativity is a red flag. We teach you to explain your choices positively without disparaging alternatives."
              },
              {
                mistake: "Failing to Connect Your Story to the Specialty",
                explanation: "Generic statements like 'I love helping people' work for any specialty. Programs want to hear specific reasons WHY their specialty resonates with you, backed by experiences. We help you craft a compelling narrative unique to your specialty choice."
              },
              {
                mistake: "Appearing Overconfident or Arrogant",
                explanation: "Confidence is good; arrogance is disastrous. Talking down to interviewers, dismissing feedback, or seeming entitled turns programs off immediately. We calibrate your confidence level - assured but humble, accomplished but eager to learn."
              },
              {
                mistake: "Poor Virtual Interview Setup",
                explanation: "Bad lighting, messy backgrounds, technical issues, or unprofessional attire in virtual interviews creates negative impressions. We review your tech setup, lighting, camera angle, and virtual presence to ensure you present professionally."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{item.mistake}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed ml-11">{item.explanation}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Don't Let Avoidable Mistakes Cost You Your Dream Program
            </h3>
            <p className="text-gray-700 leading-relaxed text-center mb-6">
              Every year, strong candidates with excellent applications fail to match because of poor interview
              performance. The mistakes above are 100% preventable with proper preparation. Our mock interviews
              identify YOUR specific weaknesses and eliminate them before they cost you a match.
            </p>
            <div className="text-center">
              <button
                onClick={() => {
                  const packagesSection = document.getElementById('packages');
                  packagesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-lg inline-flex items-center gap-2"
              >
                Fix These Mistakes Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Master */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What You'll Master Through Our Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive skills development that transforms nervous candidates into confident interviewers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Communication Excellence",
                skills: [
                  "Structure clear, concise responses in 60-90 seconds",
                  "Use the STAR method for behavioral questions",
                  "Demonstrate active listening and engagement",
                  "Master verbal and non-verbal communication",
                  "Adapt communication style to different interviewers",
                  "Handle unexpected or curveball questions gracefully"
                ]
              },
              {
                category: "Strategic Content Development",
                skills: [
                  "Craft compelling personal narratives",
                  "Articulate specialty choice authentically",
                  "Demonstrate program-specific interest",
                  "Address red flags strategically",
                  "Showcase clinical knowledge appropriately",
                  "Connect experiences to program missions"
                ]
              },
              {
                category: "Confidence & Presence",
                skills: [
                  "Manage interview anxiety effectively",
                  "Project confidence without arrogance",
                  "Maintain appropriate body language and eye contact",
                  "Recover quickly from mistakes",
                  "Stay calm under pressure",
                  "Build genuine rapport with interviewers"
                ]
              }
            ].map((category, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIdx) => (
                    <li key={skillIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Start */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              When Should You Start Interview Preparation?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The ideal timeline for interview coaching depends on your situation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full text-white text-2xl font-bold mb-2">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-gray-900">Ideal: 6-8 Weeks Before</h3>
                <p className="text-green-700 font-medium">Best Results</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Starting 6-8 weeks before your first interview allows time for 4-6 mock interviews spaced out,
                with practice and refinement between sessions. This timeline produces the best results and lowest stress.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Multiple mock interview rounds</li>
                <li>• Time to implement feedback</li>
                <li>• Gradual confidence building</li>
                <li>• Program-specific preparation</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 border-2 border-yellow-300">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 rounded-full text-white text-2xl font-bold mb-2">
                  !
                </div>
                <h3 className="text-xl font-bold text-gray-900">Acceptable: 2-4 Weeks Before</h3>
                <p className="text-yellow-700 font-medium">Still Effective</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                With 2-4 weeks, you can still complete 2-3 quality mock interviews and see significant improvement.
                Requires more intensive preparation but definitely worthwhile.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Focused intensive practice</li>
                <li>• Essential skills coverage</li>
                <li>• Targeted weakness correction</li>
                <li>• Rapid confidence boost</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-8 border-2 border-red-300">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full text-white text-2xl font-bold mb-2">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-gray-900">Urgent: 1 Week or Less</h3>
                <p className="text-red-700 font-medium">Better Than Nothing</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Even with just days before interviews, one intensive mock interview session can identify critical
                mistakes and provide strategies. Many students report this still makes a meaningful difference.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Crash course essentials</li>
                <li>• Critical mistake identification</li>
                <li>• Confidence boost before D-day</li>
                <li>• Quick-win strategies</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              <strong className="text-gray-900">Bottom line:</strong> It's never too early or too late to start.
              The sooner you begin, the more polish you can add. But even last-minute prep beats no prep.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Our Interview Coaching Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Initial Assessment',
                description: 'We analyze your application, specialty, and interview schedule to create a personalized preparation plan.',
                icon: Target,
              },
              {
                step: '2',
                title: 'Study Materials',
                description: 'Receive our exclusive preparation booklet with proven response frameworks and strategic interview techniques.',
                icon: BookOpen,
              },
              {
                step: '3',
                title: 'Mock Interviews',
                description: 'Practice with ex-program directors in realistic interview scenarios. Get detailed feedback and coaching.',
                icon: Video,
              },
              {
                step: '4',
                title: 'Continuous Improvement',
                description: 'Refine your responses, improve body language, and build confidence through ongoing practice and support.',
                icon: TrendingUp,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Students
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                specialty: 'Internal Medicine',
                result: 'Matched at Johns Hopkins',
                quote: 'The mock interviews with Dr. Chen completely transformed my confidence. I went from nervous wreck to actually enjoying my interviews. Worth every penny!',
                rating: 5,
              },
              {
                name: 'Michael R.',
                specialty: 'Orthopedic Surgery',
                result: '12 Interview Invites',
                quote: 'As an IMG, I was terrified of interviews. The personalized coaching helped me overcome my accent concerns and present my strengths authentically. Matched at my #1!',
                rating: 5,
              },
              {
                name: 'Priya K.',
                specialty: 'Dermatology',
                result: 'Matched at Stanford',
                quote: 'The preparation booklet and personalized coaching were invaluable. The mock interviews in the Elite package gave me the practice I needed for a competitive specialty.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t border-gray-300 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.specialty}</div>
                  <div className="text-sm text-green-600 font-medium mt-1">
                    ✓ {testimonial.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Who are the coaches conducting the mock interviews?',
                answer: 'All our coaches are physicians who have served on residency selection committees at academic medical centers. They have personally interviewed hundreds of residency candidates and know exactly what programs look for.',
              },
              {
                question: 'How quickly can I get started?',
                answer: 'Once you purchase a package, you\'ll receive your preparation materials within 24 hours. We\'ll schedule your first mock interview within 2-3 business days based on your availability.',
              },
              {
                question: 'Is this coaching suitable for international medical graduates (IMGs)?',
                answer: 'Absolutely! We have extensive experience coaching IMGs and understand the unique challenges they face. Many of our success stories come from IMG students who matched into competitive programs.',
              },
              {
                question: 'What if I need more mock interviews than my package includes?',
                answer: 'You can always purchase additional mock interviews for $150 each. Alternatively, consider upgrading to a higher-tier package for better value.',
              },
              {
                question: 'Do you offer coaching for specific specialties?',
                answer: 'Yes! Our coaches have experience across all major specialties. We\'ll match you with a coach who has expertise in your specific field and understands what those programs look for.',
              },
              {
                question: 'What is your refund policy?',
                answer: 'Our Elite package comes with a 100% money-back guarantee if you don\'t see measurable improvement. For other packages, we offer refunds within 7 days if you haven\'t scheduled any mock interviews yet.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#f3f4f6]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Ready to Ace Your Residency Interviews?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful applicants who transformed their interview skills
            and matched into their dream programs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const packagesSection = document.getElementById('packages');
                packagesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-lg inline-flex items-center justify-center gap-2"
            >
              <Trophy className="h-5 w-5" />
              Start Your Preparation
            </button>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Talk to a Coach
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            <Clock className="inline h-4 w-4 mr-1" />
            Limited spots available each month to ensure personalized attention
          </p>
        </div>
      </section>

      <Footer />

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
