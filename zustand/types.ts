/* eslint-disable no-unused-vars */
import { IProfileResponse } from "@/types/auth";
import { TDashboardRequest } from "@/types/dashboard";

export interface AuthState {
  isLoggedIn: boolean;
  user: IProfileResponse | null;
  login: (user: IProfileResponse) => void;
  logout: () => void;
  token: null | string;
  updateToken: (newToken: string) => void;
}

export interface DashboardState {
  filter: TDashboardRequest | null;
  setFilter: (newFilter: TDashboardRequest) => void;
}
