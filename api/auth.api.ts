import {
  ILoginRequestBody,
  ILoginResponse,
  IProfileResponse,
  IUpdateProfileForm,
  TChangePasswordBody,
} from "@/types/auth";

import { AUTH } from "./url.api";
import { IApiResponse } from "@/types/response";
import { get, post, put } from "@/utils/axios/request";

export const logIn = (
  body: ILoginRequestBody
): Promise<IApiResponse<ILoginResponse>> => {
  return post(AUTH.LOGIN, body);
};

export const profile = (): Promise<IApiResponse<IProfileResponse>> => {
  return get(AUTH.PROFILE);
};

export const refresh = (): Promise<IApiResponse<ILoginResponse>> => {
  return put(AUTH.REFRESH);
};

export const logOut = (): Promise<IApiResponse<string>> => {
  return put(AUTH.LOGOUT);
};

export const changePass = (body: TChangePasswordBody) => {
  return put(AUTH.CHANGE_PASSWORD, body);
};

export const updaetProfile = (
  body: IUpdateProfileForm
): Promise<IApiResponse<string>> => {
  return put(AUTH.UPDATE_PROFILE, body);
};
