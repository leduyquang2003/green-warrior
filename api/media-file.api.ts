import { IApiResponse } from "@/types/response";
import { instance } from "@/utils/axios";
import { MEDIA } from "./url.api";
import {
  TGetUrlResponse,
  TPresignUrlRequest,
  TPresignUrlResponse,
} from "@/types/media-file";

export const getPresignUrl = (
  body: TPresignUrlRequest
): Promise<IApiResponse<TPresignUrlResponse>> => {
  return instance.post(MEDIA.PRESIGN, body);
};

export const getImage = (
  id: string
): Promise<IApiResponse<TGetUrlResponse>> => {
  return instance.get(`${MEDIA.GET}/${id}`);
};

export const setActive = (id: string): Promise<IApiResponse<string>> => {
  return instance.put(`${MEDIA.PUT}/${id}`);
};
