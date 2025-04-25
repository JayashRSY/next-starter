"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const router = useRouter();
  const {user} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setAuthData } = useUserStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would connect to Supabase
      // For demo purposes, we'll simulate a successful login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast(`Login failed: ${error.message}`);
        return;
      }
      setAuthData(data);
      setUser(data.user);
      // Redirect to dashboard after successful login
      toast("Login successful");
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }
  , [user, router]);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/40">
      <div className="w-full max-w-md space-y-8 p-8 bg-background rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Wealth Wings</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;