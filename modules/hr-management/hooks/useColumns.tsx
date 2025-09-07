import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import CStatus from "@/commons/componnents/others/CStatus";
import { Button } from "@/components/ui/button";
import { IColumnHr } from "./types";
import { TGetStaffsResponse } from "@/types/hr-management";

export const useColumns = ({ onClickEdit, onDelete }: IColumnHr) => {
  const columns = useMemo(
    (): ColumnDef<TGetStaffsResponse>[] => [
      {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("index")}</div>
        ),
      },
      {
        accessorKey: "fullname",
        header: "Họ tên",
      },
      {
        accessorKey: "username",
        header: "Tên đăng nhập",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => (
          <div className="text-center">
            <CStatus status={row.getValue("status")} />
          </div>
        ),
      },
      {
        id: "actions",
        header: "Thao tác",
        cell: ({ row }) => {
          return (
            <div className="flex justify-center">
              <Button
                variant={"ghost"}
                className="h-max px-2 py-1 hover:bg-none"
                onClick={() => onClickEdit(row)}
              >
                <i className="fa-sharp fa-regular fa-pen-line text-[#49B6F5]"></i>
              </Button>
              <Button
                variant={"ghost"}
                className="h-max px-2 py-1"
                onClick={() => onDelete(row.original.id)}
              >
                <i className="fa-solid fa-trash-can text-[#E6533C]"></i>
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  return columns;
};
