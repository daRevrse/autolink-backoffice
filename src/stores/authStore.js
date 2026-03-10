import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isVerifying2FA: false,

      login: (userData, token) => set({ 
        user: userData, 
        token, 
        isAuthenticated: false, // On attend le 2FA
        isVerifying2FA: true 
      }),

      verify2fa: () => set({ 
        isAuthenticated: true, 
        isVerifying2FA: false 
      }),

      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        isVerifying2FA: false 
      }),
    }),
    {
      name: 'autolink-auth',
    }
  )
);
