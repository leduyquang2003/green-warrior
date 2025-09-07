import { IUpdateStaffForm } from "@/types/hr-management";

export interface IMUpdateCategoryDialog {
  open: boolean;
  onSetOpen: () => void;
  value: IUpdateStaffForm | null;
  refetch: () => void;
}
