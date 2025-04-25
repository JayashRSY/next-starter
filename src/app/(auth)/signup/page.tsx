"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";

const Signup = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        toast(`Signup failed: ${error.message}`);
        return;
      }
      setIsModalOpen(true); // Open the modal
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const openMailbox = () => {
    window.location.href = `mailto:${email}`;
    setIsModalOpen(false);
    router.push("/login"); // Redirect to login page after opening the email client
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/40">
      <div className="w-full max-w-md space-y-8 p-8 bg-background rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Wealth Wings</h1>
          <p className="text-muted-foreground mt-2">Create your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify Your Email</DialogTitle>
              <DialogDescription>
                A verification email has been sent to <strong>{email}</strong>.
                Please check your inbox and verify your email address to
                complete the registration process.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={openMailbox} className="mt-4">
              Open Mailbox
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Signup;
