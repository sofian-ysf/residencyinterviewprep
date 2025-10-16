"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, CheckCircle, ArrowRight, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RelatedInterviewLinks from "@/components/RelatedInterviewLinks";

const questionCategories = [
  {
    id: "behavioral",
    name: "Behavioral & Situational Questions",
    description: "Common behavioral questions about teamwork, conflict, and challenges",
    questions: [
      "Tell me about yourself.",
      "Walk me through your CV/resume.",
      "Why did you choose medicine?",
      "Describe a time you worked on a team. What was your role?",
      "Tell me about a time you had a conflict with a colleague. How did you handle it?",
      "Describe a situation where you had to give difficult feedback to someone.",
      "Tell me about your biggest failure or mistake. What did you learn?",
      "Describe a time you disagreed with a supervisor. How did you handle it?",
      "Tell me about a time you had too many tasks to complete. How did you prioritize?",
      "Describe a situation where you went above and beyond for a patient.",
      "Tell me about a time you advocated for a patient.",
      "Describe a challenging patient interaction. How did you handle it?",
      "Tell me about a time you received critical feedback. How did you respond?",
      "Describe a situation where you made a mistake. How did you address it?",
      "Tell me about your most memorable patient encounter."
    ]
  },
  {
    id: "why-specialty",
    name: "Why This Specialty Questions",
    description: "Questions about your specialty choice and career motivation",
    questions: [
      "Why [specialty]?",
      "When did you know [specialty] was right for you?",
      "What specific moment confirmed your interest in [specialty]?",
      "Why [specialty] over [similar specialty]? (e.g., IM vs FM, EM vs critical care)",
      "What excites you most about [specialty]?",
      "What challenges do you anticipate in [specialty]?",
      "How do you see yourself practicing [specialty] in 10 years?",
      "What aspects of [specialty] are you least excited about?",
      "Do you plan to pursue a fellowship? If so, which one and why?",
      "Are you interested in academics, private practice, or both?"
    ]
  },
  {
    id: "why-program",
    name: "Why Our Program Questions",
    description: "Program-specific questions requiring research",
    questions: [
      "Why are you interested in our program?",
      "What do you know about our program?",
      "What specific aspects of our program appeal to you?",
      "Have you been to [city] before? What do you think of it?",
      "How does our program fit your career goals?",
      "What questions do you have about our program?",
      "What would you bring to our program?",
      "How do you see yourself fitting into our program culture?",
      "What differentiates our program from others you're interviewing at?",
      "Where does our program rank on your list?"
    ]
  },
  {
    id: "weaknesses",
    name: "Weaknesses & Red Flag Questions",
    description: "Questions addressing potential concerns or weaknesses",
    questions: [
      "What is your greatest weakness?",
      "What aspect of medicine do you struggle with most?",
      "I see you failed/scored low on [Step exam]. Can you explain?",
      "I notice you have a gap in your timeline. What did you do during that time?",
      "Why are you reapplying this year?",
      "I see you're applying to multiple specialties. How did you decide?",
      "Your research seems limited. Why is that?",
      "I notice you didn't honor [rotation]. What happened?",
      "You're applying to a very broad geographic range. Are you willing to go anywhere?",
      "Your scores are lower than our average. Why should we rank you highly?",
      "I see you switched medical schools. Can you explain?",
      "You've been out of medical school for [X years]. Why the gap?",
      "Tell me about your professionalism concern/academic warning.",
      "Why didn't you match last year?",
      "I notice your letters are all from [one specialty]. Why are you switching?"
    ]
  },
  {
    id: "clinical",
    name: "Clinical Scenario Questions",
    description: "Questions about patient cases and clinical decision-making",
    questions: [
      "Tell me about your most challenging patient case.",
      "Describe a complex patient you managed. Walk me through your decision-making.",
      "How do you approach diagnostic uncertainty?",
      "Tell me about a time you had to make a quick clinical decision.",
      "Describe a case where you diagnosed something others missed.",
      "How do you handle situations where you don't know the answer?",
      "Tell me about a patient who died under your care. How did you cope?",
      "Describe a situation where you had to deliver bad news to a family.",
      "How do you approach informed consent conversations?",
      "Tell me about a time you had to manage multiple sick patients simultaneously.",
      "Describe your approach to end-of-life care decisions.",
      "How do you handle aggressive or violent patients?",
      "Tell me about a medication error you caught or made.",
      "Describe a situation where you had to call a code or manage an emergency.",
      "How do you approach patients who refuse recommended treatment?"
    ]
  },
  {
    id: "ethical",
    name: "Ethical & Professionalism Questions",
    description: "Questions about medical ethics and professional scenarios",
    questions: [
      "What would you do if you saw a colleague making a mistake?",
      "How would you handle a colleague who appears impaired at work?",
      "What would you do if a patient requested futile treatment?",
      "How do you approach situations where family wants aggressive care but the patient has a poor prognosis?",
      "What would you do if a patient refused a transfusion for religious reasons?",
      "How would you handle parents who refuse vaccines for their child?",
      "What would you do if you suspected child abuse?",
      "How do you approach patients with limited English proficiency?",
      "What would you do if a patient couldn't afford their medications?",
      "How do you handle situations where you disagree with an attending's plan?",
      "What would you do if you caught a colleague lying in documentation?",
      "How do you approach patients seeking opioids or controlled substances?",
      "What would you do if a patient requested physician-assisted death?",
      "How do you handle situations where cultural beliefs conflict with medical recommendations?",
      "What would you do if you discovered a HIPAA violation?"
    ]
  },
  {
    id: "strengths-goals",
    name: "Strengths & Career Goals",
    description: "Questions about your strengths and future plans",
    questions: [
      "What are your greatest strengths?",
      "What do you think you'll bring to our program?",
      "What makes you unique compared to other applicants?",
      "Where do you see yourself in 10 years?",
      "What are your career goals?",
      "What type of practice setting do you envision (academic, community, private)?",
      "Do you see yourself staying in [location] long-term?",
      "What leadership experiences have prepared you for residency?",
      "What teaching experience do you have?",
      "How do you plan to contribute to medical education as a resident?",
      "What research interests do you have?",
      "What quality improvement projects have you worked on?",
      "What are you most proud of in your application?",
      "What accomplishment are you most proud of?",
      "What do you do for fun outside of medicine?"
    ]
  },
  {
    id: "img",
    name: "IMG-Specific Questions",
    description: "Questions commonly asked to International Medical Graduates",
    questions: [
      "Why do you want to practice medicine in the United States?",
      "How does your medical education compare to US medical schools?",
      "Tell me about your clinical experience in [your country].",
      "How will you adapt to the US healthcare system?",
      "What challenges do you anticipate as an IMG?",
      "How do you plan to address any language or communication barriers?",
      "Why did you attend medical school outside the US?",
      "What visa are you applying under? What are your long-term plans?",
      "How do you plan to stay in touch with family while in residency?",
      "What do you know about our healthcare delivery system?",
      "How will your international background enhance our program?",
      "Have you taken USMLE Step 3 yet? Why or why not?",
      "What US clinical experience do you have?",
      "How do you stay current with US medical practices and guidelines?",
      "Do you have family or connections in the US?"
    ]
  },
  {
    id: "research-academic",
    name: "Research & Academic Questions",
    description: "Questions about research experience and academic interests",
    questions: [
      "Tell me about your research.",
      "What was your hypothesis and what were your results?",
      "What did you learn from your research experience?",
      "Do you plan to continue research during residency?",
      "What are your long-term academic goals?",
      "How do you stay current with medical literature?",
      "Describe a recent paper you read that changed your practice.",
      "What quality improvement project have you worked on?",
      "Do you see yourself in academic medicine?",
      "What teaching experience do you have?",
      "How would you teach [concept] to a medical student?",
      "What role do you think research should play in residency?",
      "Tell me about a time you critically appraised a study.",
      "What statistical methods are you familiar with?",
      "Have you published? What's your role in the publication?"
    ]
  },
  {
    id: "worklife",
    name: "Work-Life Balance & Wellness",
    description: "Questions about resilience, burnout, and self-care",
    questions: [
      "How do you handle stress?",
      "What do you do to maintain wellness?",
      "How do you prevent burnout?",
      "What are your hobbies outside of medicine?",
      "How do you maintain work-life balance?",
      "Tell me about a time you felt overwhelmed. How did you cope?",
      "What support systems do you have in place?",
      "How do you recharge after difficult days?",
      "What would you do if you felt burned out during residency?",
      "How do you handle sleep deprivation?",
      "What's your approach to self-care?",
      "How do you plan to stay connected with family/friends during residency?",
      "What concerns do you have about residency life?",
      "How do you handle criticism or negative feedback?",
      "What would you do if you saw a colleague struggling with burnout?"
    ]
  },
  {
    id: "program-fit",
    name: "Program Fit & Culture Questions",
    description: "Questions assessing your compatibility with the program",
    questions: [
      "What kind of program culture are you looking for?",
      "Do you prefer a competitive or collaborative environment?",
      "What size program are you looking for (large vs small)?",
      "Are you more interested in patient care, teaching, or research?",
      "What qualities do you look for in co-residents?",
      "How do you handle conflict within a team?",
      "What's your preferred feedback style (direct vs gentle)?",
      "Do you prefer structured or independent learning?",
      "What role do you usually take in group projects?",
      "How would your classmates describe you?",
      "What kind of attending supervision do you prefer?",
      "Are you comfortable with high patient volumes?",
      "How do you feel about working in [urban/rural/suburban] settings?",
      "What diversity initiatives are important to you?",
      "What does mentorship mean to you?"
    ]
  },
  {
    id: "curveball",
    name: "Curveball & Unexpected Questions",
    description: "Unusual questions to assess thinking and personality",
    questions: [
      "If you weren't in medicine, what would you be doing?",
      "What's the last book you read?",
      "Who is your role model and why?",
      "If you could have dinner with anyone, alive or dead, who would it be?",
      "What's your favorite movie and why?",
      "Teach me something in 2 minutes.",
      "What would you do with a million dollars?",
      "What's the most interesting case you've read about recently?",
      "If you could solve one healthcare problem, what would it be?",
      "What's your superhero power?",
      "What three items would you bring to a deserted island?",
      "What would your autobiography be titled?",
      "What's the best advice you've ever received?",
      "If you could be any age, what age would you be and why?",
      "What's something people would be surprised to learn about you?"
    ]
  },
  {
    id: "closing",
    name: "Closing Questions & Your Questions",
    description: "Questions to ask interviewers and final thoughts",
    questions: [
      "What questions do you have for me?",
      "Is there anything else you'd like us to know about you?",
      "Is there anything in your application you'd like to clarify?",
      "Why should we rank you highly?",
      "What concerns do you have about our program?",
      "What other programs are you interviewing at?",
      "Where do you see yourself ranking us?",
      "Anything else you'd like to add?"
    ]
  }
];

