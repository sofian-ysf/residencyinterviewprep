'use client';

import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Users,
  GraduationCap,
  Stethoscope,
  Target,
  Mail,
  Video,
  Trophy,
  ChevronRight,
  Info
} from "lucide-react";

const timelineData = [
  {
    month: "January - March",
    year: "Application Year",
    phase: "Preparation",
    color: "bg-blue-500",
    tasks: [
      {
        title: "Personal Statement Draft",
        description: "Begin writing and revising your personal statement",
        icon: FileText,
        priority: "high",
        tips: "Start with multiple drafts, get feedback from mentors"
      },
      {
        title: "Request Letters of Recommendation",
        description: "Identify and approach letter writers",
        icon: Mail,
        priority: "high",
        tips: "Provide writers with CV and talking points"
      },
      {
        title: "Research Programs",
        description: "Create initial list of residency programs",
        icon: Target,
        priority: "medium",
        tips: "Consider geography, program size, and specialty focus"
      },
      {
        title: "Update CV/Resume",
        description: "Ensure all experiences are current",
        icon: GraduationCap,
        priority: "medium",
        tips: "Use AAMC format, quantify achievements"
      }
    ]
  },
  {
    month: "April - May",
    year: "Application Year",
    phase: "Registration",
    color: "bg-green-500",
    tasks: [
      {
        title: "ERAS Token Request",
        description: "Request your ERAS token from your medical school",
        icon: CheckCircle,
        priority: "high",
        tips: "Usually distributed by Dean's office"
      },
      {
        title: "Register with NRMP",
        description: "Create your NRMP account for the Match",
        icon: Users,
        priority: "high",
        tips: "Keep login credentials secure"
      },
      {
        title: "Photo Session",
        description: "Take professional headshot for ERAS",
        icon: Calendar,
        priority: "low",
        tips: "Business attire, neutral background"
      },
      {
        title: "Finalize Personal Statement",
        description: "Complete final revisions",
        icon: FileText,
        priority: "high",
        tips: "Have multiple people proofread"
      }
    ]
  },
  {
    month: "June",
    year: "Application Year",
    phase: "ERAS Opens",
    color: "bg-purple-500",
    tasks: [
      {
        title: "ERAS Registration Opens",
        description: "Create your ERAS account and begin application",
        icon: CheckCircle,
        priority: "high",
        tips: "Start immediately to avoid technical issues"
      },
      {
        title: "Enter Application Information",
        description: "Input education, experiences, and activities",
        icon: FileText,
        priority: "high",
        tips: "Be thorough and accurate"
      },
      {
        title: "Assign Personal Statement",
        description: "Upload and assign personal statements to programs",
        icon: FileText,
        priority: "high",
        tips: "Tailor statements for different specialties if applicable"
      }
    ]
  },
  {
    month: "July - August",
    year: "Application Year",
    phase: "Finalization",
    color: "bg-orange-500",
    tasks: [
      {
        title: "Complete ERAS Application",
        description: "Finalize all sections of your application",
        icon: CheckCircle,
        priority: "high",
        tips: "Review multiple times for errors"
      },
      {
        title: "Request Transcript",
        description: "Order medical school transcript through ERAS",
        icon: GraduationCap,
        priority: "high",
        tips: "Allow 2 weeks for processing"
      },
      {
        title: "MSPE Release",
        description: "Medical School Performance Evaluation available",
        icon: FileText,
        priority: "medium",
        tips: "Review for accuracy when available"
      },
      {
        title: "Finalize Program List",
        description: "Determine final list of programs to apply to",
        icon: Target,
        priority: "high",
        tips: "Apply broadly but strategically"
      }
    ]
  },
  {
    month: "September",
    year: "Application Year",
    phase: "Submission",
    color: "bg-red-500",
    tasks: [
      {
        title: "Submit ERAS Application",
        description: "Applications can be submitted starting September 28",
        icon: CheckCircle,
        priority: "high",
        tips: "Submit on opening day for best consideration"
      },
      {
        title: "Programs Receive Applications",
        description: "Residency programs begin reviewing",
        icon: Stethoscope,
        priority: "high",
        tips: "Programs receive applications September 28"
      },
      {
        title: "Send Program Signals",
        description: "Submit program signals if applicable",
        icon: Target,
        priority: "high",
        tips: "Use signals strategically for reach programs"
      }
    ]
  },
  {
    month: "October - January",
    year: "Interview Season",
    phase: "Interviews",
    color: "bg-indigo-500",
    tasks: [
      {
        title: "Interview Invitations",
        description: "Respond promptly to interview invitations",
        icon: Mail,
        priority: "high",
        tips: "Most invites come in October-November"
      },
      {
        title: "Interview Preparation",
        description: "Practice common questions and scenarios",
        icon: Video,
        priority: "high",
        tips: "Prepare for both virtual and in-person formats"
      },
      {
        title: "Thank You Notes",
        description: "Send thank you emails within 24-48 hours",
        icon: Mail,
        priority: "medium",
        tips: "Personalize each note"
      },
      {
        title: "Second Look Events",
        description: "Attend second look events if invited",
        icon: Users,
        priority: "low",
        tips: "Good opportunity to evaluate programs"
      }
    ]
  },
  {
    month: "February",
    year: "Match Year",
    phase: "Rank List",
    color: "bg-pink-500",
    tasks: [
      {
        title: "Rank Order List Deadline",
        description: "Submit final rank list by late February",
        icon: Trophy,
        priority: "high",
        tips: "Rank based on true preferences"
      },
      {
        title: "SOAP Eligibility",
        description: "Verify SOAP eligibility if needed",
        icon: AlertCircle,
        priority: "medium",
        tips: "Hope for the best, prepare for contingencies"
      }
    ]
  },
  {
    month: "March",
    year: "Match Year",
    phase: "Match Week",
    color: "bg-green-600",
    tasks: [
      {
        title: "Monday - Match Status",
        description: "Learn if you matched (not where)",
        icon: Info,
        priority: "high",
        tips: "11 AM ET announcement"
      },
      {
        title: "Monday-Thursday - SOAP",
        description: "Supplemental Offer and Acceptance Program if unmatched",
        icon: AlertCircle,
        priority: "high",
        tips: "Be prepared to act quickly"
      },
      {
        title: "Friday - Match Day",
        description: "Learn where you matched!",
        icon: Trophy,
        priority: "high",
        tips: "Celebrate your achievement!"
      }
    ]
  }
];

