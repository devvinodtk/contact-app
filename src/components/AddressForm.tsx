import React, { ChangeEvent } from "react";
import { Address } from "../types/Users";

interface AddressFormProps {
  label: string;
  address?: Address;
  onChange: (field: keyof Address, value: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  label,
  address,
  onChange,
}) => {
  const handleChange =
    (field: keyof Address) => (e: ChangeEvent<HTMLInputElement>) => {
      onChange(field, e.target.value);
    };

  return (
    <div className="p-4 border rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-600">{label}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Flat Number/Name"
          value={address?.flat_number_name}
          onChange={handleChange("flat_number_name")}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Address Line 1"
          value={address?.address_line_1}
          onChange={handleChange("address_line_1")}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={address?.address_line_2}
          onChange={handleChange("address_line_2")}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="City"
          value={address?.city}
          onChange={handleChange("city")}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="State"
          value={address?.state}
          onChange={handleChange("state")}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Country"
          value={address?.country}
          onChange={handleChange("country")}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Pin Code"
          value={address?.pin_code}
          onChange={handleChange("pin_code")}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={address?.contact_number}
          onChange={handleChange("contact_number")}
          className="p-2 border rounded w-full text-gray-600"
        />
      </div>
    </div>
  );
};

export default AddressForm;
