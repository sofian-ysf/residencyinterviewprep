"use client";

import { useState } from "react";
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
  CheckCircle
} from "lucide-react";

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<number | null>(null);

  // Mock data - would come from API/database
  // Set to empty array to show empty state
  const reviews: any[] = [];

  const selectedReviewData = selectedReview 
    ? reviews.find(r => r.id === selectedReview)
    : null;

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4">
      <div className="mb-4 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Reviews</h1>
        <p className="text-black mt-2 text-sm sm:text-base">Feedback from expert physicians on your applications</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Total Reviews</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-black">{reviews.length}</div>
            <p className="text-[10px] sm:text-xs text-black">Completed reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Average Rating</CardTitle>
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-black">N/A</div>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-2 w-2 sm:h-3 sm:w-3 text-gray-300"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Improvements Made</CardTitle>
            <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-black">0</div>
            <p className="text-[10px] sm:text-xs text-black">Actionable items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Response Time</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-black">N/A</div>
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
              {reviews.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-black text-sm sm:text-base">No reviews yet</p>
                  <p className="text-xs sm:text-sm text-black mt-2">Submit an application to get started</p>
                </div>
              ) : reviews.map((review) => (
                <div
                  key={review.id}
                  onClick={() => setSelectedReview(review.id)}
                  className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedReview === review.id 
                      ? "border-black bg-gray-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-black text-sm sm:text-base">{review.applicationPackage}</p>
                      <p className="text-xs sm:text-sm text-black">{review.reviewer}</p>
                    </div>
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs text-black">
                      {review.completedDate}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Review Details */}
        <div className="lg:col-span-2">
          {selectedReviewData ? (
            <Card>
              <CardHeader className="p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between space-y-3 sm:space-y-0">
                  <div>
                    <CardTitle className="text-base sm:text-lg text-black">{selectedReviewData.applicationPackage} Review</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Reviewed by {selectedReviewData.reviewer} • {selectedReviewData.completedDate}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    <span className="text-xs sm:text-sm">Download PDF</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
                {/* Reviewer Info */}
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                    <p className="font-medium text-black text-sm sm:text-base">About Your Reviewer</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-black font-medium text-xs sm:text-sm">Name</p>
                      <p className="text-black text-xs sm:text-sm">{selectedReviewData.reviewer}</p>
                    </div>
                    <div>
                      <p className="text-black font-medium text-xs sm:text-sm">Specialty</p>
                      <p className="text-black text-xs sm:text-sm">{selectedReviewData.reviewerSpecialty}</p>
                    </div>
                    <div>
                      <p className="text-black font-medium text-xs sm:text-sm">Institution</p>
                      <p className="text-black text-xs sm:text-sm">{selectedReviewData.reviewerInstitution}</p>
                    </div>
                    <div>
                      <p className="text-black font-medium text-xs sm:text-sm">Documents Reviewed</p>
                      <p className="text-black text-xs sm:text-sm">{selectedReviewData.documents.length} items</p>
                    </div>
                  </div>
                </div>

                {/* Overall Feedback */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                    <p className="font-medium text-black text-sm sm:text-base">Overall Feedback</p>
                  </div>
                  <p className="text-black text-xs sm:text-sm">{selectedReviewData.overallFeedback}</p>
                </div>

                {/* Strengths */}
                <div>
                  <p className="font-medium text-black mb-3 text-sm sm:text-base">Strengths</p>
                  <ul className="space-y-2">
                    {selectedReviewData.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-black text-xs sm:text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div>
                  <p className="font-medium text-black mb-3 text-sm sm:text-base">Areas for Improvement</p>
                  <ul className="space-y-2">
                    {selectedReviewData.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-white text-[10px] sm:text-xs">!</span>
                        </div>
                        <span className="text-black text-xs sm:text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rating */}
                <div className="pt-3 sm:pt-4 border-t">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                    <p className="font-medium text-black text-sm sm:text-base">Application Rating</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${
                              i < selectedReviewData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-black font-medium text-sm sm:text-base">{selectedReviewData.rating}/5</span>
                    </div>
                  </div>
                </div>
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