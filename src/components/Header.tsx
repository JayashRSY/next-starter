"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
// import { User } from "lucide-react"; // Import the User icon from Lucide
import { supabase } from "@/lib/supabase";
import useAuth from "@/hooks/useAuth";
// import Image from "next/image";
// import ThemeButton from "./ThemeButton";

const Header = () => {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg--background">
      {/* Logo */}
      <div className="text-xl font-bold text--muted">Wealth Wings</div>

      {/* Navigation */}
      <nav>
        {user ? (
          <div className="flex items-center space-x-4">
            {/* Theme Button */}
            {/* <ThemeButton /> */}
            {/* Profile Icon */}
            {/* <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg--secondary rounded-md hover:bg-gray-200">
              {user.user_metadata.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <User className="w-6 h-6 text-gray-500" /> // Use Lucide's User icon as fallback
              )}
            </div> */}

            {/* Logout Button */}
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                  console.error(error);
                } else {
                  router.push("/login");
                }
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
            {/* Signup Button */}
            <Button
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
