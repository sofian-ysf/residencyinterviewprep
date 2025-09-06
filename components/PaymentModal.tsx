"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { X, CreditCard, Lock, Check, Shield, ChevronLeft } from "lucide-react";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageInfo: {
    id: string;
    name: string;
    price: number;
  };
  onSuccess: () => void;
}

function CheckoutForm({ packageInfo, onSuccess, onClose }: { 
  packageInfo: PaymentModalProps['packageInfo'];
  onSuccess: () => void;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the modal opens
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageId: packageInfo.id,
        packageName: packageInfo.name,
        amount: packageInfo.price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Failed to initialize payment");
        }
      })
      .catch(() => {
        setError("Failed to connect to payment server");
      });
  }, [packageInfo]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setError(null);

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card element not found");
      setProcessing(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });

    if (result.error) {
      setError(result.error.message || "Payment failed");
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setSucceeded(true);
        setProcessing(false);
        
        // Update application status
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    }
  };

  const cardStyle = {
    base: {
      color: "#374151",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      fontWeight: "400",
      "::placeholder": {
        color: "#9ca3af",
      },
      padding: "12px",
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{packageInfo.name} Package</p>
                <p className="text-sm text-gray-600 mt-1">Professional ERAS Application Review</p>
              </div>
              <span className="text-2xl font-bold text-gray-900">${packageInfo.price}</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">Total Due Today</span>
                <span className="text-2xl font-bold text-gray-900">${packageInfo.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
          
          {/* Card Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Details
              </label>
              <div className="relative">
                <div className="bg-white border border-gray-300 rounded-xl p-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                  <CardElement options={{ 
                    style: cardStyle,
                    hidePostalCode: false 
                  }} />
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="flex items-center gap-2 text-gray-400">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Secure Payment</p>
              <p className="text-xs text-gray-600">256-bit SSL encryption</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Lock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">PCI Compliant</p>
              <p className="text-xs text-gray-600">Your data is protected</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Money-Back Guarantee</p>
              <p className="text-xs text-gray-600">100% refund policy</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {succeeded && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center">
            <Check className="h-5 w-5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Payment successful!</p>
              <p className="text-xs mt-1">Redirecting to your dashboard...</p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Actions */}
      <div className="border-t border-gray-200 bg-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={processing || succeeded}
            className="flex-1 py-6 text-base border-gray-300"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <Button
            type="submit"
            disabled={!stripe || processing || succeeded || !clientSecret}
            className="flex-1 py-6 text-base bg-gray-900 hover:bg-gray-800 text-white font-medium"
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </span>
            ) : succeeded ? (
              <span className="flex items-center justify-center">
                <Check className="h-5 w-5 mr-2" />
                Payment Complete
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Pay ${packageInfo.price} Now
              </span>
            )}
          </Button>
        </div>
        
        {/* Powered by Stripe */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Lock className="h-3 w-3" />
          <span>Secured by</span>
          <svg className="h-4" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg">
            <path fill="#6772e5" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-3.06 9.01v10.13h-4.12V9.88c0-.72-.24-1.48-1.21-1.48-.87 0-1.65.58-1.95.94v10.67h-4.13V5.57h3.79l.08 1.01c.86-.76 2.01-1.28 3.48-1.28 2.65 0 4.06 1.73 4.06 4.58zm-13.09-4.31c.7 0 1.29.11 1.79.28v3.78a3 3 0 0 0-1.73-.33c-1.11 0-1.95.59-1.95 1.68v8.73H5.07V5.57h3.9l.06 1.56c.52-1.17 1.68-1.56 2.74-1.56h.16z"/>
          </svg>
        </div>
      </div>
    </form>
  );
}

export default function PaymentModal({ isOpen, onClose, packageInfo, onSuccess }: PaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Full Screen Container */}
      <div className="h-full w-full bg-white flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close payment"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">Secure Checkout</h1>
                    <p className="text-xs text-gray-500">MyERAS Reviewer</p>
                  </div>
                </div>
              </div>
              
              {/* Security Badge */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <Lock className="h-4 w-4 text-green-600" />
                <span>Secure SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full max-w-3xl mx-auto">
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                packageInfo={packageInfo} 
                onSuccess={onSuccess}
                onClose={onClose}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}