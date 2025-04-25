"use client";

import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useUser = () => {
  const { setUser } = useUserStore();

  return useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw new Error(error.message);
      return data.user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    onSuccess: (user: User | null) => {
      setUser(user);
    },
  });
};
