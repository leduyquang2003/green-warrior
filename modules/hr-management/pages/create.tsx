"use client";

import { Controller, useForm } from "react-hook-form";
import { ICreateStaffForm } from "@/types/hr-management";
import { createStaff } from "@/api/hr-management.api";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CInputPassword from "@/commons/componnents/controls/CInputPassword";
import CInput from "@/commons/componnents/controls/CInput";
import {
  createStaffResolver,
  defaultValuesCreateStaff,
} from "../form/validate";
import { useTranslations } from "next-intl";

const MCreateStaffPage = () => {
  const { back } = useRouter();

  const t = useTranslations();

  const { control, handleSubmit } = useForm<ICreateStaffForm>({
    mode: "all",
    resolver: createStaffResolver,
    defaultValues: defaultValuesCreateStaff,
  });

  //#region Events

  const onSubmit = async (values: ICreateStaffForm) => {
    try {
      const res = await createStaff({
        ...values,
      });

      if (res.data.status) {
        toast.success("Tạo tài khoản thành công");

        back();
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t(error.response?.data?.errorCode));
      }
    }
  };

  //#endregion

  return (
    <div>
      <div className=" flex justify-between mb-7">
        <div className=" text-primary font-semibold text-2xl">
          Thêm tài khoản
        </div>
      </div>
      <div className="rounded-lg bg-white p-5">
        <div className="my-5 grid gap-4 md:grid-cols-2">
          <Controller
            name="fullname"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CInput
                label="Họ tên"
                requried
                placeholder=""
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CInput
                label="Email"
                requried
                placeholder=""
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <div>
            <div className="mb-2 flex gap-1 text-sm font-medium text-header">
              <span>Mật khẩu</span>
              <span className="text-[#EE3F3F]">*</span>
            </div>

            <Controller
              name="password"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CInputPassword
                  placeholder="Mật khẩu"
                  requried
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>

          <Controller
            name="username"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <CInput
                  label="Tên đăng nhập"
                  requried
                  placeholder=""
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message}
                />
                {!!error && (
                  <span className="text-xs italic text-[#E6533C]">
                    {error.message}
                  </span>
                )}
              </>
            )}
          />

          <div>
            <div className="mb-2 flex gap-1 text-sm font-medium text-header">
              <span>Nhập lại mật khẩu</span>
              <span className="text-[#EE3F3F]">*</span>
            </div>

            <Controller
              name="confirm"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <CInputPassword
                    placeholder="Mật khẩu"
                    requried
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                  />
                  {!!error && (
                    <span className="text-xs italic text-[#E6533C]">
                      {error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className=" flex gap-4 mt-3 justify-end">
          <Button variant={"secondary"} onClick={back}>
            HỦY
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>LƯU</Button>
        </div>
      </div>
    </div>
  );
};

export default MCreateStaffPage;
