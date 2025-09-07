import { confirmable } from "react-confirm";

import { Button } from "@/components/ui/button";
import { ICConfirmProps } from "./types";

const CConfirm = ({ proceed, confirmation }: ICConfirmProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-center">
          Xác nhận hành động
        </h2>
        <p className="mt-4 text-gray-600 text-sm text-center">{confirmation}</p>
        <div className="mt-6 flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => proceed?.("")}
            className="w-24"
          >
            Huỷ
          </Button>
          <Button
            variant="destructive"
            onClick={() => proceed?.("true")}
            className="w-24"
          >
            Xoá
          </Button>
        </div>
      </div>
    </div>
  );
};

export default confirmable(CConfirm);
