export type TDashboardRequest = {
  from: string;
  to: string;
  groupBy: "monthly" | "daily" | "annual";
};

export type TDashboardResponse = {
  labels: string[];
  users: number[];
  posts: number[];
  tokens: number[];
  hires: number[];
};

export type TDashboardToTalResponse = {
  totalUsers: number;
  totalPosts: number;
  totalTokens: number;
};

export type TDashboardCategoryResponse = {
  id: string;
  name: string;
  countPosts: number;
};
