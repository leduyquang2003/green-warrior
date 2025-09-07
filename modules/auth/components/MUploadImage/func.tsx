import { toast } from "react-toastify";

export const presignUrlServer = async (
  file: File,
  presignedUrl: string
): Promise<boolean> => {
  if (!file) {
    toast.error("File không hợp lệ!");
    return false;
  }

  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (response.ok) {
      //   toast.success('Upload thành công!');
      console.log("Upload thành công!", response.status);
      return true;
    } else {
      toast.error("Upload thất bại!");
      console.error("Lỗi khi upload:", response.statusText);
    }
  } catch (error) {
    console.error("Lỗi trong quá trình upload:", error);
    toast.error("Có lỗi xảy ra khi upload!");
  }

  return false;
};
