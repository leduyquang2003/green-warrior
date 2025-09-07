import { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, ref, string } from "yup";
import { ICreateStaffForm, IUpdateStaffForm } from "@/types/hr-management";

export const defaultValuesCreateStaff: ICreateStaffForm = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirm: "",
};

export const defaultValuesUpdateStaff: IUpdateStaffForm = {
  fullname: "",
  email: "",
  status: false,
  username: "",
  id: "",
};

export const createStaffResolver: Resolver<ICreateStaffForm> = yupResolver(
  object({
    fullname: string().required("Vui lòng nhập họ tên!"),
    username: string().required("Vui lòng nhập tên đăng nhập!"),
    email: string()
      .required("Vui lòng nhập email!")
      .email("Email không đúng định dạng!"),
    password: string().required("Vui lòng nhập mật khẩu!"),
    confirm: string()
      .required("Vui lòng nhập lại mật khẩu!")
      .oneOf([ref("password")], "Mật khẩu xác nhận không khớp!"),
  })
);
