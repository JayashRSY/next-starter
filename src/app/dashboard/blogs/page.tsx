'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Clock, User, Tag } from "lucide-react";

// Sample blog data (in a real app, this would come from an API)
const blogs = [
  {
    title: "Understanding Mutual Funds: A Beginner's Guide",
    excerpt: "Learn the basics of mutual funds and how they can help you build long-term wealth.",
    author: "Financial Expert",
    readTime: "5 min read",
    category: "Investment",
    date: "2024-01-15"
  },
  {
    title: "Tax Saving Strategies for Salaried Employees",
    excerpt: "Discover effective ways to optimize your tax savings under the new tax regime.",
    author: "Tax Specialist",
    readTime: "7 min read",
    category: "Taxation",
    date: "2024-01-12"
  },
  {
    title: "How to Create a Solid Emergency Fund",
    excerpt: "Tips and strategies for building and maintaining an emergency fund.",
    author: "Financial Planner",
    readTime: "4 min read",
    category: "Personal Finance",
    date: "2024-01-10"
  }
];

export default function BlogsPage() {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Financial Insights
        </h1>
        <p className="text-gray-600">
          Stay updated with the latest insights, tips, and strategies in personal finance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600 font-medium px-2 py-1 bg-blue-50 rounded-full">
                  {blog.category}
                </span>
                <span className="text-sm text-gray-500">{blog.date}</span>
              </div>
              <CardTitle className="text-xl font-semibold line-clamp-2">
                {blog.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}