import {
  TGetCategoriesResponse,
  TCreateCategoryBody,
} from "@/types/categories";
import { IPaginateData } from "@/types/response";
import { get, post, put, remove } from "@/utils/axios/request";
import { CATEGORIES } from "./url.api";
import { AxiosResponse } from "axios";
import { TPaginateRequest } from "@/types/request";

export const getCategories = (
  params: TPaginateRequest
): Promise<AxiosResponse<IPaginateData<TGetCategoriesResponse[]>>> => {
  return get(CATEGORIES.GET, { params: params });
};

export const createCategory = (body: TCreateCategoryBody) => {
  return post(CATEGORIES.POST, body);
};

export const updateCAtegory = (id: string, body: TCreateCategoryBody) => {
  return put(`${CATEGORIES.PUT}/${id}`, body);
};

export const deleteCategory = (id: string) => {
  return remove(`${CATEGORIES.DELETE}/${id}`);
};
