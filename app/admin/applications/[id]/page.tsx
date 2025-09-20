"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  FileText,
  Download,
  Upload,
  User,
  Calendar,
  Package,
  School,
  ChevronLeft,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  PenTool,
  Briefcase,
  Edit,
  Save,
  X
} from "lucide-react";
import Link from "next/link";

export default function AdminApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPS, setEditedPS] = useState('');
  const [editedExperiences, setEditedExperiences] = useState<any[]>([]);
  const [editSummary, setEditSummary] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/admin/applications/${applicationId}`);
        if (response.ok) {
          const data = await response.json();
          setApplication(data);
          setEditedPS(data.personalStatement || '');
          setEditedExperiences(data.experiences || []);
        } else {
          console.error('Failed to fetch application');
          router.push('/admin/applications');
        }
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId, router]);

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('documentType', selectedDocument?.fileType || 'OTHER');

    try {
      const response = await fetch(`/api/admin/applications/${applicationId}/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setUploadSuccess(true);
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadSuccess(false);
          // Refresh application data
          window.location.reload();
        }, 2000);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setApplication((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSaveEdits = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalStatement: editedPS,
          experiences: editedExperiences,
          editSummary
        })
      });

      if (response.ok) {
        setApplication((prev: any) => ({
          ...prev,
          personalStatement: editedPS,
          experiences: editedExperiences
        }));
        setIsEditing(false);
        // Show success message
        alert('Changes saved successfully!');
      } else {
        alert('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving edits:', error);
      alert('Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handleExperienceEdit = (expId: string, field: string, value: string) => {
    setEditedExperiences(prev =>
      prev.map(exp =>
        exp.id === expId ? { ...exp, [field]: value } : exp
      )
    );
  };

  const downloadDocument = async (doc: any) => {
    try {
      const response = await fetch(`/api/download?applicationId=${applicationId}&documentId=${doc.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = doc.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-8 text-gray-400">
        Application not found
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusStyles: { [key: string]: { bg: string, text: string, icon: any } } = {
      'DRAFT': { bg: 'bg-gray-600', text: 'text-gray-200', icon: FileText },
      'IN_REVIEW': { bg: 'bg-yellow-600', text: 'text-yellow-100', icon: Clock },
      'SUBMITTED': { bg: 'bg-blue-600', text: 'text-blue-100', icon: Upload },
      'REVIEWED': { bg: 'bg-purple-600', text: 'text-purple-100', icon: Eye },
      'COMPLETED': { bg: 'bg-green-600', text: 'text-green-100', icon: CheckCircle }
    };

    const style = statusStyles[status] || statusStyles['DRAFT'];
    const Icon = style.icon;

    return (
      <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${style.bg} ${style.text}`}>
        <Icon className="h-4 w-4" />
        {status.replace('_', ' ')}
      </div>
    );
  };

  const getExperienceIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      'CLINICAL': Briefcase,
      'RESEARCH': PenTool,
      'VOLUNTEER': User,
      'LEADERSHIP': User,
      'TEACHING': School,
      'WORK': Briefcase,
      'OTHER': FileText
    };
    return icons[type] || FileText;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/applications"
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Application Review</h1>
            <p className="text-gray-400 mt-1">ID: {applicationId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(application.status)}
          {!isEditing && (application.status === 'IN_REVIEW' || application.status === 'SUBMITTED') && (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Content
              </Button>
              <Button
                onClick={() => handleStatusUpdate('REVIEWED')}
                className="bg-green-600 hover:bg-green-700"
              >
                Mark as Reviewed
              </Button>
            </>
          )}
          {isEditing && (
            <>
              <Button
                onClick={handleSaveEdits}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-1" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setEditedPS(application.personalStatement || '');
                  setEditedExperiences(application.experiences || []);
                  setEditSummary('');
                }}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* User Information */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Applicant Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white font-medium">{application.user.name || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">{application.user.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Medical School</p>
              <p className="text-white font-medium">{application.user.medicalSchool || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Graduation Year</p>
              <p className="text-white font-medium">{application.user.graduationYear || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Specialty</p>
              <p className="text-white font-medium">{application.user.specialty || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Package</p>
              <p className="text-white font-medium">
                <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-sm">
                  {application.packageType}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Summary (shown when editing) */}
      {isEditing && (
        <Card className="bg-yellow-900/20 border-yellow-600">
          <div className="p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">Edit Summary</h2>
            <textarea
              value={editSummary}
              onChange={(e) => setEditSummary(e.target.value)}
              placeholder="Please provide a summary of the changes you are making..."
              className="w-full h-32 px-4 py-3 bg-gray-900 border border-yellow-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <p className="text-yellow-400 text-sm mt-2">
              This summary will be saved with the review for future reference
            </p>
          </div>
        </Card>
      )}

      {/* Personal Statement */}
      {(application.personalStatement || isEditing) && (
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Personal Statement</h2>
            {isEditing ? (
              <>
                <textarea
                  value={editedPS}
                  onChange={(e) => setEditedPS(e.target.value)}
                  className="w-full min-h-[400px] px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter personal statement..."
                />
                <div className="flex gap-4 mt-4 text-sm">
                  <span className="text-gray-400">
                    Word Count: <span className="text-white font-medium">{editedPS.split(/\s+/).filter(w => w.length > 0).length}</span>
                  </span>
                  <span className="text-gray-400">
                    Character Count: <span className="text-white font-medium">{editedPS.length}</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <p className="text-gray-300 whitespace-pre-wrap">{application.personalStatement}</p>
                </div>
                <div className="flex gap-4 mt-4 text-sm">
                  <span className="text-gray-400">
                    Word Count: <span className="text-white font-medium">{application.psWordCount || 0}</span>
                  </span>
                  <span className="text-gray-400">
                    Character Count: <span className="text-white font-medium">{application.psCharCount || 0}</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>
      )}

      {/* Documents */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Documents</h2>
          </div>

          {application.documents && application.documents.length > 0 ? (
            <div className="space-y-3">
              {application.documents.map((doc: any) => (
                <div key={doc.id} className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">{doc.fileName}</p>
                      <p className="text-gray-400 text-sm">
                        Type: {doc.fileType} | Version: {doc.version}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => downloadDocument(doc)}
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {(application.status === 'IN_REVIEW' || application.status === 'SUBMITTED') && (
                      <Button
                        onClick={() => {
                          setSelectedDocument(doc);
                          setShowUploadModal(true);
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:text-green-300 hover:bg-gray-700"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Edited
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No documents uploaded
            </div>
          )}
        </div>
      </Card>

      {/* Experiences */}
      {(application.experiences && application.experiences.length > 0) || isEditing ? (
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Experiences</h2>
            <div className="space-y-4">
              {(isEditing ? editedExperiences : application.experiences).map((exp: any) => {
                const Icon = getExperienceIcon(exp.experienceType);
                return (
                  <div key={exp.id} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-gray-400 mt-1" />
                      <div className="flex-1">
                        {isEditing ? (
                          <>
                            <div className="space-y-3">
                              <div>
                                <label className="text-gray-400 text-xs">Title</label>
                                <input
                                  type="text"
                                  value={exp.title}
                                  onChange={(e) => handleExperienceEdit(exp.id, 'title', e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="text-gray-400 text-xs">Organization</label>
                                <input
                                  type="text"
                                  value={exp.organization}
                                  onChange={(e) => handleExperienceEdit(exp.id, 'organization', e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="text-gray-400 text-xs">Description</label>
                                <textarea
                                  value={exp.description}
                                  onChange={(e) => handleExperienceEdit(exp.id, 'description', e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                />
                                <p className="text-gray-500 text-xs mt-1">
                                  Character count: {exp.description?.length || 0} / 750
                                </p>
                              </div>
                              {exp.isMostMeaningful && (
                                <div>
                                  <label className="text-yellow-400 text-xs">Why Meaningful</label>
                                  <textarea
                                    value={exp.meaningfulDescription || ''}
                                    onChange={(e) => handleExperienceEdit(exp.id, 'meaningfulDescription', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-800 border border-yellow-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[80px]"
                                  />
                                  <p className="text-gray-500 text-xs mt-1">
                                    Character count: {exp.meaningfulDescription?.length || 0} / 300
                                  </p>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-white font-medium">{exp.title}</h3>
                              {exp.isMostMeaningful && (
                                <span className="px-2 py-0.5 bg-yellow-900 text-yellow-300 rounded text-xs">
                                  Most Meaningful
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{exp.organization}</p>
                            <p className="text-gray-500 text-xs mt-1">
                              {new Date(exp.startDate).toLocaleDateString()} -
                              {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                            </p>
                            {exp.description && (
                              <p className="text-gray-300 mt-2 text-sm">{exp.description}</p>
                            )}
                            {exp.meaningfulDescription && (
                              <div className="mt-2 p-2 bg-gray-800 rounded">
                                <p className="text-yellow-400 text-xs font-medium mb-1">Why Meaningful:</p>
                                <p className="text-gray-300 text-sm">{exp.meaningfulDescription}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      ) : null}

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => !uploading && setShowUploadModal(false)}
        title="Upload Edited Files"
        type="info"
      >
        {uploadSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-green-600 font-medium">Files uploaded successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Edited Document
              </label>
              <input
                type="file"
                name="editedFile"
                accept=".pdf,.doc,.docx"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Upload the edited version of the document</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Explanation Document (Optional)
              </label>
              <input
                type="file"
                name="explanationFile"
                accept=".pdf,.doc,.docx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Upload a document explaining the edits made</p>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUploadModal(false)}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}