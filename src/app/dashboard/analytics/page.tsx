'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Calendar, ShoppingBag, Gift } from 'lucide-react';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-background to-background/80">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Financial Analytics
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Track your spending patterns, monitor rewards, and get insights into your financial habits.
        </p>
      </div>
      
      {/* Summary Cards with Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card/80 backdrop-blur-sm dark:bg-card/60">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Spending</p>
              <h3 className="text-2xl font-bold mb-2 text-foreground">$12,450</h3>
              <div className="flex items-center text-green-500 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+12% from last month</span>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card/80 backdrop-blur-sm dark:bg-card/60">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Per Day</p>
              <h3 className="text-2xl font-bold mb-2 text-foreground">$142</h3>
              <div className="flex items-center text-red-500 dark:text-red-400">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span className="text-sm">-3% from last month</span>
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card/80 backdrop-blur-sm dark:bg-card/60">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Transactions</p>
              <h3 className="text-2xl font-bold mb-2 text-foreground">284</h3>
              <div className="flex items-center text-green-500 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+8% from last month</span>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card/80 backdrop-blur-sm dark:bg-card/60">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Rewards Earned</p>
              <h3 className="text-2xl font-bold mb-2 text-foreground">$345</h3>
              <div className="flex items-center text-green-500 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+15% from last month</span>
              </div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg">
              <Gift className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts with Enhanced Design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card/80 backdrop-blur-sm dark:bg-card/60">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Monthly Spending Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#f0f0f0"} />
                <XAxis dataKey="name" stroke={isDark ? "#aaa" : "#666"} />
                <YAxis stroke={isDark ? "#aaa" : "#666"} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#222' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                    color: isDark ? '#eee' : '#333'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={isDark ? "#a78bfa" : "#8884d8"} 
                  strokeWidth={2}
                  dot={{ fill: isDark ? "#a78bfa" : "#8884d8" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card/80 backdrop-blur-sm dark:bg-card/60">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Spending by Category</h2>
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
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke={isDark ? "#222" : "white"}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#222' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                    color: isDark ? '#eee' : '#333'
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2 hover:shadow-lg transition-all duration-300 border-border bg-card/80 backdrop-blur-sm dark:bg-card/60">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Category Breakdown</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#f0f0f0"} />
                <XAxis dataKey="name" stroke={isDark ? "#aaa" : "#666"} />
                <YAxis stroke={isDark ? "#aaa" : "#666"} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#222' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                    color: isDark ? '#eee' : '#333'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill={isDark ? "#a78bfa" : "#8884d8"}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AnalyticsPage;