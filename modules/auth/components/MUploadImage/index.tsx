/* eslint-disable @next/next/no-img-element */
//#region Import

import { Input } from "@/components/ui/input";
import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { presignUrlServer } from "./func";
import { getPresignUrl, setActive } from "@/api/media-file.api";

//#endregion

// eslint-disable-next-line no-unused-vars
const MUploadImage = ({
  setImageId,
}: {
  setImageId: (v: string | null) => void;
}) => {
  const t = useTranslations();

  //#region State

  const [src, setSrc] = useState<string>("");

  //#endregion

  //#region Events

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result as string);
      reader.readAsDataURL(file);
      try {
        const res = await getPresignUrl({
          name: file?.name,
          size: file.size,
          extension: file.name.split(".").pop() || "",
          mimetype: file.type,
        });

        if (res.data.data.pregignedUrl) {
          const _res = await presignUrlServer(file, res.data.data.pregignedUrl);

          if (_res) {
            onSetActive(res.data.data.id);
          }
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Đã xảy ra lỗi");
      }
    }
  };

  const onSetActive = async (id: string) => {
    try {
      const res = await setActive(id);
      if (res.data.status) {
        setImageId(id);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t(error.response?.data?.message));
      }
    }
  };

  //#endregion

  //#region Render

  return (
    <div className="relative w-full ">
      <div className="mb-2 flex gap-1 text-sm font-medium text-header">
        <span>Thay đổi ảnh đại diện</span>
      </div>

      <div>
        <div className="flex flex-wrap gap-3">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="max-w-xs"
          />
        </div>
        <div className="my-2 flex gap-11">
          <div>
            {src && (
              <div>
                <img src={src || ""} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  //#endregion
};

export default MUploadImage;
