"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-black mb-2">
                Welcome back
              </h1>
              <p className="text-black">
                Sign in to continue your MyERAS Review
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors placeholder:text-gray-400"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-black">
                    Password
                  </label>
                  <Link href="/auth/reset-password" className="text-sm text-black hover:text-gray-900 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors placeholder:text-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium cursor-pointer transition-colors"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-black">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-gray-200 hover:bg-gray-50 py-3 rounded-lg font-medium cursor-pointer transition-colors text-black"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <p className="mt-8 text-center text-sm text-black">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-black hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Feature highlight */}
        <div className="hidden lg:flex flex-1 bg-[#f3f4f6] text-black items-center justify-center px-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-6">
              Join 10,000+ successful applicants
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-gray-800/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">✓</span>
                </div>
<p className="text-black">
                  85% match rate - 3x the national average
                </p>
              </div>
              <div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-gray-800/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">✓</span>
                </div>
<p className="text-black">
                  Expert reviewers from admission committees
                </p>
              </div>
              <div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-gray-800/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">✓</span>
                </div>
<p className="text-black">
                  48-hour turnaround guaranteed
                </p>
              </div>
            </div>
            
<div className="mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
<p className="text-sm text-black mb-2">Recent success</p>
              <p className="font-medium">
                "Matched Orthopedics at Stanford after being rejected everywhere last year."
              </p>
<p className="text-sm text-black mt-2">- Kumar P., IMG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}