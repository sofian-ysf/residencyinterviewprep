"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Eye,
  Download,
  Plus,
  ChevronDown,
  Edit,
  Trash2,
  Lock,
  Mail
} from "lucide-react";

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    appId: '',
    appStatus: ''
  });
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: ''
  });
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: ''
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [editRequestModal, setEditRequestModal] = useState({
    isOpen: false,
    appId: ''
  });
  const [requestedEdits, setRequestedEdits] = useState<string[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      // Fetch all applications (drafts, in review, completed)
      const response = await fetch('/api/applications/submit');
      if (response.ok) {
        const allApplications = await response.json();
        setApplications(allApplications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplication = async (appId: string, appStatus: string) => {
    // Don't allow deletion of applications in review
    if (appStatus === 'IN_REVIEW' || appStatus === 'SUBMITTED') {
      setErrorModal({
        isOpen: true,
        message: 'Cannot delete applications that are currently in review.'
      });
      return;
    }

    // Show confirmation modal
    setDeleteModal({
      isOpen: true,
      appId,
      appStatus
    });
  };

  const handleRequestEdit = (appId: string) => {
    setEditRequestModal({
      isOpen: true,
      appId
    });
  };

  const sendEditRequest = async () => {
    // In a real application, this would send an email or notification to the admin
    // For now, we'll just show a success message and track the request
    const appId = editRequestModal.appId;
    setRequestedEdits(prev => [...prev, appId]);
    setEditRequestModal({ isOpen: false, appId: '' });

    // Store in localStorage to persist the state
    const stored = localStorage.getItem('requestedEdits') || '[]';
    const current = JSON.parse(stored);
    if (!current.includes(appId)) {
      current.push(appId);
      localStorage.setItem('requestedEdits', JSON.stringify(current));
    }

    setSuccessModal({
      isOpen: true,
      message: 'Edit request sent! An administrator will review your request and contact you soon.'
    });
  };

  // Load requested edits from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('requestedEdits');
    if (stored) {
      setRequestedEdits(JSON.parse(stored));
    }
  }, []);

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/applications/${deleteModal.appId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted application from the list
        setApplications(applications.filter(app => app.id !== deleteModal.appId));
        setDeleteModal({ isOpen: false, appId: '', appStatus: '' });
        setSuccessModal({
          isOpen: true,
          message: 'Application deleted successfully'
        });
      } else {
        setDeleteModal({ isOpen: false, appId: '', appStatus: '' });
        setErrorModal({
          isOpen: true,
          message: 'Failed to delete application. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      setDeleteModal({ isOpen: false, appId: '', appStatus: '' });
      setErrorModal({
        isOpen: true,
        message: 'An error occurred while deleting the application.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace('_', '');
    switch (normalizedStatus) {
      case "completed":
        return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />;
      case "inreview":
      case "in_review":
        return <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />;
      case "draft":
        return <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-black" />;
    }
  };

  const getStatusText = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace('_', '');
    switch (normalizedStatus) {
      case "completed":
        return "Completed";
      case "inreview":
      case "in_review":
        return "In Review";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace('_', '');
    switch (normalizedStatus) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "inreview":
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
    if (filter === "draft") return app.status === "DRAFT";
    if (filter === "in_review") return app.status === "IN_REVIEW";
    if (filter === "completed") return app.status === "COMPLETED";
    return false;
  });

  const filterOptions = [
    { value: "all", label: "All", count: applications.length },
    { value: "draft", label: "Drafts", count: applications.filter(a => a.status === "DRAFT").length },
    { value: "in_review", label: "In Review", count: applications.filter(a => a.status === "IN_REVIEW").length },
    { value: "completed", label: "Completed", count: applications.filter(a => a.status === "COMPLETED").length },
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
        {loading ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              <p className="mt-4 text-sm text-gray-600">Loading applications...</p>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((app) => (
            <Card key={app.id}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-3">
                      {getStatusIcon(app.status.toLowerCase())}
                      <h3 className="text-base sm:text-lg font-semibold text-black">
                        {app.packageType || 'Application'}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status.toLowerCase())}`}>
                        {getStatusText(app.status.toLowerCase())}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      <div>
                        <p className="text-xs sm:text-sm text-black font-medium">
                          {app.status === 'IN_REVIEW' ? 'Submitted' : 'Created'}
                        </p>
                        <p className="text-xs sm:text-sm text-black flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(app.updatedAt || app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-black font-medium">Documents</p>
                        <p className="text-xs sm:text-sm text-black flex items-center mt-1">
                          <FileText className="h-3 w-3 mr-1" />
                          {app.documents?.length || 0} files
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-black font-medium">Experiences</p>
                        <p className="text-xs sm:text-sm text-black mt-1">
                          {app.experiences?.length || 0} added
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-black font-medium">Last Updated</p>
                        <p className="text-xs sm:text-sm text-black mt-1">
                          {new Date(app.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar for Drafts */}
                    {app.status === 'DRAFT' && (
                      <div className="mb-0 sm:mb-4">
                        <div className="flex justify-between text-xs sm:text-sm mb-1">
                          <span className="text-black font-medium">Completion</span>
                          <span className="text-black">
                            {Math.round(
                              ((app.personalStatement ? 25 : 0) +
                                (app.experiences?.length > 0 ? 25 : 0) +
                                (app.documents?.length > 0 ? 25 : 0) +
                                (app.firstName ? 25 : 0))
                            )}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-blue-600"
                            style={{
                              width: `${Math.round(
                                ((app.personalStatement ? 25 : 0) +
                                  (app.experiences?.length > 0 ? 25 : 0) +
                                  (app.documents?.length > 0 ? 25 : 0) +
                                  (app.firstName ? 25 : 0))
                              )}%`
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions - Mobile optimized */}
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                    {app.status === 'DRAFT' ? (
                      <Link href={`/dashboard/new?draft=${app.id}`} className="flex-1 sm:flex-none">
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="h-4 w-4 mr-2" />
                          Continue Editing
                        </Button>
                      </Link>
                    ) : app.status === 'IN_REVIEW' || app.status === 'SUBMITTED' ? (
                      <>
                        <Link href={`/dashboard/applications/${app.id}`} className="flex-1 sm:flex-none">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`flex-1 sm:flex-none sm:w-full ${
                            requestedEdits.includes(app.id)
                              ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                              : ''
                          }`}
                          onClick={() => !requestedEdits.includes(app.id) && handleRequestEdit(app.id)}
                          disabled={requestedEdits.includes(app.id)}
                        >
                          {requestedEdits.includes(app.id) ? (
                            <>
                              <Clock className="h-4 w-4 mr-2" />
                              Requested
                            </>
                          ) : (
                            <>
                              <Mail className="h-4 w-4 mr-2" />
                              Request Edit
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <Link href={`/dashboard/applications/${app.id}`} className="flex-1 sm:flex-none">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    )}

                    {app.status === 'COMPLETED' && (
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none sm:w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}

                    {/* Delete button - not for IN_REVIEW applications */}
                    {(app.status === 'DRAFT' || app.status === 'COMPLETED') && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none sm:w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteApplication(app.id, app.status)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => !isDeleting && setDeleteModal({ isOpen: false, appId: '', appStatus: '' })}
        type="confirm"
        title="Delete Application"
        description="Are you sure you want to delete this application? This action cannot be undone and all associated data will be permanently removed."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        loading={isDeleting}
      />

      {/* Success Modal */}
      <Modal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, message: '' })}
        type="success"
        title="Success"
        description={successModal.message}
      />

      {/* Error Modal */}
      <Modal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
        type="error"
        title="Error"
        description={errorModal.message}
      />

      {/* Edit Request Modal */}
      <Modal
        isOpen={editRequestModal.isOpen}
        onClose={() => setEditRequestModal({ isOpen: false, appId: '' })}
        type="confirm"
        title="Request Edit Permission"
        description="Your application is currently being reviewed. Would you like to request permission to make edits? An administrator will review your request and contact you."
        confirmText="Send Request"
        cancelText="Cancel"
        onConfirm={sendEditRequest}
      />
    </div>
  );
}