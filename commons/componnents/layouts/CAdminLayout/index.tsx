"use client";

// import { profile } from '@/api/auth.api';
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CSidebar from "../CSidebar";
import CHeader from "../CHeader";
import { LOGIN_URL } from "@/commons/constants/url";
import { useAuthStore } from "@/zustand";
import { profile } from "@/api/auth.api";

const CAdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isOpen, setIsOpen] = useState(true);

  const { isLoggedIn, login, logout } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await profile();

        login({ ...res.data?.data });
      } catch (error) {
        logout();
        console.error("Error fetching profile:", error);
      }
    };

    init();
  }, [login, logout]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(LOGIN_URL);
    } else {
      router.replace("");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <>
        <div className="">
          <CSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <CHeader />
          <div
            className={cn(
              "p-6 lg:p-8 transition-[margin,width] duration-300 ease-out",
              isOpen ? "md:ml-[240px]" : "ml-[79px]"
            )}
          >
            {children}
          </div>
        </div>
      </>
    </>
  );
};

export default CAdminLayout;
