"use client";

import { Input } from "@/components/ui/input";
import { ICInputProps, IFormInputComponentRef } from "@/types/form";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const CInput = forwardRef<IFormInputComponentRef, ICInputProps>(
  (
    {
      id,
      name,
      value,
      disabled,
      onChange,
      placeholder,
      type,
      helperText,
      label,
      requried,
      ...props
    },
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    ref
  ) => {
    return (
      <div className="relative w-full ">
        <div className="mb-2 flex gap-1 text-sm font-medium text-header">
          <span>{label}</span>
          {requried && <span className="text-[#EE3F3F]">*</span>}
        </div>

        <Input
          className="focus-visible:outline-none"
          placeholder={placeholder}
          type={type}
          id={id}
          name={name}
          onChange={onChange}
          disabled={disabled}
          value={value}
          {...props}
        />

        {helperText && (
          <div className="absolute top-full text-xs italic text-red-500">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

export default CInput;
