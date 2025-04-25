'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PiggyBank, LineChart, Shield, Calculator, Landmark, Coins, Scroll } from "lucide-react";

export default function FinancialPlanningPage() {
  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Personalized Financial Planning
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Get a comprehensive financial plan tailored to your goals and circumstances. First consultation is free!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Income & Expenses */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-emerald-500" />
                Income & Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detailed analysis of your income streams and spending patterns to optimize your cash flow.
              </p>
            </CardContent>
          </Card>

          {/* Investments */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-500" />
                Investment Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Personalized investment recommendations based on your risk tolerance and goals.
              </p>
            </CardContent>
          </Card>

          {/* Insurance */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-500" />
                Insurance Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive insurance coverage analysis to protect your assets and loved ones.
              </p>
            </CardContent>
          </Card>

          {/* Tax Planning */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-red-500" />
                Tax Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Strategic tax planning to minimize your tax burden and maximize returns.
              </p>
            </CardContent>
          </Card>

          {/* Loans & Debt */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-orange-500" />
                Loans & Debt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Expert guidance on managing loans and creating effective debt repayment strategies.
              </p>
            </CardContent>
          </Card>

          {/* Estate Planning */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scroll className="h-5 w-5 text-purple-500" />
                Estate Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Future-focused estate planning to ensure your legacy is protected.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-t-4 border-t-emerald-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-emerald-500" />
              Get Your Free Financial Plan
            </CardTitle>
            <CardDescription>
              Take the first step towards financial freedom with our complimentary consultation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Our expert financial advisors will create a personalized plan that covers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Comprehensive financial situation analysis</li>
                <li>Goal-setting and timeline planning</li>
                <li>Investment and savings recommendations</li>
                <li>Risk assessment and management strategies</li>
                <li>Regular review and adjustment suggestions</li>
              </ul>
              <Button className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}