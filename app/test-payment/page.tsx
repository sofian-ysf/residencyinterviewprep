"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestPaymentPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [paymentData, setPaymentData] = useState<any>(null);
  const router = useRouter();

  const simulatePayment = async () => {
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/test/simulate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setPaymentData(data);

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard/new');
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Payment simulation failed:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Test Payment Simulator
          </h1>

          <p className="text-gray-600 mb-6">
            This is a development tool to simulate a successful payment and access the application upload interface.
          </p>

          <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Development Mode Only:</strong> This simulates a payment without processing any real transaction.
            </p>
          </div>

          <button
            onClick={simulatePayment}
            disabled={loading}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processing...' : 'Simulate Payment'}
          </button>

          {status === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg">
              <p className="text-green-800">
                ✓ Payment simulated successfully! Redirecting to dashboard...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-lg">
              <p className="text-red-800">
                ✗ Payment simulation failed. Please try again.
              </p>
            </div>
          )}

          {paymentData && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Payment Details:</p>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(paymentData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/dashboard"
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}