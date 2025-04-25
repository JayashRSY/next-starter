'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  ArrowRight, 
  Calculator, 
  PiggyBank, 
  LineChart, 
  CreditCard,
  FileText,
  Shield,
  Users,
  Star,
  Brain,
  FolderLock,
  Building2,
  BookOpen,
  MessageCircle
} from "lucide-react";

const services = [
  {
    title: "Personalized Financial Planning",
    description: "Comprehensive financial planning tailored to your needs, covering income, expenses, investments, insurance, taxes, loans, and estate planning.",
    icon: <Calculator className="w-8 h-8 text-blue-500" />,
    features: ["Free First Financial Plan", "Comprehensive Coverage", "Personalized Approach"],
    category: "Premium"
  },
  {
    title: "Product Scoring & Ranking",
    description: "Advanced evaluation system for financial products using our proprietary scoring methodology.",
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    features: ["100-point Scoring System", "Product Comparison", "Detailed Analysis"],
    category: "Analysis"
  },
  {
    title: "MoneySign® Assessment",
    description: "Unique assessment tool analyzing your financial behavior and personality traits for better decision making.",
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    features: ["Behavioral Analysis", "Personality Mapping", "Custom Recommendations"],
    category: "Assessment"
  },
  {
    title: "DocuLocker",
    description: "Secure digital vault for all your financial documents with advanced encryption and organization features.",
    icon: <FolderLock className="w-8 h-8 text-green-500" />,
    features: ["Document Scanning", "Secure Storage", "Easy Organization"],
    category: "Security"
  },
  {
    title: "Financial Planning Centre",
    description: "Physical consultation center in Mumbai offering personalized financial advisory services.",
    icon: <Building2 className="w-8 h-8 text-orange-500" />,
    features: ["One-on-One Consultation", "Safe Deposit Lockers", "Expert Advisors"],
    category: "Consultation"
  },
  {
    title: "Educational Resources",
    description: "Comprehensive learning materials to enhance your financial literacy and decision-making skills.",
    icon: <BookOpen className="w-8 h-8 text-cyan-500" />,
    features: ["Blogs & Articles", "Podcasts", "Financial Guides"],
    category: "Education"
  },
  {
    title: "Community Engagement",
    description: "Join our vibrant community of financial enthusiasts to share experiences and learn together.",
    icon: <MessageCircle className="w-8 h-8 text-indigo-500" />,
    features: ["Discussion Forums", "Peer Support", "Expert Insights"],
    category: "Community"
  }
];

export default function ServicesPage() {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Explore our comprehensive range of financial services designed to help you achieve your financial goals and secure your future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur-sm"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                {service.icon}
                <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                  {service.category}
                </span>
              </div>
              <CardTitle className="text-xl font-semibold">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full mt-4 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 mt-12">
        <p>
          Need a custom service? Contact our team for personalized solutions tailored to your needs.
        </p>
      </div>
    </div>
  );
}