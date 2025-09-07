"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CStatus = ({ status }: { status?: number }) => {
  return (
    <>
      <Badge
        variant="secondary"
        className={cn(
          "text-white",
          status === 1
            ? "bg-[#1DB46A] hover:bg-[#1DB46A] hover:opacity-60"
            : "bg-[#F08420] hover:bg-[#F08420] hover:opacity-60"
        )}
      >
        {status === 1 ? "Hoạt động" : "Tạm dừng"}
      </Badge>
    </>
  );
};

export default CStatus;
