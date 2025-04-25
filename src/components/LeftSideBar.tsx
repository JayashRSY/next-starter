"use client";
import React, { useState } from "react";
import {
  Home,
  Info,
  Briefcase,
  Mail,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  BarChart, // Import the BarChart icon for Analytics
} from "lucide-react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const LeftSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const navItems = [
    { label: "Dashboard", href: "/", icon: <Home className="w-5 h-5" /> },
    { label: "Analytics", href: "/analytics", icon: <BarChart className="w-5 h-5" /> }, // New Analytics item
    { label: "Credit Card", href: "/credit-card", icon: <CreditCard className="w-5 h-5" /> },
    { label: "Services", href: "/services", icon: <Briefcase className="w-5 h-5" /> },
    { label: "About", href: "/about", icon: <Info className="w-5 h-5" /> },
    { label: "Contact", href: "/contact", icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    user && (
      <nav
        aria-label="Main Navigation"
        className={`h-screen bg-gray-100 border-r border-gray-200 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full p-2 bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        {/* Navigation Items */}
        <ul className="mt-4 space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={`/dashboard${item.href}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default LeftSideBar;
