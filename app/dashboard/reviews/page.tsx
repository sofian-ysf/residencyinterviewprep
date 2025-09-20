"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Star,
  FileText,
  Calendar,
  User,
  Download,
  MessageSquare,
  ThumbsUp,
  Clock,
  CheckCircle,
  Edit,
  Eye,
  Package
} from "lucide-react";

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewDetails, setReviewDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Fetch specific review details when selected
  useEffect(() => {
    if (!selectedReview) {
      setReviewDetails(null);
      return;
    }

    const fetchReviewDetails = async () => {
      setDetailsLoading(true);
      try {
        const response = await fetch(`/api/reviews/${selectedReview}`);
        if (response.ok) {
          const data = await response.json();
          setReviewDetails(data);
        }
      } catch (error) {
        console.error('Error fetching review details:', error);
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchReviewDetails();
  }, [selectedReview]);

  const selectedReviewData = selectedReview
    ? reviews.find(r => r.id === selectedReview)
    : null;

  // Calculate stats
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.review?.rating || 0), 0) / reviews.length
    : 0;

  const avgTurnaround = '24 hours'; // As requested

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4">
      <div className="mb-4 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Reviews</h1>
        <p className="text-black mt-2 text-sm sm:text-base">Feedback from expert physicians on your applications</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Total Reviews</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-black">{loading ? '...' : reviews.length}</div>
            <p className="text-[10px] sm:text-xs text-black">Completed reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Improvements Made</CardTitle>
            <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-black">{reviews.length}</div>
            <p className="text-[10px] sm:text-xs text-black">Actionable items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Response Time</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-black">{avgTurnaround}</div>
            <p className="text-[10px] sm:text-xs text-black">Average turnaround</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-black">Your Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3 sm:p-6 pt-0">
              {loading ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-gray-400 mx-auto mb-4" />
                  <p className="text-black text-sm sm:text-base">Loading reviews...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-black text-sm sm:text-base">No reviews yet</p>
                  <p className="text-xs sm:text-sm text-black mt-2">Your reviewed applications will appear here</p>
                </div>
              ) : reviews.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedReview(app.id)}
                  className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedReview === app.id
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="h-3 w-3 text-gray-600" />
                        <p className="font-medium text-black text-sm sm:text-base">
                          {app.applicationPackage} Package
                        </p>
                      </div>
                      {app.review && (
                        <p className="text-xs sm:text-sm text-gray-600">
                          Reviewed by {app.review.reviewer}
                        </p>
                      )}
                    </div>
                    {app.status === 'REVIEWED' ? (
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {app.review && app.review.rating > 0 && (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < app.review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      {app.review?.editSummary && (
                        <Edit className="h-3 w-3 text-blue-500" title="Has edits" />
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      {app.review?.completedDate || 'In progress'}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Review Details */}
        <div className="lg:col-span-2">
          {detailsLoading ? (
            <Card>
              <CardContent className="text-center py-8 sm:py-12 p-3 sm:p-6">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-gray-400 mx-auto mb-4" />
                <p className="text-black text-sm sm:text-base">Loading review details...</p>
              </CardContent>
            </Card>
          ) : reviewDetails ? (
            <Card>
              <CardHeader className="p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between space-y-3 sm:space-y-0">
                  <div>
                    <CardTitle className="text-base sm:text-lg text-black">
                      {reviewDetails.application.packageType} Package Review
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Status: {reviewDetails.application.status}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowOriginal(!showOriginal)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      <span className="text-xs sm:text-sm">
                        {showOriginal ? 'Show Edited' : 'Show Original'}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
                {/* Edit Summary */}
                {reviewDetails.review?.editSummary && (
                  <div className="p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Edit className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                      <p className="font-medium text-black text-sm sm:text-base">Edit Summary</p>
                    </div>
                    <p className="text-black text-xs sm:text-sm">
                      {reviewDetails.review.editSummary}
                    </p>
                  </div>
                )}

                {/* Reviewer Info */}
                {reviewDetails.review && (
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                      <p className="font-medium text-black text-sm sm:text-base">About Your Reviewer</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-black font-medium text-xs sm:text-sm">Name</p>
                        <p className="text-black text-xs sm:text-sm">
                          {reviewDetails.review.reviewer.name || reviewDetails.review.reviewer.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-black font-medium text-xs sm:text-sm">Role</p>
                        <p className="text-black text-xs sm:text-sm">{reviewDetails.review.reviewer.role}</p>
                      </div>
                      {reviewDetails.review.reviewer.specialty && (
                        <div>
                          <p className="text-black font-medium text-xs sm:text-sm">Specialty</p>
                          <p className="text-black text-xs sm:text-sm">{reviewDetails.review.reviewer.specialty}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-black font-medium text-xs sm:text-sm">Review Date</p>
                        <p className="text-black text-xs sm:text-sm">
                          {new Date(reviewDetails.review.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Personal Statement */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                    <p className="font-medium text-black text-sm sm:text-base">
                      Personal Statement {!showOriginal && '(Edited)'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-black text-xs sm:text-sm whitespace-pre-wrap">
                      {reviewDetails.application.personalStatement || 'No personal statement provided'}
                    </p>
                    <div className="mt-3 flex gap-4 text-xs text-gray-600">
                      <span>Word Count: {reviewDetails.application.psWordCount || 0}</span>
                      <span>Character Count: {reviewDetails.application.psCharCount || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Experiences */}
                {reviewDetails.application.experiences && reviewDetails.application.experiences.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                      <p className="font-medium text-black text-sm sm:text-base">
                        Experiences {!showOriginal && '(Edited)'}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {reviewDetails.application.experiences.map((exp: any) => (
                        <div key={exp.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-black text-sm">{exp.title}</h4>
                              <p className="text-gray-600 text-xs">{exp.organization}</p>
                            </div>
                            {exp.isMostMeaningful && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                Most Meaningful
                              </span>
                            )}
                          </div>
                          <p className="text-black text-xs sm:text-sm mt-2">{exp.description}</p>
                          {exp.meaningfulDescription && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded">
                              <p className="text-xs font-medium text-yellow-800 mb-1">Why Meaningful:</p>
                              <p className="text-black text-xs">{exp.meaningfulDescription}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overall Feedback if provided */}
                {reviewDetails.review?.overallFeedback && !reviewDetails.review?.editSummary && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                      <p className="font-medium text-black text-sm sm:text-base">Reviewer Feedback</p>
                    </div>
                    <p className="text-black text-xs sm:text-sm">{reviewDetails.review.overallFeedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8 sm:py-12 p-3 sm:p-6">
                <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-black mb-2">Select a review to view details</h3>
                <p className="text-black text-xs sm:text-sm">
                  Click on any review from the list to see detailed feedback
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}