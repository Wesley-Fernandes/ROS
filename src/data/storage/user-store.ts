import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from 'firebase/auth';

interface props {
  data: User | null;
  setUser: (data: User) => void;
  removeUser: () => void;
}

export const userStore = create(
  persist<props>(
    (set) => ({
      data: null,
      removeUser: () => set({ data: null }),
      setUser: (user) => set({ data: user }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
