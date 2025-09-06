"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Star
} from "lucide-react";

export default function Dashboard() {
  // Mock data - would come from API/database
  // Set to 0 to show empty state
  const stats = {
    totalApplications: 0,
    inReview: 0,
    completed: 0,
    avgTurnaround: "N/A",
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in_review":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-black" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_review":
        return "In Review";
      default:
        return "Draft";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-sm sm:text-base text-black mt-2">Welcome back! Here's an overview of your applications.</p>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Total Applications</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-black">{stats.totalApplications}</div>
            <p className="text-xs text-black mt-1">All time</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">In Review</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-black">{stats.inReview}</div>
            <p className="text-xs text-black mt-1">Being reviewed</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Completed</CardTitle>
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-black">{stats.completed}</div>
            <p className="text-xs text-black mt-1">Ready</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Avg. Time</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-black">{stats.avgTurnaround}</div>
            <p className="text-xs text-black mt-1">Turnaround</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Mobile Optimized */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg text-black">Quick Actions</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Get started with your ERAS application review</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/dashboard/new" className="col-span-1">
              <Button className="w-full" size="default">
                <FileText className="h-4 w-4 mr-2" />
                <span className="text-xs sm:text-sm">New Application</span>
              </Button>
            </Link>
            <Link href="/dashboard/applications" className="col-span-1">
              <Button variant="outline" className="w-full" size="default">
                <span className="text-xs sm:text-sm">View Applications</span>
              </Button>
            </Link>
            <Link href="/dashboard/billing" className="col-span-1">
              <Button variant="outline" className="w-full" size="default">
                <span className="text-xs sm:text-sm">Upgrade Package</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}