export default function TimelinePage() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              ERAS Timeline
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your comprehensive month-by-month guide to the residency application process. 
              Stay on track with key deadlines and milestones.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">15+</div>
              <div className="text-sm text-gray-600">Months Total</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">Sept 28</div>
              <div className="text-sm text-gray-600">ERAS Submission</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">March</div>
              <div className="text-sm text-gray-600">Match Day</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">June</div>
              <div className="text-sm text-gray-600">ERAS Opens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {timelineData.map((phase, phaseIndex) => (
            <Card 
              key={phaseIndex}
              className={`border-0 shadow-sm overflow-hidden rounded-2xl transition-all duration-300 ${
                expandedPhase === phaseIndex ? 'shadow-xl' : ''
              }`}
            >
              <button
                onClick={() => setExpandedPhase(expandedPhase === phaseIndex ? null : phaseIndex)}
                className="w-full"
              >
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-1 h-12 ${phase.color} rounded-full`} />
                      <div className="text-left">
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {phase.month}
                        </CardTitle>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-500">{phase.year}</span>
                          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                            {phase.phase}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight 
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedPhase === phaseIndex ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </CardHeader>
              </button>
              
              {expandedPhase === phaseIndex && (
                <CardContent className="pt-0 pb-6">
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {phase.tasks.map((task, taskIndex) => (
                      <div 
                        key={taskIndex}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            task.priority === 'high' ? 'bg-red-100' : 
                            task.priority === 'medium' ? 'bg-yellow-100' : 
                            'bg-green-100'
                          }`}>
                            <task.icon className={`h-5 w-5 ${
                              task.priority === 'high' ? 'text-red-600' : 
                              task.priority === 'medium' ? 'text-yellow-600' : 
                              'text-green-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {task.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {task.description}
                            </p>
                            {task.tips && (
                              <div className="flex items-start space-x-2">
                                <Info className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-gray-500 italic">
                                  {task.tips}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Key Dates Summary */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Critical Dates to Remember</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">June 5</h3>
                <p className="text-sm text-gray-600">ERAS application opens for applicants</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">September 28</h3>
                <p className="text-sm text-gray-600">ERAS applications transmitted to programs</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <Trophy className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">March (3rd Friday)</h3>
                <p className="text-sm text-gray-600">Match Day - Results announced</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Stay on Track with Expert Guidance
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Get personalized timeline reminders and application support
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/signup">
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Get Started
              </button>
            </Link>
            <Link href="/guides">
              <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-medium border border-gray-200 transition-colors">
                View Guides
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}