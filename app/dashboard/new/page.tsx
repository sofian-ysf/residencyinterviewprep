"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PaymentModal from "@/components/payment/PaymentModal";
import ExperienceModal from "@/components/ExperienceModal";
import {
  Check,
  Upload,
  FileText,
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  FileUp,
  Save,
  Edit,
  Trash2
} from "lucide-react";

export default function NewApplicationPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasActivePayment, setHasActivePayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({
    personalStatement: null,
    cv: null
  });
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [personalStatement, setPersonalStatement] = useState('');
  const [experiences, setExperiences] = useState<any[]>([]);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [additionalDocuments, setAdditionalDocuments] = useState<any[]>([]);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  const checkPaymentStatus = async () => {
    try {
      const res = await fetch('/api/test/simulate-payment');
      const data = await res.json();

      if (data.hasActivePayment) {
        setHasActivePayment(true);
        // Get the latest application
        if (data.applications && data.applications.length > 0) {
          setApplicationData(data.applications[0]);
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, documentType: string) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading({ ...uploading, [documentType]: true });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);
      if (applicationData?.id) {
        formData.append('applicationId', applicationData.id);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setUploadedFiles({ ...uploadedFiles, [documentType]: file });
        alert(`${documentType === 'cv' ? 'CV' : 'Personal Statement'} uploaded successfully!`);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setUploading({ ...uploading, [documentType]: false });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, documentType);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, documentType: string) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file, documentType);
    }
  };

  const handleAddExperience = () => {
    setEditingExperience(null);
    setShowExperienceModal(true);
  };

  const handleEditExperience = (experience: any) => {
    setEditingExperience(experience);
    setShowExperienceModal(true);
  };

  const handleSaveExperience = (experience: any) => {
    if (editingExperience) {
      // Update existing experience
      setExperiences(experiences.map(exp =>
        exp.id === experience.id ? experience : exp
      ));
    } else {
      // Add new experience
      setExperiences([...experiences, experience]);
    }
    setShowExperienceModal(false);
    setEditingExperience(null);
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleAdditionalDocumentUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, Word document, or image file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    const docId = `doc_${Date.now()}`;
    setUploading({ ...uploading, [docId]: true });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', 'other');
      if (applicationData?.id) {
        formData.append('applicationId', applicationData.id);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        const newDoc = {
          id: docId,
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString()
        };
        setAdditionalDocuments([...additionalDocuments, newDoc]);
        alert('Document uploaded successfully!');
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload document');
    } finally {
      setUploading({ ...uploading, [docId]: false });
    }
  };

  const handleAdditionalDocumentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAdditionalDocumentUpload(file);
    }
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setAdditionalDocuments(additionalDocuments.filter(doc => doc.id !== id));
    }
  };

  const handleSaveDraft = async () => {
    setSavingDraft(true);
    try {
      const response = await fetch('/api/applications/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationId: currentDraftId,
          packageType: selectedPackage || 'BASIC',
          personalInfo: {
            // You might want to add form fields for these
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
          },
          personalStatement: {
            content: personalStatement,
            charCount: personalStatement.length,
          },
          experiences: experiences,
          documents: additionalDocuments,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentDraftId(data.applicationId);
        alert('Draft saved successfully!');
      } else {
        alert('Failed to save draft: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft');
    } finally {
      setSavingDraft(false);
    }
  };

  const handleSubmitForReview = async () => {
    // First save as draft to ensure we have an applicationId
    if (!currentDraftId) {
      setSavingDraft(true);
      try {
        const draftResponse = await fetch('/api/applications/draft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            packageType: selectedPackage || 'BASIC',
            personalInfo: {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
            },
            personalStatement: {
              content: personalStatement,
              charCount: personalStatement.length,
            },
            experiences: experiences,
            documents: additionalDocuments,
          }),
        });

        const draftData = await draftResponse.json();
        if (draftResponse.ok) {
          setCurrentDraftId(draftData.applicationId);
          // Now submit the saved draft
          await submitApplication(draftData.applicationId);
        } else {
          alert('Failed to save application: ' + draftData.error);
          setSavingDraft(false);
          return;
        }
      } catch (error) {
        console.error('Error saving draft:', error);
        alert('Failed to save application');
        setSavingDraft(false);
        return;
      }
    } else {
      // Application already has an ID, just submit it
      await submitApplication(currentDraftId);
    }
  };

  const submitApplication = async (appId: string) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationId: appId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Application submitted for review successfully!');
        // Redirect to applications page
        router.push('/dashboard/applications');
      } else {
        alert('Failed to submit application: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    } finally {
      setSubmitting(false);
      setSavingDraft(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const packages = [
    {
      id: "essential",
      name: "Essential Review",
      price: 149,
      turnaround: "72 hours",
      features: [
        "Personal Statement Review",
        "Grammar and spelling check",
        "Basic formatting review",
        "General feedback",
        "One round of revisions"
      ],
      popular: false
    },
    {
      id: "comprehensive",
      name: "Comprehensive Edit",
      price: 299,
      turnaround: "48 hours",
      features: [
        "Everything in Essential",
        "CV/Resume review",
        "3 Experience descriptions",
        "Program-specific tailoring",
        "Two rounds of revisions",
        "Priority support"
      ],
      popular: true
    },
    {
      id: "premium",
      name: "Premium Package",
      price: 499,
      turnaround: "24 hours",
      features: [
        "Everything in Comprehensive",
        "All experience descriptions",
        "Letter of recommendation review",
        "Mock interview questions",
        "Three rounds of revisions",
        "Direct reviewer communication",
        "Application strategy session"
      ],
      popular: false
    },
    {
      id: "complete",
      name: "Complete Package",
      price: 799,
      turnaround: "24 hours",
      features: [
        "Everything in Premium",
        "Unlimited experience descriptions",
        "All documents review",
        "School list optimization",
        "Unlimited revisions for 30 days",
        "1-on-1 video consultation",
        "Post-match support"
      ],
      popular: false
    }
  ];

  const handleContinue = () => {
    if (selectedPackage) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Redirect to applications page after successful payment
    router.push("/dashboard/applications?payment=success");
  };

  const getSelectedPackage = () => {
    const pkg = packages.find(p => p.id === selectedPackage);
    return pkg ? { id: pkg.id, name: pkg.name, price: pkg.price } : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // If user has active payment, show application upload form
  if (hasActivePayment) {
    return (
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Upload Your Application</h1>
          <p className="text-black mt-2 text-sm sm:text-base">
            {applicationData ?
              `Package: ${applicationData.packageType.charAt(0) + applicationData.packageType.slice(1).toLowerCase()} • Status: ${applicationData.status}` :
              'Upload your documents for review'}
          </p>
        </div>

        {/* Personal Statement Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <FileText className="h-5 w-5" />
              Personal Statement
            </CardTitle>
            <CardDescription className="text-gray-700">
              Upload or paste your ERAS personal statement (5,300 character limit)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="personal-statement" className="text-black font-medium">Personal Statement Text</Label>
              <Textarea
                id="personal-statement"
                placeholder="Paste your personal statement here..."
                className="min-h-[300px] mt-2 text-black placeholder-gray-500"
              />
              <p className="text-sm text-gray-600 mt-2">0 / 5,300 characters</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="file"
                  id="ps-upload"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => handleFileSelect(e, 'personal-statement')}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => document.getElementById('ps-upload')?.click()}
                  disabled={uploading['personal-statement']}
                >
                  <Upload className="h-4 w-4" />
                  {uploading['personal-statement'] ? 'Uploading...' : 'Upload Document'}
                </Button>
              </div>
              <span className="text-sm text-gray-500">or paste text above</span>
              {uploadedFiles.personalStatement && (
                <span className="text-sm text-green-600 font-medium">
                  ✓ {uploadedFiles.personalStatement.name}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CV/Resume Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <FileText className="h-5 w-5" />
              CV/Resume
            </CardTitle>
            <CardDescription className="text-gray-700">
              Upload your curriculum vitae
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'cv')}>
              {uploadedFiles.cv ? (
                <div>
                  <Check className="h-10 w-10 text-green-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-700 mb-3 font-medium">
                    File uploaded: {uploadedFiles.cv.name}
                  </p>
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileSelect(e, 'cv')}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    className="text-black"
                    onClick={() => document.getElementById('cv-upload')?.click()}
                    disabled={uploading['cv']}
                  >
                    {uploading['cv'] ? 'Uploading...' : 'Replace File'}
                  </Button>
                </div>
              ) : (
                <>
                  <FileUp className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-700 mb-3">
                    Drag and drop your CV here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Accepted formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileSelect(e, 'cv')}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    className="text-black"
                    onClick={() => document.getElementById('cv-upload')?.click()}
                    disabled={uploading['cv']}
                  >
                    {uploading['cv'] ? 'Uploading...' : 'Choose File'}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Experience Descriptions Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <FileText className="h-5 w-5" />
              Experience Descriptions
            </CardTitle>
            <CardDescription className="text-gray-700">
              Add your meaningful experiences (750 characters each)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* List of experiences */}
            {experiences.length > 0 && (
              <div className="space-y-3 mb-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-black">{exp.title}</h4>
                        <p className="text-sm text-gray-600">{exp.organization}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {exp.startDate} - {exp.ongoing ? 'Present' : exp.endDate}
                        </p>
                        {exp.isMostMeaningful && (
                          <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Most Meaningful
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditExperience(exp)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <Button
              variant="outline"
              className="w-full text-black"
              onClick={handleAddExperience}
            >
              + Add Experience Description
            </Button>

            {experiences.length > 0 && (
              <p className="text-sm text-gray-600 text-center">
                {experiences.length} experience{experiences.length !== 1 ? 's' : ''} added
                {experiences.filter(e => e.isMostMeaningful).length > 0 &&
                  ` (${experiences.filter(e => e.isMostMeaningful).length} most meaningful)`}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Additional Documents Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <FileText className="h-5 w-5" />
              Additional Documents
            </CardTitle>
            <CardDescription className="text-gray-700">
              Upload any additional documents (optional) - Transcripts, Letters of Recommendation, etc.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* List of uploaded documents */}
            {additionalDocuments.length > 0 && (
              <div className="space-y-2 mb-4">
                {additionalDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-black text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload transcripts, letters, or other supporting documents
              </p>
              <p className="text-xs text-gray-500 mb-3">
                PDF, DOC, DOCX, JPG, PNG (Max 10MB)
              </p>
              <input
                type="file"
                id="additional-doc-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleAdditionalDocumentSelect}
                className="hidden"
                disabled={Object.values(uploading).some(v => v)}
              />
              <Button
                variant="outline"
                className="text-black"
                onClick={() => document.getElementById('additional-doc-upload')?.click()}
                disabled={Object.values(uploading).some(v => v)}
              >
                {Object.values(uploading).some(v => v) ? 'Uploading...' : '+ Add Document'}
              </Button>
            </div>

            {additionalDocuments.length > 0 && (
              <p className="text-sm text-gray-600 text-center">
                {additionalDocuments.length} document{additionalDocuments.length !== 1 ? 's' : ''} uploaded
              </p>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleSaveDraft}
            disabled={savingDraft}
          >
            <Save className="h-4 w-4" />
            {savingDraft ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            className="bg-black hover:bg-gray-800 flex items-center gap-2"
            onClick={handleSubmitForReview}
            disabled={submitting || savingDraft}
          >
            {submitting ? 'Submitting...' : 'Submit for Review'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Test Payment Button for Development */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 mb-2">
            <strong>Development Mode:</strong> This is the application upload interface that users see after payment.
          </p>
        </div>

        {/* Experience Modal */}
        <ExperienceModal
          isOpen={showExperienceModal}
          onClose={() => {
            setShowExperienceModal(false);
            setEditingExperience(null);
          }}
          onSave={handleSaveExperience}
          editingExperience={editingExperience}
        />
      </div>
    );
  }

  // Original package selection UI for users without payment
  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4">
      <div className="mb-4 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Start New Application</h1>
        <p className="text-black mt-2 text-sm sm:text-base">Choose a package that best fits your needs</p>
      </div>

      {/* Package Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative cursor-pointer transition-all ${
              selectedPackage === pkg.id 
                ? "ring-2 ring-black shadow-lg" 
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <CardHeader className="pb-4 p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-black">{pkg.name}</CardTitle>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-bold text-black">${pkg.price}</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-black mt-2">
                <Clock className="h-4 w-4 mr-1" />
                {pkg.turnaround} turnaround
              </div>
            </CardHeader>
            
            <CardContent className="p-3 sm:p-6 pt-0">
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-xs sm:text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-black">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {selectedPackage === pkg.id && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-black">Selected</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      {selectedPackage && (
        <Card className="mb-4 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg text-black">Next Steps</CardTitle>
            <CardDescription className="text-xs sm:text-sm">What happens after you continue</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center text-xs sm:text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium text-black text-sm sm:text-base">Upload Documents</p>
                  <p className="text-xs sm:text-sm text-black mt-1">
                    Upload your personal statement, CV, and other documents
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center text-xs sm:text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium text-black text-sm sm:text-base">Expert Review</p>
                  <p className="text-xs sm:text-sm text-black mt-1">
                    Our physicians review and provide detailed feedback
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center text-xs sm:text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium text-black text-sm sm:text-base">Get Results</p>
                  <p className="text-xs sm:text-sm text-black mt-1">
                    Receive your reviewed documents within the promised timeframe
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end">
              <Button 
                onClick={handleContinue}
                className="bg-black hover:bg-gray-800 w-full sm:w-auto"
              >
                Proceed to Payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonial */}
      <Card>
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <Star className="h-6 w-6 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-black italic mb-3 text-sm sm:text-base">
                "The comprehensive edit package was exactly what I needed. My reviewer caught things I never would have noticed and helped me tell my story in a compelling way. Matched into my #1 program!"
              </p>
              <p className="text-xs sm:text-sm font-medium text-black">— Sarah M., Internal Medicine</p>
              <p className="text-xs sm:text-sm text-black">Johns Hopkins School of Medicine</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {getSelectedPackage() && (
        <PaymentModal
          planId={getSelectedPackage()!.id}
          planName={getSelectedPackage()!.name}
          amount={getSelectedPackage()!.price}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}