"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  Video,
  Package,
  Mail,
  Clock
} from "lucide-react";
import { InterviewRequestModal } from "@/components/InterviewRequestModal";

interface InterviewPackage {
  name: string;
  totalInterviews: number;
  tier: 'essential' | 'professional' | 'elite';
}

interface ScheduledInterview {
  id: string;
  date: string;
  time: string;
  meetLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function Dashboard() {
  const [activePackage, setActivePackage] = useState<InterviewPackage | null>(null);
  const [scheduledInterviews, setScheduledInterviews] = useState<ScheduledInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInterviewData();
  }, []);

  const fetchInterviewData = async () => {
    try {
      // TODO: Implement actual API endpoints for interview data
      // Example endpoints needed:
      // - GET /api/interviews/package - fetch user's interview package
      // - GET /api/interviews/scheduled - fetch scheduled interviews

      // For now, no data will be displayed until API is implemented
      setActivePackage(null);
      setScheduledInterviews([]);
    } catch (error) {
      console.error('Error fetching interview data:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedInterviews = scheduledInterviews.filter(i => i.status === 'completed').length;
  const upcomingInterviews = scheduledInterviews.filter(i => i.status === 'scheduled');
  const remainingInterviews = activePackage ? activePackage.totalInterviews - scheduledInterviews.length : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Interview Practice Dashboard</h1>
        <p className="text-sm sm:text-base text-black mt-2">Manage your mock interview sessions</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Active Package Card */}
          {activePackage && (
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Your Interview Package
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-900 mb-2">{activePackage.name}</p>
                <p className="text-sm text-blue-800">
                  Includes {activePackage.totalInterviews} Full-Length Mock Interviews
                </p>
              </CardContent>
            </Card>
          )}

          {/* Interview Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-black">Total Interviews</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">
                  {activePackage?.totalInterviews || 0}
                </div>
                <p className="text-xs text-gray-600 mt-1">Included in your package</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-black">Scheduled</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{upcomingInterviews.length}</div>
                <p className="text-xs text-gray-600 mt-1">Upcoming sessions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-black">Remaining</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{remainingInterviews}</div>
                <p className="text-xs text-gray-600 mt-1">Available to schedule</p>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Interview CTA or Purchase Prompt */}
          {!activePackage ? (
            <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-lg text-black">Get Started with Interview Prep</CardTitle>
                <CardDescription>Purchase an interview package to begin scheduling your mock interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Choose from our interview preparation packages with 3, 6, or 10 full-length mock interviews.
                  </p>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => window.location.href = '/services/interview-prep'}
                  >
                    <Package className="h-5 w-5 mr-2" />
                    View Interview Packages
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : remainingInterviews > 0 ? (
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-black">Ready to Practice?</CardTitle>
                <CardDescription>Schedule your next mock interview session</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule New Interview
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-lg text-black">All Interviews Used</CardTitle>
                <CardDescription>You've scheduled all interviews in your package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Need more practice? You can purchase additional mock interviews or upgrade your package.
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => window.location.href = '/services/interview-prep'}
                  >
                    <Package className="h-5 w-5 mr-2" />
                    Purchase Additional Interviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Interviews */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-black flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Interviews
              </CardTitle>
              <CardDescription>Your scheduled mock interview sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingInterviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No upcoming interviews scheduled</p>
                  <p className="text-sm mt-1">Click the button above to schedule your first session</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <p className="font-semibold text-black">{formatDate(interview.date)}</p>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{interview.time}</p>
                        {interview.meetLink && (
                          <a
                            href={interview.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700 ml-6 flex items-center gap-1 mt-2"
                          >
                            <Video className="h-3 w-3" />
                            Join Google Meet
                          </a>
                        )}
                      </div>
                      <div className="mt-3 sm:mt-0 flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Google Meet Notice */}
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Video className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <CardTitle className="text-base text-black">Virtual Interview Platform</CardTitle>
                  <CardDescription className="mt-2">
                    All interviews are conducted via Google Meet for your convenience. You'll receive a meeting link before each session.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Support Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <CardTitle className="text-base text-black">Need Help?</CardTitle>
                  <CardDescription className="mt-2">
                    Have questions or need to make changes to your schedule? Our support team is here to help.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:team@myerasediting.com"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Mail className="h-4 w-4" />
                team@myerasediting.com
              </a>
            </CardContent>
          </Card>
        </>
      )}

      {/* Interview Request Modal */}
      <InterviewRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageInfo={
          activePackage
            ? {
                name: activePackage.name,
                totalInterviews: activePackage.totalInterviews,
                remainingInterviews: remainingInterviews,
              }
            : null
        }
      />
    </div>
  );
}