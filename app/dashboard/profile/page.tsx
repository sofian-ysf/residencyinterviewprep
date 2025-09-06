"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User,
  Mail,
  School,
  Calendar,
  Stethoscope,
  Save,
  Camera,
  Shield,
  Bell,
  Globe
} from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "John Doe",
    email: session?.user?.email || "john.doe@example.com",
    medicalSchool: "Harvard Medical School",
    graduationYear: "2025",
    specialty: "Internal Medicine",
    phone: "+1 (555) 123-4567",
    location: "Boston, MA",
    bio: "Fourth-year medical student passionate about internal medicine and global health. Interested in pursuing residency in academic medicine.",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    applicationStatus: true,
    reviewCompleted: true,
    promotions: false,
  });

  const handleSave = () => {
    // Save profile data to API
    setIsEditing(false);
  };

  const stats = {
    applicationsSubmitted: 0,
    reviewsReceived: 0,
    averageRating: 0,
    documentsUploaded: 0,
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4">
      <div className="mb-4 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Profile Settings</h1>
        <p className="text-black mt-2 text-sm sm:text-base">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                <div>
                  <CardTitle className="text-base sm:text-lg text-black">Personal Information</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Update your profile details</CardDescription>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`${isEditing ? "bg-black hover:bg-gray-800" : ""} w-full sm:w-auto`}
                  size="sm"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      <span className="text-xs sm:text-sm">Save Changes</span>
                    </>
                  ) : (
                    <span className="text-xs sm:text-sm">Edit Profile</span>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pb-4 border-b">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-8 w-8 sm:h-10 sm:w-10 text-gray-500" />
                </div>
                <div className="text-center sm:text-left">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Camera className="h-4 w-4 mr-2" />
                    <span className="text-xs sm:text-sm">Change Photo</span>
                  </Button>
                  <p className="text-xs text-black mt-2">JPG, PNG or GIF. Max 5MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-black mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg text-black disabled:bg-gray-50 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-black mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg text-black disabled:bg-gray-50 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-black mb-1">
                    Medical School
                  </label>
                  <input
                    type="text"
                    value={profileData.medicalSchool}
                    onChange={(e) => setProfileData({...profileData, medicalSchool: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg text-black disabled:bg-gray-50 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-black mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    value={profileData.graduationYear}
                    onChange={(e) => setProfileData({...profileData, graduationYear: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg text-black disabled:bg-gray-50 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-black mb-1">
                    Specialty Interest
                  </label>
                  <input
                    type="text"
                    value={profileData.specialty}
                    onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg text-black disabled:bg-gray-50 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-black mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg text-black disabled:bg-gray-50 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-black mb-1">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg text-black disabled:bg-gray-50 text-sm sm:text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-black">Notification Preferences</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <div>
                    <p className="font-medium text-black text-sm sm:text-base">Email Updates</p>
                    <p className="text-xs sm:text-sm text-black">Receive updates about your applications</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.emailUpdates}
                    onChange={(e) => setNotifications({...notifications, emailUpdates: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <div>
                    <p className="font-medium text-black text-sm sm:text-base">Application Status</p>
                    <p className="text-xs sm:text-sm text-black">Get notified when status changes</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.applicationStatus}
                    onChange={(e) => setNotifications({...notifications, applicationStatus: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <div>
                    <p className="font-medium text-black text-sm sm:text-base">Review Completed</p>
                    <p className="text-xs sm:text-sm text-black">Alert when reviews are ready</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.reviewCompleted}
                    onChange={(e) => setNotifications({...notifications, reviewCompleted: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Account Stats */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-black">Account Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-black">Applications</span>
                <span className="font-semibold text-black text-sm sm:text-base">{stats.applicationsSubmitted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-black">Reviews</span>
                <span className="font-semibold text-black text-sm sm:text-base">{stats.reviewsReceived}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-black">Avg Rating</span>
                <span className="font-semibold text-black text-sm sm:text-base">{stats.averageRating}/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-black">Documents</span>
                <span className="font-semibold text-black text-sm sm:text-base">{stats.documentsUploaded}</span>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-black">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3 sm:p-6 pt-0">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-xs sm:text-sm">Change Password</span>
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                <span className="text-xs sm:text-sm">Two-Factor Auth</span>
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-red-600 text-base sm:text-lg">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <p className="text-xs sm:text-sm text-black mb-3">
                Once you delete your account, there is no going back.
              </p>
              <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50" size="sm">
                <span className="text-xs sm:text-sm">Delete Account</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}