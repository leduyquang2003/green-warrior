import {
  ILoginRequestBody,
  IUpdateProfileForm,
  TChangePasswordBody,
} from "@/types/auth";
import { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, ref, string } from "yup";

export const defaultValues = {
  username: "",
  password: "",
};

export const loginResolver: Resolver<ILoginRequestBody> = yupResolver(
  object({
    username: string()
      .required("Vui lòng nhập tên người dùng!")
      .trim("Tên người dùng chứa khoảng trắng không hợp lệ!"),
    password: string()
      .required("Vui lòng nhập mật khẩu!")
      .trim("Mật khẩu chứa khoảng trắng không hợp lệ!"),
  })
);

export const defaultValuesReset = {
  newPassword: "",
  confirmPassword: "",
};

export const changeResolver: Resolver<TChangePasswordBody> = yupResolver(
  object({
    confirmPassword: string()
      .oneOf([ref("newPassword"), ""], "Mật khẩu phải trùng khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
    newPassword: string()
      .required("Mật khẩu là bắt buộc")
      .trim("Mật khẩu chứa khoảng trắng không hợp lệ!"),
    oldPassword: string().required("Mật khẩu là bắt buộc"),
  })
);

export const profileResolver: Resolver<IUpdateProfileForm> = yupResolver(
  object({
    fullname: string()
      .required("Họ tên không được để trống")
      .min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: string()
      .required("Email không được để trống")
      .email("Email không hợp lệ"),
    dateOfBirth: string()
      .required("Ngày sinh không được để trống")
      .max(new Date().getTime(), "Ngày sinh không được lớn hơn ngày hiện tại"),
    address: string()
      .required("Địa chỉ không được để trống")
      .min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  })
);
