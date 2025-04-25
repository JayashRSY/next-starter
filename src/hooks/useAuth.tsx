import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
        setUser(null);
      } else {
        setUser(user);
      }

      setLoading(false);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        router.push('/login'); // Redirect to login page on sign out
      } else if (session?.user) {
        setUser(session?.user);
      }
    });

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, [router]);

  return { user, loading };
};

export default useAuth;