"use client";

const CLoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="relative flex h-screen w-full items-center justify-center gap-20 bg-cover bg-no-repeat px-3 py-20 ">
        <div className="hidden w-[31.25rem] lg:block">
          <div className="mb-8 text-6xl font-bold"> MIJO</div>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <i className="fa-solid fa-circle-check text-[20px]"></i>
              <div>
                <div className="text-[16px] font-semibold leading-4">
                  Nền tảng ứng dụng Mijo
                </div>
                <div className="mt-1 text-sm font-normal">
                  Cầu nối giữa người cung cấp dịch vụ và người sử dụng.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <i className="fa-solid fa-circle-check text-[20px]"></i>
              <div>
                <div className="text-[16px] font-semibold leading-4">
                  Bảo mật thông tin
                </div>
                <div className="mt-1 text-sm font-normal">
                  Bảo mật thông tin cá nhân và dữ liệu giao dịch của người dùng.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <i className="fa-solid fa-circle-check text-[20px]"></i>
              <div>
                <div className="text-[16px] font-semibold leading-4">
                  Tiện lợi
                </div>
                <div className="mt-1 text-sm font-normal">
                  Đa dạng hình thức thanh toán: Tiền mặt, thẻ ngân hàng, ví điện
                  tử,...
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <i className="fa-solid fa-circle-check text-[20px]"></i>
              <div>
                <div className="text-[16px] font-semibold leading-4">
                  Tính năng cộng đồng
                </div>
                <div className="mt-1 text-sm font-normal">
                  Người dùng có thể tạo nhóm để chia sẻ kinh nghiệm, đánh giá
                  dịch vụ.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">{children}</div>
      </div>
    </>
  );
};

export default CLoginLayout;
