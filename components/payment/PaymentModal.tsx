'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

interface PaymentModalProps {
  planId: string;
  planName: string;
  amount: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ 
  planId, 
  planName, 
  amount, 
  isOpen, 
  onClose 
}: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && planId) {
      if (!stripeKey) {
        console.error('Stripe publishable key is not configured');
        setLoading(false);
        return;
      }

      fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: planId,
          planName: planName,
          amount: amount
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            console.error('Payment intent error:', data.error);
            setClientSecret('');
          } else if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error('No client secret received');
            setClientSecret('');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error creating payment intent:', error);
          setClientSecret('');
          setLoading(false);
        });
    }
  }, [isOpen, planId]);

  if (!isOpen) return null;

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#3b82f6',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      spacingUnit: '8px',
      borderRadius: '8px',
      fontSizeBase: '16px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h2>
            <p className="text-sm text-gray-500 mt-1">Secure payment powered by Stripe</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-8 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="text-gray-500 text-sm">Loading payment form...</p>
            </div>
          ) : !stripePromise ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-red-600 font-medium">Payment service is not configured</p>
              <p className="text-gray-500 text-sm">Please contact support for assistance.</p>
            </div>
          ) : clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm amount={amount} planName={planName} />
            </Elements>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-900 font-medium">Unable to load payment form</p>
              <p className="text-gray-500 text-sm">Please check your connection and try again.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}