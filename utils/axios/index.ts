/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { logOut, refresh } from "@/api/auth.api";
import { useAuthStore } from "@/zustand";
import axios from "axios";

const { logout, updateToken } = useAuthStore.getState();

export const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let isRefreshing = false;
const failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  while (failedQueue.length) {
    const { resolve, reject } = failedQueue.shift()!;
    if (token) {
      resolve(token);
    } else {
      reject(error);
    }
  }
};

const redirectToLogin = () => {
  logout();
  window.location.href = "/login";
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401) {
      if (originalRequest.url?.includes("/refresh")) {
        redirectToLogin();
        return Promise.reject(error);
      }

      if (!originalRequest?._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await refresh();
          const newToken = data.data.accessToken;

          updateToken(newToken);

          instance.defaults.headers.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          processQueue(null, newToken);

          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          redirectToLogin();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string) => {
  if (token) {
    instance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.Authorization;
  }
};

export const tryLogout = async () => {
  try {
    await logOut();
  } catch (error: unknown) {
    console.error("Failed to log out:", error);
  } finally {
    logout();
    redirectToLogin();
  }
};
