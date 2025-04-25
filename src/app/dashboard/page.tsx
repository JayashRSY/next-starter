"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 600 },
  { name: "Jun", value: 800 },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">₹1,20,000</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">₹45,000</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Investments</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">₹3,20,000</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Savings</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">₹75,000</CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  Food <span>₹12,000</span>
                </li>
                <li className="flex justify-between">
                  Rent <span>₹20,000</span>
                </li>
                <li className="flex justify-between">
                  Transport <span>₹5,000</span>
                </li>
                <li className="flex justify-between">
                  Entertainment <span>₹3,000</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>Recent Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  Mutual Funds <span>₹1,50,000</span>
                </li>
                <li className="flex justify-between">
                  Stocks <span>₹90,000</span>
                </li>
                <li className="flex justify-between">
                  Crypto <span>₹30,000</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
