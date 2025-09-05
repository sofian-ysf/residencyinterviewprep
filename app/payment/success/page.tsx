'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');

    if (redirectStatus === 'succeeded') {
      setPaymentDetails({
        status: 'success',
        paymentIntent,
      });
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your ERAS review package has been activated
          and our team will begin reviewing your application shortly.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">What happens next?</h2>
          <ol className="text-sm text-left text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="font-semibold mr-2">1.</span>
              You'll receive a confirmation email with your order details
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">2.</span>
              Upload your ERAS application documents in your dashboard
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">3.</span>
              Our reviewers will analyze and provide feedback within the promised timeframe
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">4.</span>
              You'll receive detailed feedback and suggestions for improvement
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          <Link href="/dashboard" className="block">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Go to Dashboard
            </Button>
          </Link>
          
          <Link href="/dashboard/upload" className="block">
            <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
              Upload Documents
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@erasreviewer.com" className="text-blue-500 hover:underline">
              support@erasreviewer.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}