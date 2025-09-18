import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  HelpCircle,
  FileText,
  Users,
  DollarSign
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact Us | MyERAS Editing - Get Help with Your ERAS Application",
  description: "Contact MyERAS Editing for expert ERAS application review. Available 24/7 via email, phone, or chat. Get answers about personal statement review, pricing, and services.",
  keywords: "contact MyERAS Editing, ERAS help, residency application support, personal statement questions",
  openGraph: {
    title: "Contact MyERAS Editing | Expert ERAS Application Support",
    description: "Get in touch with our team of physician reviewers. We're here to help with your ERAS application 24/7.",
    url: "https://www.myerasediting.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://www.myerasediting.com/contact",
  },
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Fastest response time",
    detail: "support@myerasediting.com",
    responseTime: "< 2 hours",
    preferred: true
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Instant assistance",
    detail: "Available 9 AM - 11 PM EST",
    responseTime: "< 2 minutes",
    preferred: false
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with our team",
    detail: "1-800-ERAS-HELP",
    responseTime: "Business hours",
    preferred: false
  }
];

const commonQuestions = [
  {
    icon: FileText,
    title: "Application Review Questions",
    topics: [
      "How the review process works",
      "Turnaround times and deadlines",
      "Revision policies",
      "Specialty-specific guidance"
    ]
  },
  {
    icon: DollarSign,
    title: "Pricing & Payment",
    topics: [
      "Package comparisons",
      "Payment plans available",
      "Group discounts",
      "Refund policy"
    ]
  },
  {
    icon: Users,
    title: "Technical Support",
    topics: [
      "Account access issues",
      "Document upload problems",
      "Platform navigation",
      "Order status updates"
    ]
  }
];

export default function ContactPage() {
  // ContactPoint Schema
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "MyERAS Editing",
      "url": "https://www.myerasediting.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-800-372-7435",
          "contactType": "Customer Service",
          "email": "support@myerasediting.com",
          "availableLanguage": ["English", "Spanish"],
          "areaServed": "US",
          "contactOption": ["TollFree", "HearingImpairedSupported"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "09:00",
            "closes": "23:00"
          }
        },
        {
          "@type": "ContactPoint",
          "telephone": "+1-800-372-7435",
          "contactType": "Technical Support",
          "email": "tech@myerasediting.com",
          "availableLanguage": "English",
          "areaServed": "US"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+1-800-372-7435",
          "contactType": "Billing Support",
          "email": "billing@myerasediting.com",
          "availableLanguage": "English",
          "areaServed": "US"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema)
        }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              How Can We Help You?
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Our team of physician reviewers is here to support your residency journey.
              Get answers, guidance, and expert assistance within hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact-form">
                <Button size="lg" className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#faq">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View FAQs
                  <HelpCircle className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Preferred Contact Method
            </h2>
            <p className="text-lg text-gray-600">
              We're available through multiple channels to serve you better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-lg transition-shadow ${
                  method.preferred ? 'ring-2 ring-gray-900' : ''
                }`}
              >
                {method.preferred && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-8 w-8 text-gray-700" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription className="text-sm">{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-semibold text-gray-900 mb-2">{method.detail}</p>
                  <p className="text-sm text-gray-600">
                    Response time: <span className="font-medium">{method.responseTime}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Send Us a Message
            </h2>
            <p className="text-gray-600 text-center mb-8">
              We typically respond within 2 hours during business hours
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="john.smith@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="">Select a topic</option>
                    <option value="review">Application Review Question</option>
                    <option value="pricing">Pricing & Packages</option>
                    <option value="technical">Technical Support</option>
                    <option value="urgent">Urgent Deadline Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Please describe how we can help you with your ERAS application..."
                ></textarea>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="urgent"
                  name="urgent"
                  className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                />
                <label htmlFor="urgent" className="text-sm text-gray-700">
                  This is urgent (deadline within 48 hours)
                </label>
              </div>

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4">
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Can We Help You With?
            </h2>
            <p className="text-lg text-gray-600">
              Here are the most common topics our clients ask about
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {commonQuestions.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.topics.map((topic, tIndex) => (
                      <li key={tIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time Promise */}
      <section className="py-16 sm:py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock className="h-16 w-16 mx-auto mb-6 text-white/80" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our Response Time Guarantee
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            We understand that ERAS deadlines don't wait. That's why we guarantee:
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">&lt; 2 hours</div>
              <div className="text-gray-300">Email response during business hours</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">&lt; 30 min</div>
              <div className="text-gray-300">Urgent deadline inquiries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-gray-300">Support during application season</div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Visit Our Office
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Main Office</p>
                    <p className="text-gray-600">
                      123 Medical Plaza, Suite 500<br />
                      Boston, MA 02115<br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Office Hours</p>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday: 10:00 AM - 4:00 PM EST<br />
                      Sunday: Emergency support only
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone Numbers</p>
                    <p className="text-gray-600">
                      Main: 1-800-ERAS-HELP (1-800-372-7435)<br />
                      International: +1-617-555-0123<br />
                      WhatsApp: +1-617-555-0124
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
              <p className="text-gray-500">Interactive Map</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Don't let questions delay your application. Get answers now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@myerasediting.com">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Email Us Now
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="tel:18003727435">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Call 1-800-ERAS-HELP
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}