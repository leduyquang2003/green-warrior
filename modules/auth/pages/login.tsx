"use client";

import { logIn, profile } from "@/api/auth.api";
import CInputPassword from "@/commons/componnents/controls/CInputPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ILoginRequestBody } from "@/types/auth";
import { Controller, useForm } from "react-hook-form";
import { defaultValues, loginResolver } from "../form/validate";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "@/zustand";
import { useTranslations } from "next-intl";
import { setAuthToken } from "@/utils/axios";
import { DASHBOARD_URL } from "@/commons/constants/url";

const MLogin = () => {
  const t = useTranslations();

  const { handleSubmit, control } = useForm<ILoginRequestBody>({
    resolver: loginResolver,
    defaultValues: defaultValues,
    mode: "all",
  });

  const { login } = useAuthStore();

  const router = useRouter();

  const onSubmit = async (values: ILoginRequestBody) => {
    try {
      const res = await logIn(values);

      if (res.data.status) {
        setAuthToken(res.data.data.accessToken);

        toast.success("Đăng nhập thành công");

        const res_profile = await profile();

        login({
          ...res_profile.data.data,
        });

        router.push(DASHBOARD_URL);
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t(`${error.response?.data?.errorCode}`));
      }
    }
  };

  return (
    <div className="h-full rounded-[0.5rem] bg-white p-12 text-header">
      <div className="flex h-full flex-col gap-6">
        <div className="mb-3 flex flex-col justify-center gap-2 text-center">
          <div className="text-2xl font-bold text-[#181C32]">
            {" "}
            Đăng nhập vào Mijo
          </div>
          <div className="text-sm font-light text-[#2E3660]">
            Kết nối nhu cầu và nguồn lực
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium"> Tài khoản</div>
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  placeholder="Tài khoản"
                  className="w-full md:w-80"
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
        <div>
          <div className="mb-2 text-sm font-medium">
            <div className=" "> Mật khẩu</div>
          </div>

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <>
                <CInputPassword {...field} placeholder="Mật khẩu" />
                {!!error && (
                  <span className="text-xs italic text-[#E6533C]">
                    {error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col items-center">
          <Button className="w-full" onClick={handleSubmit(onSubmit)}>
            Đăng nhập
          </Button>
          <div className=" text-xs font-normal text-[#444F8E] mt-3">
            Bằng cách đăng nhập, bạn đồng ý với <br />
            <a
              href="http://#"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Quyền riêng tư và Điều khoản
            </a>{" "}
            của chúng tôi
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLogin;
