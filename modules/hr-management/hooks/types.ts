import { TGetStaffsResponse } from "@/types/hr-management";
import { Row } from "@tanstack/react-table";

/* eslint-disable no-unused-vars */
export interface IColumnHr {
  onClickEdit: (value: Row<TGetStaffsResponse>) => void;
  onDelete: (id: string) => void;
}
