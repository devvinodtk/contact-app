import { ChangeEventHandler, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface DropdownSelectProps<T> {
  label: string;
  options: T[];
  value?: T;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  error?: FieldError;
  mandatory?: boolean;
}

const DropdownSelect = forwardRef<
  HTMLSelectElement,
  DropdownSelectProps<string>
>(
  <T extends string>(
    { label, options, value, onChange, error, ...rest }: DropdownSelectProps<T>,
    ref: any
  ) => {
    return (
      <div className="w-full rounded mb-4 text-gray-600">
        <label className="block text-sm font-medium mb-1 text-gray-600">
          {label} {rest.mandatory && <span>*</span>}
        </label>
        <select
          {...rest}
          ref={ref}
          value={value as string}
          onChange={onChange}
          className={`w-full p-2 border rounded text-gray-600 ${
            error?.message ? "focus:outline-none border-red-500 bg-red-50" : ""
          }`}
        >
          {options.map((option) =>
            option === "" ? (
              <option key={option} value={option}>
                Select {label}
              </option>
            ) : (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>
      </div>
    );
  }
);

export default DropdownSelect;
