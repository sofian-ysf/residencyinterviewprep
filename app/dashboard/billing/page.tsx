"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Receipt
} from "lucide-react";

export default function BillingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  // Mock data - would come from API/database
  // Set to empty array to show empty state
  const billingHistory: any[] = [];

  const totalSpent = billingHistory.reduce((sum, item) => sum + item.amount, 0);
  const averagePackagePrice = billingHistory.length > 0 ? Math.round(totalSpent / billingHistory.length) : 0;

  const paymentMethods = [
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Billing & Payments</h1>
        <p className="text-sm sm:text-base text-black mt-1 sm:mt-2">Manage your payment methods and view transaction history</p>
      </div>

      {/* Billing Stats - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Total Spent</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-black">${totalSpent}</div>
            <p className="text-xs text-black mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Applications</CardTitle>
            <Receipt className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-black">{billingHistory.length}</div>
            <p className="text-xs text-black mt-1">Purchased</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Average</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-black">${averagePackagePrice}</div>
            <p className="text-xs text-black mt-1">Per package</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-black">Next</CardTitle>
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-black">None</div>
            <p className="text-xs text-black mt-1">No subs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Payment Methods - Mobile First */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-black">Payment Methods</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Manage your saved payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
              {paymentMethods.map((method) => (
                <div key={method.id} className="p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-black flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base text-black truncate">
                          {method.type.toUpperCase()} •••• {method.last4}
                        </p>
                        <p className="text-xs sm:text-sm text-black">Expires {method.expiry}</p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex-shrink-0">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full text-xs sm:text-sm">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          {/* Billing Address - Mobile Optimized */}
          <Card className="mt-4 sm:mt-6">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-black">Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <p className="text-black font-medium">John Doe</p>
                <p className="text-black">123 Medical School Drive</p>
                <p className="text-black">Boston, MA 02115</p>
                <p className="text-black">United States</p>
              </div>
              <Button variant="outline" size="sm" className="mt-3 sm:mt-4 text-xs sm:text-sm">
                Edit Address
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History - Mobile Optimized */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-base sm:text-lg text-black">Transaction History</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Your payment history and invoices</CardDescription>
                </div>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-2 sm:px-3 py-1 border rounded-lg text-xs sm:text-sm text-black w-full sm:w-auto"
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <div className="space-y-3">
                {billingHistory.map((transaction) => (
                  <div key={transaction.id} className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          transaction.status === 'paid' ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {transaction.status === 'paid' ? (
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base text-black truncate">{transaction.description}</p>
                          <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-black">
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span className="truncate">{transaction.invoice}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end space-x-3 pl-11 sm:pl-0">
                        <div className="text-right">
                          <p className="font-semibold text-sm sm:text-base text-black">${transaction.amount}</p>
                          <p className="text-xs text-green-600">Paid</p>
                        </div>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {billingHistory.length === 0 && (
                <div className="text-center py-6 sm:py-8">
                  <Receipt className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-black">No transactions yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upgrade CTA - Mobile Optimized */}
          <Card className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-black mb-2">Need Another Review?</h3>
                  <p className="text-xs sm:text-sm text-black mb-3 sm:mb-4">
                    Get 20% off your next package when you purchase within 30 days
                  </p>
                  <Button className="bg-black hover:bg-gray-800 w-full sm:w-auto text-xs sm:text-sm">
                    View Packages
                  </Button>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 text-center sm:text-right">
                  20% OFF
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}