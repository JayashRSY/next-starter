"use client";

import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useUser = () => {
  const setUser = useUserStore((s) => s.setUser);

  return useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    onSuccess: (user: User | null) => {
      setUser(user);
    },
  });
};
