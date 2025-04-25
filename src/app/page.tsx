"use client";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const features = [
  {
    title: "Ongoing 1-on-1 Financial Guidance",
    description:
      "Receive personalized advice and support to navigate your financial journey.",
  },
  {
    title: "Build an Investment Roadmap",
    description:
      "Create a tailored investment strategy that aligns with your financial goals.",
  },
  {
    title: "Personalized Credit Card Match",
    description:
      "Find the best credit card options that suit your spending habits and needs.",
  },
  {
    title: "Ready for Emergencies",
    description:
      "Prepare for unexpected expenses with a solid emergency fund strategy.",
  },
  {
    title: "Effective Tax Savings Plan",
    description:
      "Maximize your savings with a comprehensive tax strategy tailored to your situation.",
  },
  {
    title: "Daily Financial Habits",
    description:
      "Develop and maintain healthy financial habits for long-term success.",
  },
];

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Your Financial Future
      </h1>
      <p className="text-lg text-center mb-12">
        What can you expect from our services?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
      <Button
        className="mt-8"
        onClick={() => {
          router.push("/login");
        }}
      >
        Get Started
      </Button>
    </div>
  );
}
