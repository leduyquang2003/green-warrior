/* eslint-disable no-unused-vars */
"use client";

import CMenuItem from "./menuItem";
import { NAVIGATION } from "@/commons/constants/navigation";
import CMenuResponsive from "./menuResponsive";

// eslint-disable-next-line no-unused-vars
const CSidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-40 w-max">
      <div className="group">
        {isOpen ? (
          <div className="hidden h-max w-[250px] bg-white md:block">
            <div className="fixed left-0 top-0 h-screen w-[240px] overflow-y-auto bg-white">
              <div className="fixed flex h-16 w-[240px] justify-center border-b-[0.5px] bg-white">
                <div className=" flex  justify-center bg-white  items-center font-bold text-primary text-2xl">
                  MIJO
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-20">
                {NAVIGATION?.map((item, index) => (
                  <CMenuItem key={index} data={item} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-max min-w-20 bg-white">
            <div className="fixed left-0 top-0 h-screen w-[79px] overflow-y-auto bg-white group-hover:hidden">
              <div className="fixed flex h-16 w-[79px] justify-center border-b-[0.5px] bg-white"></div>
              <div className="flex flex-col gap-2 pt-20">
                {NAVIGATION?.map((item, index) => (
                  <CMenuResponsive key={index} data={item} />
                ))}
              </div>
            </div>
            <div className="fixed left-0 top-0 z-20 hidden h-screen w-[240px] overflow-y-auto bg-white group-hover:block">
              <div className="fixed flex h-16 w-[240px] justify-center border-b-[0.5px] bg-white">
                <div className="mx-3 my-3 flex w-1/2 justify-center bg-white py-2 font-bold">
                  MIJO
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-20">
                {NAVIGATION?.map((item, index) => (
                  <CMenuItem key={index} data={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className="absolute -right-7 top-5 cursor-pointer group-hover:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <i className="fa-sharp fa-regular fa-align-left"></i>
        ) : (
          <i className="fa-sharp-duotone fa-solid fa-xmark"></i>
        )}
      </div>
    </div>
  );
};

export default CSidebar;
