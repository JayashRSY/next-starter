import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

type UserState = {
    authData: unknown;
    user: User | null,
    setUser: (user: User | null) => void;
    setAuthData: (authData: unknown) => void;
    logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    authData: false,
    user: null,
    setUser: (user: User | null) => set({ user }),
    setAuthData: (authData) => set({ authData }),
    logout: () => set({ authData: null, user: null }),
}));
