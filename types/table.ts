/* eslint-disable no-unused-vars */
import { ReactNode } from "react";

export interface RowData {
  value: string | number;
}

export interface Header {
  id: string;
  header: string;
  render?: (value: string | number, rowData?: GroupData) => ReactNode;
}

export interface GroupData {
  [key: string]: string | number;
}
