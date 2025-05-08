"use client"
import { useAuth } from '@/hooks/useAuth';
import LoadingAuth from '@/components/LoadingAuth';
import { redirect } from 'next/navigation';
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import LeftSideBar from '@/components/LeftSideBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingAuth />;
  }

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <LeftSideBar />
      <div className="flex-1 p-8">
        <PageBreadcrumb />
        {children}
      </div>
    </div>
  );
}