export const AUTH = {
  LOGIN: "/auth/login",
  REFRESH: "/auth/refresh",
  UPDATE_PASSWORD: "/auth/update-password",
  PROFILE: "/auth/profile",
  LOGOUT: "/auth/logout",
  CHANGE_PASSWORD: "/auth/change-password",
  UPDATE_PROFILE: "/users",
};

export const CATEGORIES = {
  GET: "/categories/paginate",
  POST: "/categories",
  PUT: "/categories",
  DELETE: "/categories",
};

export const HR = {
  GET: "/admin-users/paginate",
  POST: "/admin-users",
  PUT: "/admin-users",
  DELETE: "/admin-users",
};

export const USER = {
  GET_ALL: "/users/paginate",
  GET_DETAIL: "/users",
};

export const DASHBOARD = {
  GET: "/dashboard",
  TOTAL: "/dashboard/total",
  CATEGORY: "/dashboard/top-category",
};

export const MEDIA = {
  PRESIGN: "/media-file/presign-url",
  GET: "/media-file",
  PUT: "/media-file/active",
};
