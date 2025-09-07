"use client";

//#region Import

import Image from "next/image";
import users from "../../../assets/img/user.png";
import MChangePassword from "./changePassword";
import { useAuthStore } from "@/zustand";
import { useEffect, useState } from "react";
import MProfileModal from "../components/MProfileModal";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { profile } from "@/api/auth.api";

//#endregion

const MProfilePage = () => {
  //#region Data

  const { user, login } = useAuthStore();

  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profile(),
  });

  const [open, setOpen] = useState<boolean>(false);

  //#endregion

  //#region Events

  //#endregion

  //#region Others

  useEffect(() => {
    login({
      id: data?.data.data.id || "",
      fullname: data?.data.data.fullname || "",
      email: data?.data.data.email || "",
      dateOfBirth: data?.data.data.dateOfBirth || "",
      address: data?.data.data.address || "",
      avatarId: data?.data.data.avatarId || "",
      avatar: data?.data.data.avatar || "",
    });
  }, [data]);

  //#endregion

  //#region Render

  return (
    <div className="flex justify-center">
      <div className="min-w-96 rounded-lg">
        <div className="relative w-full rounded-t-lg bg-primary bg-profile bg-cover bg-no-repeat p-6">
          <div className="absolute inset-0 rounded-t-lg bg-primary opacity-50"></div>
          <div
            className="absolute right-1 top-1 cursor-pointer rounded-lg bg-white px-3 py-2"
            onClick={() => setOpen(true)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
          <div className="relative z-10 flex gap-4">
            {user?.avatar != null ? (
              <Image
                src={user?.avatar || users}
                alt=""
                width={80}
                height={80}
                className="h-20 w-20 rounded-full bg-slate-300 object-cover"
              />
            ) : (
              <Image
                src={users || ""}
                alt=""
                width={80}
                height={80}
                className="h-20 w-20 rounded-full bg-slate-300 object-cover"
              />
            )}

            <div className="text-white">
              <div className="mt-3 text-base font-semibold">
                {user?.fullname}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-b-lg bg-white p-6 text-xs text-[#8C9097]">
          <div className="text-base font-semibold text-header">
            Thông tin liên hệ:
          </div>
          <div className="flex items-center">
            <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-50">
              <i className="fa-light fa-envelope"></i>
            </span>
            {user?.email}
          </div>
          <div className="flex items-center">
            <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-50">
              <i className="fa-solid fa-cake-candles"></i>
            </span>
            {user?.dateOfBirth && dayjs(user?.dateOfBirth).format("DD/MM/YYYY")}
          </div>
          <div className="flex items-center">
            <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-50">
              <i className="fa-sharp fa-light fa-location-dot"></i>
            </span>
            {user?.address}
          </div>
        </div>
        <MChangePassword />
      </div>
      {user && (
        <MProfileModal
          open={open}
          onOpen={() => setOpen(!open)}
          user={user}
          refetch={refetch}
        />
      )}
    </div>
  );

  //#endregion
};

export default MProfilePage;
