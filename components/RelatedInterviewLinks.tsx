"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Video, HelpCircle, Users } from "lucide-react";

interface RelatedLink {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

interface RelatedInterviewLinksProps {
  currentPage?: string;
  specialty?: string;
}

export default function RelatedInterviewLinks({ currentPage, specialty }: RelatedInterviewLinksProps) {
  // Define all available links
  const allLinks: RelatedLink[] = [
    {
      title: "Mock Interviews",
      description: "Practice with ex-program directors. Realistic simulations and expert feedback.",
      href: "/mock-interviews",
      icon: Video,
      badge: "Most Popular"
    },
    {
      title: "Interview Questions Database",
      description: "200+ common residency interview questions organized by category. Free resource.",
      href: "/interview-questions",
      icon: HelpCircle,
      badge: "Free"
    },
    {
      title: "Interview Prep Service",
      description: "Comprehensive coaching packages with personalized preparation materials.",
      href: "/services/interview-prep",
      icon: Users
    },
    {
      title: "Interview Prep Guide",
      description: "Complete step-by-step guide to preparing for residency interviews.",
      href: "/guides/interview-prep",
      icon: BookOpen,
      badge: "Free"
    },
    {
      title: "Internal Medicine Interview Prep",
      description: "IM-specific coaching and question frameworks from ex-IM program directors.",
      href: "/interview-prep/internal-medicine",
      icon: Users
    },
    {
      title: "Surgery Interview Prep",
      description: "Surgery-specific coaching for competitive general surgery programs.",
      href: "/interview-prep/surgery",
      icon: Users
    },
    {
      title: "Pediatrics Interview Prep",
      description: "Pediatrics-specific coaching focused on child health passion and family communication.",
      href: "/interview-prep/pediatrics",
      icon: Users
    },
    {
      title: "Emergency Medicine Interview Prep",
      description: "EM-specific coaching for high-acuity environments and shift work discussions.",
      href: "/interview-prep/emergency-medicine",
      icon: Users
    },
    {
      title: "Psychiatry Interview Prep",
      description: "Psychiatry-specific coaching on therapeutic approach and interpersonal skills.",
      href: "/interview-prep/psychiatry",
      icon: Users
    }
  ];

  // Filter out current page
  const filteredLinks = allLinks.filter(link => link.href !== currentPage);

  // Select 3-4 most relevant links based on current page
  let selectedLinks: RelatedLink[] = [];

  if (currentPage === "/mock-interviews") {
    // From mock interviews, suggest questions database, guide, and specialty pages
    selectedLinks = filteredLinks.filter(link =>
      link.href === "/interview-questions" ||
      link.href === "/guides/interview-prep" ||
      (specialty && link.href === `/interview-prep/${specialty}`) ||
      link.href === "/services/interview-prep"
    ).slice(0, 3);
  } else if (currentPage === "/interview-questions") {
    // From questions database, suggest mock interviews, guide, and service
    selectedLinks = filteredLinks.filter(link =>
      link.href === "/mock-interviews" ||
      link.href === "/guides/interview-prep" ||
      link.href === "/services/interview-prep"
    ).slice(0, 3);
  } else if (currentPage === "/services/interview-prep") {
    // From service page, suggest mock interviews, questions, and guide
    selectedLinks = filteredLinks.filter(link =>
      link.href === "/mock-interviews" ||
      link.href === "/interview-questions" ||
      link.href === "/guides/interview-prep"
    ).slice(0, 3);
  } else if (currentPage === "/guides/interview-prep") {
    // From guide, suggest mock interviews, questions, and service
    selectedLinks = filteredLinks.filter(link =>
      link.href === "/mock-interviews" ||
      link.href === "/interview-questions" ||
      link.href === "/services/interview-prep"
    ).slice(0, 3);
  } else if (currentPage?.startsWith("/interview-prep/")) {
    // From specialty page, suggest mock interviews, questions, and other specialties
    selectedLinks = [
      ...filteredLinks.filter(link =>
        link.href === "/mock-interviews" ||
        link.href === "/interview-questions"
      ),
      ...filteredLinks.filter(link =>
        link.href.startsWith("/interview-prep/") &&
        link.href !== currentPage
      ).slice(0, 2)
    ].slice(0, 4);
  } else {
    // Default: show top 3 most important pages
    selectedLinks = filteredLinks.filter(link =>
      link.href === "/mock-interviews" ||
      link.href === "/interview-questions" ||
      link.href === "/services/interview-prep"
    ).slice(0, 3);
  }

  // If we don't have enough links, fill with others
  if (selectedLinks.length < 3) {
    const remaining = filteredLinks.filter(link =>
      !selectedLinks.find(selected => selected.href === link.href)
    );
    selectedLinks = [...selectedLinks, ...remaining].slice(0, 4);
  }

  if (selectedLinks.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Continue Your Interview Preparation
          </h2>
          <p className="text-gray-600">
            Explore more resources to master your residency interviews
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 group-hover:bg-gray-900 rounded-lg flex items-center justify-center transition-colors">
                  <link.icon className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 group-hover:text-gray-900 line-clamp-2">
                      {link.title}
                    </h3>
                    {link.badge && (
                      <span className="flex-shrink-0 text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
                    {link.description}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:text-gray-900">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need personalized guidance? Our ex-program directors are here to help.
          </p>
          <Link
            href="/mock-interviews#packages"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            View Coaching Packages
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
