"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function PageBreadcrumb() {
  const pathname = usePathname();
  
  // Skip breadcrumb on main dashboard
  if (pathname === "/dashboard") {
    return null;
  }
  
  // Split the path into segments
  const segments = pathname.split("/").filter(Boolean);
  
  // Create breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    
    // Format the segment for display (capitalize and replace hyphens with spaces)
    const formattedSegment = segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    return {
      href,
      label: formattedSegment,
      isLast,
    };
  });

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        
        {breadcrumbItems.map((item) => (
          <BreadcrumbItem key={item.href}>
            {item.isLast ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}