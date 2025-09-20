"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Calendar,
  FileText,
  Package,
  Search,
  Filter
} from "lucide-react";
import Link from "next/link";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          setFilteredUsers(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply role filter
    if (filterRole !== "all") {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filterRole, users]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getRoleBadge = (role: string) => {
    const roleStyles: { [key: string]: string } = {
      'ADMIN': 'bg-red-900 text-red-300',
      'REVIEWER': 'bg-purple-900 text-purple-300',
      'APPLICANT': 'bg-blue-900 text-blue-300'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${roleStyles[role] || 'bg-gray-700 text-gray-300'}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Users Management</h1>
        <p className="text-gray-400 mt-1">View and manage all registered users</p>
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
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="APPLICANT">Applicants</option>
                <option value="REVIEWER">Reviewers</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Applicants</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'APPLICANT').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Applications</p>
                <p className="text-2xl font-bold text-white">
                  {users.reduce((sum, u) => sum + (u._count?.applications || 0), 0)}
                </p>
              </div>
              <Package className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">All Users</h2>

          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">User</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Role</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Applications</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Medical School</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Joined</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.name || 'No name'}</p>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-white">{user._count?.applications || 0} total</span>
                          {user.applications && user.applications.length > 0 && (
                            <span className="text-gray-400 text-xs">
                              {user.applications.filter((a: any) => a.status === 'IN_REVIEW').length} in review
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <p className="text-white">{user.medicalSchool || '-'}</p>
                          {user.graduationYear && (
                            <p className="text-gray-400">Class of {user.graduationYear}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {user.applications && user.applications.length > 0 && (
                            <Link
                              href={`/admin/applications?userId=${user.id}`}
                              className="text-blue-400 hover:text-blue-300 font-medium text-sm"
                            >
                              View Apps
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No users found
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}