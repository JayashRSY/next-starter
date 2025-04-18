import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

type UserState = {
    isAuthenticated: boolean;
    user: User | null,
    setUser: (user: User | null) => void;
    setAuthenticated: (isAuthenticated: boolean) => void;
    logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user: User | null) => set({ user }),
    setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    logout: () => set({ isAuthenticated: false, user: null }),
}));
