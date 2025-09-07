import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthState, DashboardState } from "./types";
import { TDashboardRequest } from "@/types/dashboard";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
      token: null,
      updateToken: (newToken: string) => set({ token: newToken }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useDasboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      filter: null,
      setFilter: (newToken: TDashboardRequest) => set({ filter: newToken }),
    }),
    {
      name: "dashboard-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
