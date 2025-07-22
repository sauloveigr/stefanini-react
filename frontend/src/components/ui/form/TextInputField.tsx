import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
interface TextInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  register: UseFormRegisterReturn;
}

export const TextInputField = ({
  label,
  error,
  required,
  register,
  ...props
}: TextInputFieldProps) => {
  return (
    <div className="my-2">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus:ring-purple-500/50 focus-visible:ring-ring focus-visible:ring-offset-2"
        {...register}
        {...props}
      />
      <p className="text-red-500 mt-1 text-xs min-h-5">{error}</p>
    </div>
  );
};
