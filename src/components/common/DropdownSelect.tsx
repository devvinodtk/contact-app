import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface DropdownSelectProps<T> {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
  error?: FieldError;
}

const DropdownSelect = forwardRef<HTMLSelectElement, DropdownSelectProps<any>>(
  <T extends any>(
    { label, options, value, onChange, error, ...rest }: DropdownSelectProps<T>,
    ref: any
  ) => {
    return (
      <div className="w-full rounded mb-4 text-gray-600">
        <label className="block text-sm font-medium mb-1 text-gray-600">
          {label}
        </label>
        <select
          {...rest}
          ref={ref}
          value={value as string}
          onChange={(e) => onChange(e.target.value as T)}
          className={`w-full p-2 border rounded text-gray-600 ${
            error?.message ? "focus:outline-none border-red-500 bg-red-50" : ""
          }`}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option as unknown as string}>
              {option as unknown as React.ReactNode}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default DropdownSelect;
