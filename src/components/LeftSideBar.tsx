"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LineChart,
  CreditCard,
  PiggyBank,
  Calculator,
  Briefcase,
  HelpCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const LeftSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="w-5 h-5" />,
      color: "text-blue-500",
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <LineChart className="w-5 h-5" />,
      color: "text-purple-500",
    },
    {
      label: "Credit Card",
      href: "/credit-card",
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-green-500",
    },
    {
      label: "Financial Planning",
      href: "/financial-planning",
      icon: <PiggyBank className="w-5 h-5" />,
      color: "text-orange-500",
    },
    {
      label: "Finance Calculators",
      href: "/calculators",
      icon: <Calculator className="w-5 h-5" />,
      color: "text-cyan-500",
    },
    {
      label: "Services",
      href: "/services",
      icon: <Briefcase className="w-5 h-5" />,
      color: "text-indigo-500",
    },
    {
      label: "Blogs",
      href: "/blogs",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-pink-500",
    },
  ];

  const bottomNavItems = [
    {
      label: "Help",
      href: "/help",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "text-gray-500",
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-gray-500",
    },
  ];

  return (
    user && (
      <nav
        aria-label="Main Navigation"
        className={cn(
          "flex flex-col h-screen bg-background border-r border-border shadow-sm transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <img 
                  src="/coin.png" 
                  alt="Wealth Wings Logo" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1">
                  <span className="font-mono">Finance</span>
                  <span className="font-sans italic">Personalized</span>
                </span>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle Sidebar"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item, index) => {
              const isActive = pathname === `/dashboard${item.href}` || 
                             (item.href === '/' && pathname === '/dashboard');
              return (
                <li key={index}>
                  <Link
                    href={`/dashboard${item.href}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                      "group relative",
                      isCollapsed ? "justify-center" : "",
                      isActive 
                        ? "bg-muted text-foreground" 
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className={cn(
                      "transition-colors",
                      isActive ? item.color : "text-muted-foreground",
                    )}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className={cn(
                        "font-medium",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}>
                        {item.label}
                      </span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-6 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                        {item.label}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-border py-4 px-3">
          <ul className="space-y-1">
            {bottomNavItems.map((item, index) => {
              const isActive = pathname === `/dashboard${item.href}`;
              return (
                <li key={index}>
                  <Link
                    href={`/dashboard${item.href}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                      "group relative",
                      isCollapsed ? "justify-center" : "",
                      isActive 
                        ? "bg-muted text-foreground" 
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className={cn(
                      "transition-colors",
                      isActive ? item.color : "text-muted-foreground"
                    )}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className={cn(
                        "font-medium",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}>
                        {item.label}
                      </span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-6 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                        {item.label}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    )
  );
};

export default LeftSideBar;
