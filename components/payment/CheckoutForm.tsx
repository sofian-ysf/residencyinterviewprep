'use client';

import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

export default function CheckoutForm({ amount, planName }: { amount: number; planName: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (error) {
      setError(error.message || 'An error occurred during payment.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Package</span>
          <span className="text-lg font-semibold text-gray-900">{planName}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-blue-100">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Total Amount</span>
          <span className="text-3xl font-bold text-gray-900">${amount}</span>
        </div>
      </div>

      <PaymentElement
        options={{
          layout: 'tabs'
        }}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full h-12 text-lg font-semibold"
      >
        {processing ? 'Processing...' : `Pay $${amount}`}
      </Button>

      <div className="text-center text-sm text-gray-500">
        <p className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secure payment powered by Stripe
        </p>
        <p className="mt-2">Your payment information is encrypted and secure</p>
      </div>
    </form>
  );
}