import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TextInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  mask?: string;
}

export const TextInputField = ({
  label,
  error,
  required,
  register,
  mask,
  ...props
}: TextInputFieldProps) => {
  const inputClassName = "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus:ring-purple-500/50 focus-visible:ring-ring focus-visible:ring-offset-2";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask === "999.999.999-99") {
      let value = e.target.value.replace(/\D/g, '');

      if (value.length > 11) {
        value = value.substring(0, 11);
      }

      if (value.length > 0) {
        if (value.length <= 6) {
          value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
        } else if (value.length <= 9) {
          value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else {
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
        }
      }

      e.target.value = value;
    }
  };

  return (
    <div className="my-2">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={inputClassName}
        {...register}
        {...props}
        onChange={(e) => {
          handleInputChange(e);
          register.onChange(e);
        }}
      />
      <p className="text-red-500 mt-1 text-xs min-h-5">{error}</p>
    </div>
  );
};
