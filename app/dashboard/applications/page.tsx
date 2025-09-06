"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Eye,
  Download,
  Plus,
  ChevronDown
} from "lucide-react";

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data - would come from API/database
  // Set to empty array to show empty state
  const applications: any[] = [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />;
      case "in_review":
        return <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-black" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_review":
        return "In Review";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "in_review":
        return "text-yellow-600 bg-yellow-50";
      case "draft":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  const filterOptions = [
    { value: "all", label: "All", count: applications.length },
    { value: "draft", label: "Drafts", count: applications.filter(a => a.status === "draft").length },
    { value: "in_review", label: "In Review", count: applications.filter(a => a.status === "in_review").length },
    { value: "completed", label: "Completed", count: applications.filter(a => a.status === "completed").length },
  ];

  const currentFilter = filterOptions.find(f => f.value === filter);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">My Applications</h1>
            <p className="text-sm sm:text-base text-black mt-1 sm:mt-2">Manage and track all your ERAS application reviews</p>
          </div>
          <Link href="/dashboard/new" className="w-full sm:w-auto">
            <Button className="bg-black hover:bg-gray-800 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Application
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs - Desktop */}
      <div className="hidden sm:flex space-x-2 md:space-x-4 mb-6 overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${
              filter === option.value 
                ? "bg-black text-white" 
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </div>

      {/* Filter Dropdown - Mobile */}
      <div className="sm:hidden mb-6">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium"
        >
          <span>{currentFilter?.label} ({currentFilter?.count})</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>
        {isFilterOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFilter(option.value);
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  filter === option.value ? 'bg-gray-50 font-semibold' : ''
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Applications Grid */}
      <div className="grid gap-4 sm:gap-6">
        {filteredApplications.map((app) => (
          <Card key={app.id}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-3">
                    {getStatusIcon(app.status)}
                    <h3 className="text-base sm:text-lg font-semibold text-black">{app.package}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                    <div>
                      <p className="text-xs sm:text-sm text-black font-medium">Submitted</p>
                      <p className="text-xs sm:text-sm text-black flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {app.submittedAt}
                      </p>
                    </div>
                    {app.reviewer && (
                      <div>
                        <p className="text-xs sm:text-sm text-black font-medium">Reviewer</p>
                        <p className="text-xs sm:text-sm text-black mt-1">{app.reviewer}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs sm:text-sm text-black font-medium">Documents</p>
                      <p className="text-xs sm:text-sm text-black flex items-center mt-1">
                        <FileText className="h-3 w-3 mr-1" />
                        {app.documents} files
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-black font-medium">Last Updated</p>
                      <p className="text-xs sm:text-sm text-black mt-1">{app.lastUpdated}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-0 sm:mb-4">
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-black font-medium">Progress</span>
                      <span className="text-black">{app.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          app.progress === 100 ? 'bg-green-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${app.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions - Mobile optimized */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                  <Link href={`/dashboard/applications/${app.id}`} className="flex-1 sm:flex-none">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  {app.status === "completed" && (
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none sm:w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="text-center py-8 sm:py-12">
            <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-black mb-2">No applications found</h3>
            <p className="text-sm sm:text-base text-black mb-4">
              {filter === "all" 
                ? "Start your first application to get expert feedback"
                : `You don't have any ${filter.replace("_", " ")} applications`}
            </p>
            <Link href="/dashboard/new">
              <Button className="bg-black hover:bg-gray-800">
                <Plus className="h-4 w-4 mr-2" />
                Start New Application
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}