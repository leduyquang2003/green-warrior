import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface ICMenuItem {
  label: string;
  icon?: string;
  path: string;
  subItem?:
    | {
        label: string;
        path: string;
        subItem?:
          | {
              label: string;
              path: string;
            }[]
          | undefined;
      }[]
    | undefined;
}

const CMenuItem = ({ data, child }: { data: ICMenuItem; child?: boolean }) => {
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
    <div className={cn("mt-1 w-full", child ? "pl-3" : "px-3")}>
      <div
        className={cn(
          " flex w-full cursor-pointer items-center justify-between rounded-[0.5rem] p-3 text-sm font-medium hover:bg-[#F8F8F8]",
          path.includes(data.path) && "bg-[#F8F8F8]"
        )}
        onClick={handleClick}
      >
        <div className="flex items-start">
          <i className={`${data.icon} mr-2 text-[1.15rem]`}></i>
          <span>{data.label}</span>
        </div>

        {data?.subItem && (
          <div>
            {open ? (
              <i className="fa-solid fa-chevron-down text-[12px]"></i>
            ) : (
              <i className="fa-solid fa-chevron-right text-[12px]"></i>
            )}
          </div>
        )}
      </div>
      {open && data?.subItem && (
        <div>
          {data?.subItem.map((item, index) => (
            <div
              key={index}
              className={cn(
                !child && "pl-7",
                item?.subItem && "pl-1",
                child && "pl-2"
              )}
            >
              {item.subItem ? (
                <CMenuItem data={item} child />
              ) : (
                <div
                  className={cn(
                    "my-1 flex cursor-pointer items-center rounded-[0.5rem] px-2 py-2  text-xs font-medium hover:bg-[#F8F8F8]",
                    path.includes(item.path) && "bg-[#F8F8F8]"
                  )}
                  onClick={() => push(item.path)}
                >
                  <i className="fa-regular fa-circle mr-2 text-[0.3rem]"></i>
                  <div> {item.label}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CMenuItem;
