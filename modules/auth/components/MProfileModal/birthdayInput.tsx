import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

const BirthdateInput = ({
  value,
  onChange,
  label,
  requried,
  helperText,
}: {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (v: string) => void;
  label?: string;
  requried?: boolean;
  error?: boolean;
  helperText?: string;
}) => {
  const [_value, setValue] = useState(value || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 8) input = input.slice(0, 8);

    if (input.length > 4) {
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
    } else if (input.length > 2) {
      input = `${input.slice(0, 2)}/${input.slice(2)}`;
    }

    setValue(input);
    onChange(input);
  };

  return (
    <div className="relative w-full ">
      <div className="mb-2 flex gap-1 text-sm font-medium text-header">
        <span>{label}</span>
        {requried && <span className="text-[#EE3F3F]">*</span>}
      </div>

      <Input
        className="focus-visible:outline-none"
        type="text"
        value={_value}
        onChange={handleChange}
        placeholder="DD/MM/YYYY"
      />

      {helperText && (
        <div className="absolute top-full text-xs italic text-red-500">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default BirthdateInput;
