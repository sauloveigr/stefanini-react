import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
}

export const FormField = ({ label, children, error, required }: FormFieldProps) => {
  return (
    <div className="my-2">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      <p className='text-red-500 text-sm mt-1 min-h-5'>{error}</p>
    </div>
  );
};
