"use client";

import { updaetProfile } from "@/api/auth.api";

import CInput from "@/commons/componnents/controls/CInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IProfileResponse, IUpdateProfileForm } from "@/types/auth";
import axios from "axios";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BirthdateInput from "./birthdayInput";
import { profileResolver } from "../../form/validate";
import MUploadImage from "../MUploadImage";

import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const MProfileModal = ({
  open,
  onOpen,
  user,
  refetch,
}: {
  open: boolean;
  onOpen: () => void;
  user: IProfileResponse;
  refetch: () => void;
}) => {
  const t = useTranslations();

  const { control, handleSubmit } = useForm<IUpdateProfileForm>({
    mode: "all",
    resolver: profileResolver,
    defaultValues: {
      ...user,
      dateOfBirth: user.dateOfBirth
        ? dayjs(user.dateOfBirth).format("DD/MM/YYYY")
        : undefined,
    },
  });

  const onSubmit = async (values: IUpdateProfileForm) => {
    try {
      const res = await updaetProfile({
        ...values,
        dateOfBirth: dayjs(values?.dateOfBirth, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        ),
      });

      if (res.data.status) {
        refetch();
        toast.success("Cập nhật thông tin thành công");
        onOpen();
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t(error.response?.data?.errorCode));
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="max-h-full w-max max-w-full overflow-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="w-full font-inter">
          <div className="mb-6 grid w-96 grid-cols-1 gap-4 max-w-full relative z-[100]">
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
              name="dateOfBirth"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <BirthdateInput
                  label="Sinh nhật"
                  requried
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CInput
                  label="Địa chỉ"
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
              name="avatarId"
              control={control}
              render={({ field: { onChange } }) => (
                <MUploadImage setImageId={onChange} />
              )}
            />

            <div className=" flex gap-4 mt-3 justify-end">
              <Button variant={"secondary"} onClick={onOpen}>
                HỦY
              </Button>
              <Button onClick={handleSubmit(onSubmit)}>LƯU</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MProfileModal;
