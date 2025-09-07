"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ICInputProps, IFormInputComponentRef } from "@/types/form";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const CCalendar = forwardRef<IFormInputComponentRef, ICInputProps>(
  (
    {
      id,
      value,
      disabled,
      onChange,
      error,
      helperText,
      fullWidth,
      label,
      requried,
    },
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    ref
  ) => {
    const onChangeDate = (v: Date | undefined) => {
      if (v && onChange) {
        onChange(v);
      }
    };

    return (
      <div className="relative w-full " id={id}>
        <div className="mb-2 flex gap-1 text-sm font-medium text-header">
          <span>{label}</span>
          {requried && <span className="text-[#EE3F3F]">*</span>}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !value && "text-muted-foreground",
                fullWidth ? "w-full" : "min-w-[280px]",
                error && "border border-red-500"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? (
                dayjs(value).format("DD/MM/YYYY")
              ) : (
                <span>Pick a date </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 relative" align="start">
            {value && (
              <Calendar
                mode="single"
                selected={value}
                onSelect={(v: Date | undefined) => onChangeDate(v)}
                initialFocus
                disabled={disabled}
              />
            )}
          </PopoverContent>
        </Popover>
        {helperText && (
          <div className="absolute top-full text-xs italic text-red-500">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

export default CCalendar;
