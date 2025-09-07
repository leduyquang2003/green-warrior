export interface IFormInputComponentRef {
  blur: () => void;
  focus: () => void;
}

export interface IFormInputComponentProps<T = any> {
  id?: string;
  name?: string;
  value?: T | null;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export interface ICInputProps extends IFormInputComponentProps {
  label?: string;
  type?: string;
  requried?: boolean;
  key?: string | number;
  placeholder?: string;
  fullWidth?: boolean;
}

export interface IOptions {
  id: string;
  name: string;
}

export interface ICSelect extends IFormInputComponentProps {
  label?: string;
  requried?: boolean;
  options: IOptions[];
  placeholder?: string;
  onChange: (v: any) => void;
}
