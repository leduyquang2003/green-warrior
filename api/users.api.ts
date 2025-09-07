import { TPaginateRequest } from "@/types/request";
import { get } from "@/utils/axios/request";
import { AxiosResponse } from "axios";
import { USER } from "./url.api";
import { IApiResponse, IPaginateData } from "@/types/response";
import {
  TGetAcceptanceResponse,
  TGetPostedResponse,
  TGetRatingResponse,
  TGetTransactionResponse,
  TGetUserDetailResponse,
  TGetUsersResponse,
} from "@/types/users";

export const getUsers = (
  params: TPaginateRequest
): Promise<AxiosResponse<IPaginateData<TGetUsersResponse[]>>> => {
  return get(USER.GET_ALL, { params: params });
};

export const getTransaction = (
  params: TPaginateRequest,
  id: string
): Promise<AxiosResponse<IPaginateData<TGetTransactionResponse[]>>> => {
  return get(`${USER.GET_DETAIL}/${id}/transaction-paginate`, {
    params: params,
  });
};

export const getAcceptance = (
  params: TPaginateRequest,
  id: string
): Promise<AxiosResponse<IPaginateData<TGetAcceptanceResponse[]>>> => {
  return get(`${USER.GET_DETAIL}/${id}/hired-paginate`, {
    params: params,
  });
};

export const getPosted = (
  id: string
): Promise<IApiResponse<TGetPostedResponse[]>> => {
  return get(`${USER.GET_DETAIL}/${id}/posted`);
};

export const getUserDetail = (
  id: string
): Promise<IApiResponse<TGetUserDetailResponse>> => {
  return get(`${USER.GET_DETAIL}/${id}`);
};

export const getRating = (
  id: string
): Promise<IApiResponse<TGetRatingResponse[]>> => {
  return get(`${USER.GET_DETAIL}/${id}/rating`);
};
