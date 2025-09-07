"use client";

//#region Import

import CSearch from "@/commons/componnents/controls/CSearch";
import CPagination from "@/commons/componnents/others/CPagination";
import CTable from "@/commons/componnents/others/CTable";
import { HR_STAFF_CREATE_URL } from "@/commons/constants/url";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useColumns } from "../hooks/useColumns";
import { TPaginateRequest } from "@/types/request";
import { useQuery } from "@tanstack/react-query";
import { deleteStaff, getStaffs } from "@/api/hr-management.api";
import { confirm } from "@/utils/confirm";
import { toast } from "react-toastify";
import { Row } from "@tanstack/react-table";
import { IUpdateStaffForm, TGetStaffsResponse } from "@/types/hr-management";
import MUpdateStaffDialog from "../components/MUpdateStaffDialog";

//#endregion

const MStaffPage = () => {
  const { push } = useRouter();

  //#region Data

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  const [staff, setStaff] = useState<IUpdateStaffForm | null>(null);

  const [params, setParams] = useState<TPaginateRequest>({
    q: "",
    page: 1,
    size: 10,
  });

  const { data, refetch } = useQuery({
    queryKey: ["staffs", params],
    queryFn: () => getStaffs(params),
  });

  const staffs = useMemo(() => {
    const pageStartIndex = (params.page - 1) * params.size + 1;

    return data?.data?.data
      ? data?.data?.data?.map((item, index) => ({
          ...item,
          index: pageStartIndex + index,
        }))
      : [];
  }, [params.page, params.size, data?.data?.data]);

  //#endregion

  //#region Events

  const onClickEdit = (value: Row<TGetStaffsResponse>) => {
    setStaff({
      ...value.original,
      status: value.original.status == 1 ? true : false,
    });
    setOpenUpdate(true);
  };

  const handleClickCreate = () => {
    push(HR_STAFF_CREATE_URL);
  };

  const onDelete = async (id: string) => {
    const isConfirmed = await confirm({
      confirmation: "Bạn có chắc chắn muốn xóa tài khoản này?",
    });

    if (isConfirmed) {
      try {
        await deleteStaff(id);

        toast.success("Xoá thành công!");

        refetch();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Xoá thất bại!");
      }
    }
  };

  //#endregion

  //#region Render

  const columns = useColumns({ onClickEdit, onDelete });

  return (
    <div>
      <div className="rounded-lg bg-white">
        <div className="title relative flex-wrap items-center justify-between border-b px-5 py-4 text-base font-medium before:absolute before:h-4 before:bg-gradient-to-t before:from-orange-500 before:to-red-500 md:flex">
          <span> Quản lý tài khoản admin</span>
          <div className="flex gap-4 flex-wrap">
            <CSearch onSearch={(v: string) => setParams({ ...params, q: v })} />
            <Button onClick={handleClickCreate} variant={"outline"}>
              Thêm
            </Button>
          </div>
        </div>
        <div className="p-5">
          <CTable data={staffs || []} columns={columns} />
        </div>
        <div className="flex justify-end border-t px-5 py-4">
          <CPagination
            page={params.page}
            onChangePage={(n: number) => setParams({ ...params, page: n })}
            totalPages={data?.data?.metadata?.lastPage || 1}
          />
        </div>
      </div>

      {openUpdate && (
        <MUpdateStaffDialog
          open={openUpdate}
          onSetOpen={() => setOpenUpdate(!openUpdate)}
          value={staff}
          refetch={refetch}
        />
      )}
    </div>
  );

  //#endregion
};

export default MStaffPage;
