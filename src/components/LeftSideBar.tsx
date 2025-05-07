"use client";
import React, { useState, useEffect } from "react";
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
  BookOpen,
  FileText,
  Calendar,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const LeftSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  // Track submenu open states in a single state object
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  // Add a state to track if the component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  // Set hasMounted to true after the component mounts
  useEffect(() => {
    setHasMounted(true);
    
    // Initialize open submenus based on the current path
    const initialOpenSubMenus: Record<string, boolean> = {};
    navItems.forEach((item, index) => {
      if (item.subItems && item.subItems.some(subItem => 
        pathname === `/dashboard${item.href}${subItem.href}`)) {
        initialOpenSubMenus[index] = true;
      }
    });
    setOpenSubMenus(initialOpenSubMenus);
  }, [pathname]);

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
      href: "/",
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-green-500",
      subItems: [
        {
          label: "Recommender",
          href: "/credit-card",
        },
        {
          label: "Upload Statement",
          href: "/credit-card/statement-upload",
        },
        {
          label: "Statement History",
          href: "/credit-card/statement-history",
        },
      ],
    },
    {
      label: "Finance Tracker",
      href: "/finance-tracker",
      icon: <Wallet className="w-5 h-5" />,
      color: "text-orange-500",
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

  // Toggle submenu open state
  const toggleSubMenu = (index: number) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // If the component hasn't mounted yet, return null or a loading state
  if (!hasMounted) {
    return <div className="w-64 bg-background border-r border-border"></div>;
  }

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
                {/* Logo */}
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1">
                  <span className="font-mono">Your Money,</span>
                  <span className="font-sans italic"> Your Way</span>
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
                             (item.href === '/' && pathname === '/dashboard') ||
                             (item.subItems && item.subItems.some(subItem => 
                               pathname === `/dashboard${item.href}${subItem.href}`));
              
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isSubMenuOpen = openSubMenus[index] || false;

              return (
                <li key={index}>
                  <div className="flex flex-col">
                    <Link
                      href={hasSubItems ? '#' : `/dashboard${item.href}`}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                        "group relative",
                        isCollapsed ? "justify-center" : "",
                        isActive 
                          ? "bg-muted text-foreground" 
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      )}
                      onClick={(e) => {
                        if (hasSubItems) {
                          e.preventDefault();
                          toggleSubMenu(index);
                        }
                      }}
                    >
                      <span className={cn(
                        "transition-colors",
                        isActive ? item.color : "text-muted-foreground",
                      )}>
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <>
                          <span className={cn(
                            "font-medium flex-1",
                            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                          )}>
                            {item.label}
                          </span>
                          {hasSubItems && (
                            <ChevronRight className={cn(
                              "h-4 w-4 transition-transform",
                              isSubMenuOpen ? "rotate-90" : ""
                            )} />
                          )}
                        </>
                      )}
                      {isCollapsed && hasSubItems && (
                        <div className="absolute left-full ml-6 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                          {item.label}
                        </div>
                      )}
                    </Link>
                    
                    {/* Sub-menu items */}
                    {!isCollapsed && hasSubItems && isSubMenuOpen && (
                      <ul className="pl-8 mt-1 space-y-1">
                        {item.subItems?.map((subItem, subIndex) => {
                          const isSubActive = pathname === `/dashboard${item.href}${subItem.href}`;
                          return (
                            <li key={subIndex}>
                              <Link
                                href={`/dashboard${item.href}${subItem.href}`}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm",
                                  isSubActive 
                                    ? "bg-muted/70 text-foreground" 
                                    : "hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                                )}
                              >
                                {subItem.label === "Upload Statement" && <FileText className="h-3.5 w-3.5" />}
                                {subItem.label === "Statement History" && <Calendar className="h-3.5 w-3.5" />}
                                {subItem.label === "Recommender" && <CreditCard className="h-3.5 w-3.5" />}
                                <span>{subItem.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
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
