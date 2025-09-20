"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Clock,
  CheckCircle,
  User,
  Package,
  Calendar,
  Search,
  Filter,
  Eye,
  Download,
  Upload
} from "lucide-react";
import Link from "next/link";

export default function AdminApplicationsPage() {
  const searchParams = useSearchParams();
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || "all");
  const [packageFilter, setPackageFilter] = useState("all");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const url = statusFilter !== "all"
          ? `/api/admin/applications?status=${statusFilter}`
          : '/api/admin/applications?status=all';

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
          setFilteredApplications(data);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [statusFilter]);

  useEffect(() => {
    let filtered = applications;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.user.name && app.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply package filter
    if (packageFilter !== "all") {
      filtered = filtered.filter(app => app.packageType === packageFilter);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, packageFilter, applications]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </div>
    );
  };

  const getPackageBadge = (packageType: string) => {
    const packageStyles: { [key: string]: string } = {
      'ESSENTIAL': 'bg-blue-900 text-blue-300',
      'COMPREHENSIVE': 'bg-indigo-900 text-indigo-300',
      'PREMIUM': 'bg-purple-900 text-purple-300',
      'COMPLETE': 'bg-pink-900 text-pink-300'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${packageStyles[packageType] || 'bg-gray-700 text-gray-300'}`}>
        {packageType}
      </span>
    );
  };

  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
      icon: FileText,
      color: "text-blue-400"
    },
    {
      label: "In Review",
      value: applications.filter(a => a.status === 'IN_REVIEW' || a.status === 'SUBMITTED').length,
      icon: Clock,
      color: "text-yellow-400"
    },
    {
      label: "Completed",
      value: applications.filter(a => a.status === 'COMPLETED' || a.status === 'REVIEWED').length,
      icon: CheckCircle,
      color: "text-green-400"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Applications Management</h1>
        <p className="text-gray-400 mt-1">Review and manage all submitted applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-gray-800 border-gray-700">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by user name, email, or application ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <select
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Packages</option>
                <option value="ESSENTIAL">Essential</option>
                <option value="COMPREHENSIVE">Comprehensive</option>
                <option value="PREMIUM">Premium</option>
                <option value="COMPLETE">Complete</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Applications Table */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Applications</h2>

          {filteredApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Application ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">User</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Package</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Documents</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Experiences</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Updated</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3 px-4">
                        <span className="text-white font-mono text-sm">{app.id.substring(0, 8)}...</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-white font-medium">{app.user.name || 'No name'}</p>
                          <p className="text-gray-400 text-sm">{app.user.email}</p>
                          {app.user.medicalSchool && (
                            <p className="text-gray-500 text-xs">{app.user.medicalSchool}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getPackageBadge(app.packageType)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{app._count?.documents || 0}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white">{app._count?.experiences || 0}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(app.updatedAt).toLocaleDateString()}
                        <br />
                        <span className="text-xs">{new Date(app.updatedAt).toLocaleTimeString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/applications/${app.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                        >
                          <Eye className="h-3 w-3" />
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No applications found
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}