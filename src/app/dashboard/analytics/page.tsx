'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';

const monthlyData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const categoryData = [
  { name: 'Food', value: 400 },
  { name: 'Shopping', value: 300 },
  { name: 'Travel', value: 300 },
  { name: 'Entertainment', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Total Spending</h3>
          <p className="text-2xl font-bold">$12,450</p>
          <span className="text-green-500 text-sm">+12% from last month</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Average Per Day</h3>
          <p className="text-2xl font-bold">$142</p>
          <span className="text-red-500 text-sm">-3% from last month</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Total Transactions</h3>
          <p className="text-2xl font-bold">284</p>
          <span className="text-green-500 text-sm">+8% from last month</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Rewards Earned</h3>
          <p className="text-2xl font-bold">$345</p>
          <span className="text-green-500 text-sm">+15% from last month</span>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Spending Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AnalyticsPage;