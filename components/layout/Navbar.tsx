"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="border-b border-gray-100 bg-[#f3f4f6] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex items-center justify-center">
                <Image
                  src="/logo2.png"
                  alt="ResidencyInterviewPrep Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-semibold text-base sm:text-lg text-black hidden sm:block">ResidencyInterviewPrep</span>
              <span className="font-semibold text-base sm:text-lg text-black sm:hidden">InterviewPrep</span>
            </Link>

            {/* Center Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <Link href="/guides" className="text-sm font-medium text-black hover:text-gray-700 transition-colors">
                Guides
              </Link>
              <Link href="/timeline" className="text-sm font-medium text-black hover:text-gray-700 transition-colors">
                Timeline
              </Link>
              <Link href="/blog" className="text-sm font-medium text-black hover:text-gray-700 transition-colors">
                Blog
              </Link>
            </div>

            {/* Right Side - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <>
                  <Link href="/dashboard" className="text-sm text-black hover:text-gray-700 transition-colors">
                    Dashboard
                  </Link>
                  <div className="flex items-center gap-3">
                    <Link href="/dashboard/profile">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                        <User className="h-4 w-4" />
                      </div>
                    </Link>
                    <Button 
                      onClick={() => signOut({ callbackUrl: "/" })}
                      variant="outline"
                      className="text-sm px-4 py-2 text-black border-gray-300 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="text-sm text-black hover:text-gray-700 transition-colors">
                    Sign In
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg cursor-pointer">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              {/* Navigation Links */}
              <Link 
                href="/guides" 
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 rounded-lg"
              >
                Guides
              </Link>
              <Link 
                href="/timeline" 
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 rounded-lg"
              >
                Timeline
              </Link>
              <Link 
                href="/blog" 
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 rounded-lg"
              >
                Blog
              </Link>
              
              <div className="border-t border-gray-200 pt-3">
                {session ? (
                  <>
                    <Link 
                      href="/dashboard" 
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 rounded-lg"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/dashboard/profile" 
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 rounded-lg"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth/signin" 
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-50 rounded-lg"
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/auth/signup" 
                      onClick={closeMobileMenu}
                      className="block w-full"
                    >
                      <Button className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}