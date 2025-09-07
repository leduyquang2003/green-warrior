"use client";
import { LOGIN_URL, PROFILE_URL } from "@/commons/constants/url";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CAvatar from "../CAvatar";

import { logOut } from "@/api/auth.api";
import { useAuthStore } from "@/zustand";

const CHeader = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const { logout, user } = useAuthStore();

  const onLogout = async () => {
    try {
      const res = await logOut();

      if (res) {
        logout();
        router.replace(LOGIN_URL);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex h-16 items-center justify-end gap-5 bg-white px-4 ">
      <div className="relative flex h-full items-center">
        <div
          className="flex items-center text-[#536485] cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <CAvatar name={user?.fullname} avatar={user?.avatar} />
          <div>
            <div className="cursor-pointer text-sm font-semibold">
              {user?.fullname}
            </div>
            {/* <div className="text-[11px] font-normal">{user?.sale}</div> */}
          </div>

          {open && (
            <div
              ref={menuRef}
              className="absolute right-0 top-full z-40 mt-2 w-max rounded-md bg-white text-[#383853] shadow-lg text-sm"
            >
              <a
                href={PROFILE_URL}
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-main-foreground hover:text-main-default"
              >
                <i className="fa-regular fa-circle-user mr-2"></i>
                Thông tin cá nhân
              </a>
              <div className="border-t border-gray-200"></div>
              <a
                href=""
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-main-foreground hover:text-main-default text-sm"
                onClick={onLogout}
              >
                <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                Đăng xuất
              </a>
            </div>
          )}
        </div>
      </div>
      <div>
        <i className="fa-regular fa-gear animate-spin cursor-pointer"></i>
      </div>
    </div>
  );
};

export default CHeader;
