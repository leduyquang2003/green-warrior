"use client";

import { Input } from "@/components/ui/input";
import { ICInputProps, IFormInputComponentRef } from "@/types/form";
import { forwardRef, useState } from "react";

const CInputPassword = forwardRef<IFormInputComponentRef, ICInputProps>(
  (
    {
      id,
      name,
      value,
      disabled,
      onChange,
      placeholder,
      type,
      error,
      helperText,
      fullWidth,
      label,
      requried,
      ...props
    },
    ref
  ) => {
    const [_type, setType] = useState<string>(type || "password");

    const handleChangeType = () => {
      if (_type === "password") {
        setType("text");
      } else {
        setType("password");
      }
    };

    return (
      <div className="flex w-full rounded-md border border-input bg-[#F3F6F8] ">
        <Input
          type={_type}
          className="flex-1 rounded-none rounded-s-md border-none"
          placeholder={placeholder}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          disabled={disabled}
          {...props}
        />
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-e-md bg-[#F3F6F8]"
          onClick={handleChangeType}
        >
          {_type === "password" ? (
            <i className="fa-sharp fa-light fa-eye-slash"></i>
          ) : (
            <i className="fa-sharp fa-light fa-eye"></i>
          )}
        </div>
      </div>
    );
  }
);

export default CInputPassword;
