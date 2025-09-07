import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface ICMenuResponsive {
  label: string;
  icon: string;
  path: string;
  subItem?:
    | {
        label: string;
        path: string;
      }[]
    | undefined;
}

const CMenuResponsive = ({ data }: { data: ICMenuResponsive }) => {
  const { push } = useRouter();

  const path = usePathname();

  const [open, setOpen] = useState(false || path.includes(data.path));

  const handleClick = () => {
    if (data.subItem) {
      setOpen(!open);
    } else {
      push(data.path);
    }
  };

  return (
    <div className=" px-3 w-full">
      <div
        className={cn(
          " flex  p-3 w-full justify-center text-sm  hover:bg-[#F8F8F8] font-medium  rounded-[0.5rem] items-center cursor-pointer",
          path.includes(data.path) && " bg-[#F8F8F8]"
        )}
        onClick={handleClick}
      >
        <i className={`${data.icon} text-[1.15rem] `}></i>
      </div>
      {data?.subItem && (
        <div className=" flex justify-center items-center p-3">
          <i className="fa-regular fa-circle text-[0.3rem] "></i>
        </div>
      )}
    </div>
  );
};

export default CMenuResponsive;