const goodQuestionsToAsk = [
  "What do residents at your program do after graduation? (Fellowship vs practice)",
  "Can you describe the teaching style of the faculty?",
  "What mentorship opportunities exist for residents interested in [your interest]?",
  "How does the program support wellness and prevent burnout?",
  "What's the culture like among residents? Competitive vs collaborative?",
  "What opportunities exist for research/QI during residency?",
  "How involved are residents in teaching medical students?",
  "What's the patient population like? What conditions do you see most?",
  "How much autonomy do residents have in patient management?",
  "What are the biggest challenges facing the program currently?",
  "How has the program changed in recent years?",
  "What do you wish you'd known before joining this program?",
  "How does the program handle resident feedback and concerns?",
  "What's your favorite thing about working here?",
  "What opportunities exist for electives or rotations outside the program?"
];

export default function InterviewQuestionsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = questionCategories.filter(category => {
    if (selectedCategory && category.id !== selectedCategory) return false;
    if (!searchTerm) return true;
    return category.questions.some(q =>
      q.toLowerCase().includes(searchTerm.toLowerCase())
    ) || category.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalQuestions = questionCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Free Resource from Ex-Program Directors</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Complete Residency Interview<br />
              <span className="text-gray-600">Question Bank</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive database of {totalQuestions}+ real residency interview questions organized by category.
              Compiled by ex-program directors who've conducted 1,000+ interviews.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/mock-interviews">
                <Button size="lg" className="px-8 py-6 bg-gray-900 hover:bg-gray-800 text-white cursor-pointer">
                  Practice with Mock Interviews
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{totalQuestions}+</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">13</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">Free</div>
                <div className="text-sm text-gray-600">Always</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Filter by category:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                  selectedCategory === null
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {questionCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Questions Database */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {filteredCategories.map((category, index) => (
              <div key={category.id} className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <div className="flex-shrink-0 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {category.questions.length} questions
                  </div>
                </div>

                <div className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <div
                      key={qIndex}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700 mt-0.5">
                        {qIndex + 1}
                      </div>
                      <p className="text-gray-800">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good Questions to Ask */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Good Questions to Ask Your Interviewers
              </h2>
              <p className="text-gray-600 mb-8">
                Always prepare 3-5 thoughtful questions to ask at the end of your interview. Here are examples:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {goodQuestionsToAsk.map((question, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-gray-900 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{question}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg">
                <h3 className="font-semibold mb-3">Pro Tips for Asking Questions:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Don't ask questions answered on the website or in the presentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Tailor questions based on who you're talking to (resident vs faculty vs PD)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Ask open-ended questions that show genuine interest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Avoid questions about salary, vacation, or call schedule early in the interview</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Practice These Questions?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Reading questions is helpful. Practicing with ex-program directors is transformative.
            Master your answers with realistic mock interviews.
          </p>

          <Link href="/mock-interviews">
            <Button size="lg" className="px-10 py-6 text-base bg-white hover:bg-gray-100 text-gray-900 cursor-pointer">
              Start Mock Interview Practice
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Expert feedback on your answers</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Realistic interview pressure</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Personalized coaching</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <RelatedInterviewLinks currentPage="/interview-questions" />

      <Footer />
    </div>
  );
}
