import { IApiResponse } from "@/types/response";
import { get } from "@/utils/axios/request";
import { DASHBOARD } from "./url.api";
import {
  TDashboardCategoryResponse,
  TDashboardRequest,
  TDashboardResponse,
  TDashboardToTalResponse,
} from "@/types/dashboard";

export const getDashboards = (
  params: TDashboardRequest
): Promise<IApiResponse<TDashboardResponse>> => {
  return get(DASHBOARD.GET, { params: params });
};

export const getDashboardTotal = (): Promise<
  IApiResponse<TDashboardToTalResponse>
> => {
  return get(DASHBOARD.TOTAL);
};

export const getDashboardCategory = (): Promise<
  IApiResponse<TDashboardCategoryResponse[]>
> => {
  return get(DASHBOARD.CATEGORY);
};
