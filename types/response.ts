import { AxiosResponse } from "axios";

export type IApiResponse<T, E = any> = AxiosResponse<IDataResponse<T>, E>;

export interface IDataResponse<T> {
  data: T;
  errorCode: null | string;
  status: boolean | number;
}

export interface IPaginateData<T> {
  data: T;
  metadata: {
    size: number;
    page: number;
    lastPage: number;
    next: boolean;
    cursor: string;
  };
  errorCode: null | string;
  status: boolean | number;
}
