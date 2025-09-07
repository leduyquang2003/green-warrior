export type TGetStaffsResponse = {
  id: string;
  fullname: string;
  username: string;
  email: string;
  status: number;
};

export type TCreateStaffBody = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

export type TUpdateStaffBody = {
  fullname: string;
  email: string;
  status: number;
};

export interface ICreateStaffForm {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirm: string;
}

export interface IUpdateStaffForm {
  fullname: string;
  email: string;
  status: boolean;
  username: string;
  id: string;
}
