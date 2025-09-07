import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { IMUpdateCategoryDialog } from "./types";
import CInput from "@/commons/componnents/controls/CInput";
import { IUpdateStaffForm } from "@/types/hr-management";
import { updateStaff } from "@/api/hr-management.api";
import { Switch } from "@/components/ui/switch";
import { defaultValuesUpdateStaff } from "../../form/validate";
import { useTranslations } from "next-intl";

const MUpdateStaffDialog = ({
  open,
  onSetOpen,
  value,
  refetch,
}: IMUpdateCategoryDialog) => {
  const t = useTranslations();

  const { control, handleSubmit } = useForm<IUpdateStaffForm>({
    mode: "all",
    // resolver: categoryResolver,
    defaultValues: value || defaultValuesUpdateStaff,
  });

  const onSubmit = async (values: IUpdateStaffForm) => {
    try {
      const res = await updateStaff(value?.id || "", {
        ...values,
        status: values.status ? 1 : 0,
      });

      if (res.data.status) {
        toast.success("Cập nhật tài khoản thành công");
        onSetOpen();
        refetch();
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          t(error.response?.data?.errorCode) || "Cập nhật tài khoản thất bại"
        );
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onSetOpen}>
        <DialogContent className="max-h-full w-[600px] max-w-full overflow-auto">
          <DialogHeader>
            <DialogTitle>
              <div className=" text-primary font-semibold text-2xl">
                Cập nhật thông tin tài khoản
              </div>
            </DialogTitle>
          </DialogHeader>

          <div>
            <div className="my-5 grid gap-4 md:grid-cols-2">
              <Controller
                name="fullname"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
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
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
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

              <Controller
                name="username"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <CInput
                    label="Tên đăng nhập"
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
                  Trạng thái
                </div>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Switch checked={value} onCheckedChange={onChange} />
                  )}
                />
              </div>
            </div>
            <div className=" flex gap-4 mt-3 justify-end">
              <Button variant={"secondary"} onClick={onSetOpen}>
                HỦY
              </Button>
              <Button onClick={handleSubmit(onSubmit)}>LƯU</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MUpdateStaffDialog;
