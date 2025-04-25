"use client"
import { useAuth } from '@/hooks/useAuth';
import LoadingAuth from '@/components/LoadingAuth';
import { redirect } from 'next/navigation';

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

  return <>{children}</>;
}