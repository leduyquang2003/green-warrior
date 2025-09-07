import { get, post, put, remove } from "@/utils/axios/request";
import { HR } from "./url.api";
import { AxiosResponse } from "axios";
import { IPaginateData } from "@/types/response";
import { TPaginateRequest } from "@/types/request";
import {
  TCreateStaffBody,
  TGetStaffsResponse,
  TUpdateStaffBody,
} from "@/types/hr-management";

export const getStaffs = (
  params: TPaginateRequest
): Promise<AxiosResponse<IPaginateData<TGetStaffsResponse[]>>> => {
  return get(HR.GET, { params: params });
};

export const createStaff = (body: TCreateStaffBody) => {
  return post(HR.POST, body);
};

export const updateStaff = (id: string, body: TUpdateStaffBody) => {
  return put(`${HR.PUT}/${id}`, body);
};

export const deleteStaff = (id: string) => {
  return remove(`${HR.DELETE}/${id}`);
};
