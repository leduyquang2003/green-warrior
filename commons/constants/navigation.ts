import { CATEGORY_URL, DASHBOARD_URL, HR_STAFF_URL, USERS_URL } from "./url";

export const NAVIGATION = [
  {
    label: "Dashboard",
    icon: "fa-solid fa-chart-line",
    path: DASHBOARD_URL,
  },
  {
    label: "Danh sách người dùng",
    icon: "fa-solid fa-user",
    path: USERS_URL,
  },
  {
    label: "Quản lý tài khoản admin",
    icon: "fa-solid fa-user-secret",
    path: HR_STAFF_URL,
  },
  {
    label: "Quản lý danh mục công việc",
    icon: "fa-solid fa-list",
    path: CATEGORY_URL,
  },
];
