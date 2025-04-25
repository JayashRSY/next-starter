'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart3, Shield, Clock, Mail } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Animation */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Empowering Your Financial Future
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            We combine cutting-edge technology with financial expertise to help you make smarter decisions 
            about your money, credit cards, and investments.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: '50K+', label: 'Active Users' },
            { number: '$2M+', label: 'Rewards Earned' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Support' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-none hover:shadow-lg transition-all duration-300">
            <BarChart3 className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Analytics</h3>
            <p className="text-gray-600">
              Advanced spending analysis and personalized insights to help you make better financial decisions.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-none hover:shadow-lg transition-all duration-300">
            <Shield className="h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Platform</h3>
            <p className="text-gray-600">
              Bank-level security and encryption to keep your financial data safe and protected.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-none hover:shadow-lg transition-all duration-300">
            <Clock className="h-10 w-10 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Updates</h3>
            <p className="text-gray-600">
              Instant notifications and live tracking of your rewards and cashback across all cards.
            </p>
          </Card>
        </div>

        {/* Mission Statement */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-10"></div>
          <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              To democratize financial intelligence and empower everyone to make the most of their 
              money through smart credit card usage and data-driven insights.
            </p>
          </div>
        </div>

        {/* Team Section with Modern Cards */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', image: '/team/placeholder.png' },
              { name: 'Michael Chen', role: 'CTO', image: '/team/placeholder.png' },
              { name: 'Emily Rodriguez', role: 'Head of Product', image: '/team/placeholder.png' },
              { name: 'David Kim', role: 'Lead Developer', image: '/team/placeholder.png' },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 p-6 text-center hover:shadow-xl transition-all duration-300">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{member.name[0]}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600 mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <Mail className="h-12 w-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions about our platform? We'd love to hear from you and help you get started.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Contact Us
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;