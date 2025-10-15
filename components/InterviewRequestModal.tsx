"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Calendar, Clock, Send } from 'lucide-react';
import { Button } from './ui/button';

interface InterviewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageInfo: {
    name: string;
    totalInterviews: number;
    remainingInterviews: number;
  } | null;
}

const TIMEZONES = [
  'Eastern Time (ET)',
  'Central Time (CT)',
  'Mountain Time (MT)',
  'Pacific Time (PT)',
  'Alaska Time (AKT)',
  'Hawaii Time (HT)',
];

export function InterviewRequestModal({ isOpen, onClose, packageInfo }: InterviewRequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstChoice: '',
    firstChoiceTime: '',
    secondChoice: '',
    secondChoiceTime: '',
    thirdChoice: '',
    thirdChoiceTime: '',
    timezone: 'Eastern Time (ET)',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/interviews/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmitted(true);

      // Reset form and close after 2 seconds
      setTimeout(() => {
        setFormData({
          firstChoice: '',
          firstChoiceTime: '',
          secondChoice: '',
          secondChoiceTime: '',
          thirdChoice: '',
          thirdChoiceTime: '',
          timezone: 'Eastern Time (ET)',
          notes: '',
        });
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Dialog.Title as="h3" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="h-6 w-6 text-blue-600" />
                      Request Interview Session
                    </Dialog.Title>
                    {packageInfo && (
                      <p className="mt-2 text-sm text-gray-600">
                        {packageInfo.name} - {packageInfo.remainingInterviews} of {packageInfo.totalInterviews} interviews remaining
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Request Submitted!</h4>
                    <p className="text-sm text-gray-600">
                      Our team will contact you within 24 hours to confirm your interview time.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Preferred Date/Time Options */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">
                        Preferred Date & Time Options
                      </h4>
                      <p className="text-xs text-gray-600 mb-4">
                        Please provide 3 preferred date and time options. We'll do our best to accommodate your first choice.
                      </p>

                      <div className="space-y-4">
                        {/* Option 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              1st Choice Date *
                            </label>
                            <input
                              type="date"
                              required
                              value={formData.firstChoice}
                              onChange={(e) => handleChange('firstChoice', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Preferred Time *
                            </label>
                            <input
                              type="time"
                              required
                              value={formData.firstChoiceTime}
                              onChange={(e) => handleChange('firstChoiceTime', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        {/* Option 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              2nd Choice Date
                            </label>
                            <input
                              type="date"
                              value={formData.secondChoice}
                              onChange={(e) => handleChange('secondChoice', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Preferred Time
                            </label>
                            <input
                              type="time"
                              value={formData.secondChoiceTime}
                              onChange={(e) => handleChange('secondChoiceTime', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        {/* Option 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              3rd Choice Date
                            </label>
                            <input
                              type="date"
                              value={formData.thirdChoice}
                              onChange={(e) => handleChange('thirdChoice', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Preferred Time
                            </label>
                            <input
                              type="time"
                              value={formData.thirdChoiceTime}
                              onChange={(e) => handleChange('thirdChoiceTime', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Timezone *
                      </label>
                      <select
                        required
                        value={formData.timezone}
                        onChange={(e) => handleChange('timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {TIMEZONES.map((tz) => (
                          <option key={tz} value={tz}>
                            {tz}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes or Special Requirements
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        rows={3}
                        placeholder="Any specific topics you'd like to focus on, or other requirements..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    {/* Notice */}
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-900">
                          <p className="font-medium mb-1">What happens next?</p>
                          <p className="text-blue-800">
                            Our team will review your request and send you a Google Meet link via email within 24 hours.
                            If your preferred time isn't available, we'll suggest alternative options.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading || !packageInfo || packageInfo.remainingInterviews === 0}
                        className="flex-1"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Request
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
