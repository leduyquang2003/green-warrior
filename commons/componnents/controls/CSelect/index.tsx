import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICSelect } from "@/types/form";

const CSelect = ({
  label,
  requried,
  options,
  placeholder,
  onChange,
  helperText,
}: ICSelect) => {
  const handleChange = (value: string) => {
    const selectedItem = options.find((item) => item.id === value);
    if (selectedItem) {
      onChange(selectedItem.id);
    }
  };

  return (
    <div className="relative w-full ">
      <div>
        <div className="mb-2 flex gap-1 text-sm font-medium text-header">
          <span>{label}</span>
          {requried && <span className="text-[#EE3F3F]">*</span>}
        </div>
      </div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options &&
              options.map((item, index) => (
                <SelectItem value={item.id} key={index + item.id}>
                  {item.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {helperText && (
        <div className="absolute top-full text-xs italic text-red-500">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default CSelect;
