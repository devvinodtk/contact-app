import React from "react";

interface DropdownSelectProps<T extends React.ReactNode> {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

function DropdownSelect<T extends React.ReactNode>({
  label,
  options,
  value,
  onChange,
}: DropdownSelectProps<T>) {
  return (
    <div className="w-full rounded mb-4 text-gray-600">
      <label className="block text-sm font-medium mb-1 text-gray-600">
        {label}
      </label>
      <select
        value={value as unknown as string}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full p-2 border rounded bg-white text-gray-600"
      >
        {options.map((option, idx) => (
          <option key={idx} value={option as unknown as string}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelect;
