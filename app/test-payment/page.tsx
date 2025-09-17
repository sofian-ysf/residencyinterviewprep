'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
        console.error('Error:', data);
      }
    } catch (error) {
      setStatus('error');
      console.error('Error simulating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/test/simulate-payment');
      const data = await res.json();

      setPaymentData(data);
    } catch (error) {
      console.error('Error checking status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Test Payment Simulation</CardTitle>
          <CardDescription>
            This is a development tool to simulate a successful payment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'idle' && (
            <>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This will create a test payment record for the currently logged-in user,
                  allowing you to test the application upload interface.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={simulatePayment}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Creating...' : 'Simulate Successful Payment'}
                </Button>

                <Button
                  onClick={checkPaymentStatus}
                  disabled={loading}
                  variant="outline"
                  className="flex-1"
                >
                  Check Status
                </Button>
              </div>
            </>
          )}

          {status === 'success' && paymentData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">✓ Payment Simulated Successfully!</h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>Payment ID: {paymentData.payment.id}</p>
                <p>Amount: ${paymentData.payment.amount}</p>
                <p>Package: {paymentData.payment.packageName}</p>
                <p>Application ID: {paymentData.application.id}</p>
              </div>
              <p className="text-sm text-green-600 mt-3">Redirecting to dashboard...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">✗ Error</h3>
              <p className="text-sm text-red-700">
                Failed to simulate payment. Make sure you are logged in.
              </p>
            </div>
          )}

          {paymentData && !loading && status === 'idle' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Current Status:</h3>
              <div className="text-sm space-y-1">
                <p>Has Active Payment: {paymentData.hasActivePayment ? 'Yes' : 'No'}</p>
                <p>Total Payments: {paymentData.payments?.length || 0}</p>
                <p>Active Applications: {paymentData.applications?.length || 0}</p>
              </div>

              {paymentData.payments && paymentData.payments.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <h4 className="font-medium text-sm mb-2">Recent Payments:</h4>
                  {paymentData.payments.slice(0, 3).map((p: any) => (
                    <div key={p.id} className="text-xs text-gray-600 mb-1">
                      ${p.amount} - {p.packageName} - {p.status}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="pt-4 border-t">
            <Button
              onClick={() => router.push('/dashboard/new')}
              variant="outline"
              className="w-full"
            >
              Go to New Application Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}