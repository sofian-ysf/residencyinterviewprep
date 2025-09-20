"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Package
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    applicationsInReview: 0,
    completedReviews: 0,
    pendingRequests: 0
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, appsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/applications?limit=5')
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setRecentApplications(appsData.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      link: "/admin/users"
    },
    {
      title: "In Review",
      value: stats.applicationsInReview,
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      link: "/admin/applications?status=IN_REVIEW"
    },
    {
      title: "Completed",
      value: stats.completedReviews,
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      link: "/admin/applications?status=COMPLETED"
    },
    {
      title: "Edit Requests",
      value: stats.pendingRequests,
      icon: AlertCircle,
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      link: "/admin/applications?requests=true"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      'DRAFT': 'bg-gray-600 text-gray-200',
      'IN_REVIEW': 'bg-yellow-600 text-yellow-100',
      'SUBMITTED': 'bg-blue-600 text-blue-100',
      'REVIEWED': 'bg-purple-600 text-purple-100',
      'COMPLETED': 'bg-green-600 text-green-100'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-600 text-gray-200'}`}>
        {status.replace('_', ' ')}
      </span>
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">Manage users and review applications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Applications */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Applications in Review</h2>
            <Link
              href="/admin/applications"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View all →
            </Link>
          </div>

          {recentApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">User</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Package</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Documents</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Updated</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-white font-medium">{app.user.name || 'No name'}</p>
                          <p className="text-gray-400 text-sm">{app.user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getPackageBadge(app.packageType)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{app._count?.documents || 0}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(app.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/applications/${app.id}`}
                          className="text-blue-400 hover:text-blue-300 font-medium text-sm"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No applications in review
            </div>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/users">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
            <div className="p-6 flex items-center gap-4">
              <Users className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-white font-semibold">Manage Users</h3>
                <p className="text-gray-400 text-sm">View and manage all users</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/applications">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
            <div className="p-6 flex items-center gap-4">
              <FileText className="h-8 w-8 text-green-400" />
              <div>
                <h3 className="text-white font-semibold">Review Applications</h3>
                <p className="text-gray-400 text-sm">Review and manage applications</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/applications?status=IN_REVIEW">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
            <div className="p-6 flex items-center gap-4">
              <Clock className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-white font-semibold">Pending Reviews</h3>
                <p className="text-gray-400 text-sm">Applications awaiting review</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}