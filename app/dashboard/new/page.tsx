"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentModal from "@/components/PaymentModal";
import { 
  Check,
  Upload,
  FileText,
  DollarSign,
  Clock,
  Star,
  ArrowRight
} from "lucide-react";

export default function NewApplicationPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          packageInfo={getSelectedPackage()!}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}