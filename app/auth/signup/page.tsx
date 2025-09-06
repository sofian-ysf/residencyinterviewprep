"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    medicalSchool: "",
    graduationYear: "",
    specialty: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          medicalSchool: formData.medicalSchool,
          graduationYear: parseInt(formData.graduationYear),
          specialty: formData.specialty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
      } else {
        router.push("/auth/signin?registered=true");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    "Internal Medicine",
    "Surgery",
    "Pediatrics",
    "Family Medicine",
    "Emergency Medicine",
    "Anesthesiology",
    "Radiology",
    "Psychiatry",
    "Obstetrics and Gynecology",
    "Orthopedic Surgery",
    "Dermatology",
    "Ophthalmology",
    "Pathology",
    "Other",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i - 1);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left side - Feature highlight */}
        <div className="hidden lg:flex flex-1 bg-[#f3f4f6] text-gray-900 items-center justify-center px-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-6">
              Start your journey to matching
            </h2>
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-gray-800/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Submit your application</p>
<p className="text-gray-600 text-sm">Upload your ERAS documents for review</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-gray-800/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Expert review</p>
<p className="text-gray-600 text-sm">Get feedback from admission committee members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-gray-800/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Match successfully</p>
<p className="text-gray-600 text-sm">85% of our clients match their top 3 choices</p>
                </div>
              </div>
            </div>
            
<div className="border-t border-gray-300 pt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold">4.9</div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
<p className="text-sm text-gray-600">from 2,847 reviews</p>
                </div>
              </div>
<p className="text-sm text-gray-600">
                Trusted by medical students from Harvard, Johns Hopkins, Stanford, and 200+ other schools
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-black mb-2">
                Create your account
              </h1>
              <p className="text-black">
                Join thousands getting expert MyERAS Reviews
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors placeholder:text-gray-700 placeholder:font-medium"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors placeholder:text-gray-700 placeholder:font-medium"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="medicalSchool" className="block text-sm font-medium text-black mb-2">
                  Medical school
                </label>
                <input
                  id="medicalSchool"
                  name="medicalSchool"
                  type="text"
                  value={formData.medicalSchool}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                  placeholder="Harvard Medical School"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-black mb-2">
                    Graduation year
                  </label>
                  <select
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors cursor-pointer placeholder:text-gray-500"
                    required
                  >
                    <option value="" className="text-gray-500">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-black mb-2">
                    Specialty interest
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors cursor-pointer placeholder:text-gray-500"
                    required
                  >
                    <option value="" className="text-gray-500">Select specialty</option>
                    {specialties.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors placeholder:text-gray-700 placeholder:font-medium"
                    placeholder="Min. 8 characters"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors placeholder:text-gray-700 placeholder:font-medium"
                    placeholder="Repeat password"
                    required
                  />
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium cursor-pointer transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    "Creating account..."
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-600 text-center">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-gray-900 hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-gray-900 hover:underline">Privacy Policy</Link>
              </p>
            </form>

            <p className="mt-8 text-center text-sm text-black">
              Already have an account?{" "}
              <Link href="/auth/signin" className="font-medium text-black hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}