import { changePass } from "@/api/auth.api";
import CInputPassword from "@/commons/componnents/controls/CInputPassword";
import { Button } from "@/components/ui/button";
import { TChangePasswordBody } from "@/types/auth";
import axios from "axios";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { changeResolver } from "../form/validate";

const MChangePassword = () => {
  const t = useTranslations();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: changeResolver,
  });

  const onSubmit = async (values: TChangePasswordBody) => {
    try {
      const res = await changePass(values);

      if (res) {
        reset();
        toast.success("Đổi mật khẩu thành công!");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t(error.response?.data?.message));
      }
    }
  };

  return (
    <div className="mt-3 min-w-96 rounded-[0.5rem] bg-white p-7 text-header">
      <div className="flex flex-col gap-4">
        <div className="mb-6 text-center text-2xl font-semibold uppercase">
          Đổi mật khẩu
        </div>

        <div>
          <div className="text-xs font-semibold"> Mật khẩu hiện tại</div>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field, fieldState: { error } }) => (
              <>
                <CInputPassword {...field} />
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
          <div className="text-xs font-semibold"> Mật khẩu mới</div>
          <Controller
            control={control}
            name="newPassword"
            render={({ field, fieldState: { error } }) => (
              <>
                <CInputPassword {...field} />
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
          <div className="text-xs font-semibold">Nhập lại mật khẩu mới</div>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { error } }) => (
              <>
                <CInputPassword {...field} />
                {!!error && (
                  <span className="text-xs italic text-[#E6533C]">
                    {error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <Button className="mt-4" onClick={handleSubmit(onSubmit)}>
          Đổi mật khẩu
        </Button>
      </div>
    </div>
  );
};

export default MChangePassword;
