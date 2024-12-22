import React, { useEffect, useState } from "react";
import { Address, PostalInfo } from "../types/Users";
import { Switch } from "@material-tailwind/react";
import type { SwitchProps } from "@material-tailwind/react";
import { Member_Address } from "../types/Users_Mock";
// @ts-ignore
import pincodeDirectory from "india-pincode-lookup";

interface AddressFormProps {
  label: string;
  copyAddress?: boolean;
  addressInfo?: Address;
  onAddressChange: (value: Address) => void;
  onCopyPresentAddress?: (status: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  label,
  copyAddress,
  addressInfo,
  onAddressChange,
  onCopyPresentAddress,
}) => {
  const [addressDetails, setAddressDetails] = useState<Address>(
    addressInfo ?? Member_Address
  );
  const [fetchDetailsByPIN, setFetchDetailsByPIN] = useState<boolean>(false);

  const handleChange = (field: keyof Address, value: any) => {
    setAddressDetails((prevState: Address) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const isAddressComplete = () => {
    return (
      addressDetails &&
      addressDetails.flat_number_name &&
      addressDetails.address_line_1 &&
      addressDetails.address_line_2 &&
      addressDetails.city &&
      addressDetails.state &&
      addressDetails.pin_code &&
      addressDetails.country
    );
  };

  useEffect(() => {
    if (addressInfo) {
      setAddressDetails(addressInfo);
    }
  }, [addressInfo]);

  useEffect(() => {
    if (
      fetchDetailsByPIN &&
      addressDetails &&
      addressDetails.pin_code.length === 6
    ) {
      let postalInfo: PostalInfo[] = pincodeDirectory.lookup(
        addressDetails.pin_code
      );

      if (postalInfo && postalInfo.length) {
        const postalInfoByPIN = postalInfo[0];
        setFetchDetailsByPIN(false);
        setAddressDetails((prevAddress: Address) => ({
          ...prevAddress,
          city: postalInfoByPIN.districtName,
          state: postalInfoByPIN.stateName,
        }));
      }
    } else if (addressDetails.pin_code.length === 5) {
      setFetchDetailsByPIN(true);
    }
    if (isAddressComplete()) {
      onAddressChange(addressDetails);
    }
  }, [addressDetails]);

  const [isCopyAddressChecked, setIsCopyAddressChecked] = useState(false);

  const handleCopyAddressCheckedChange: SwitchProps["onChange"] = (event) => {
    setIsCopyAddressChecked(event.target.checked);
  };

  useEffect(() => {
    onCopyPresentAddress && onCopyPresentAddress(isCopyAddressChecked);
  }, [isCopyAddressChecked]);

  return (
    <div className="p-4 border rounded-lg mb-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">{label}</h2>
        {copyAddress && (
          <Switch
            checked={isCopyAddressChecked}
            onChange={handleCopyAddressCheckedChange}
            label="Copy Present Address"
            className="bg-blue-500"
            {...({
              checked: isCopyAddressChecked,
              onChange: handleCopyAddressCheckedChange,
              label: "Copy Present Address",
            } as React.ComponentProps<typeof Switch>)}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Flat Number/Name"
          value={addressDetails?.flat_number_name}
          onChange={(e) => handleChange("flat_number_name", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Address Line 1"
          value={addressDetails?.address_line_1}
          onChange={(e) => handleChange("address_line_1", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={addressDetails?.address_line_2}
          onChange={(e) => handleChange("address_line_2", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Pin Code"
          value={addressDetails?.pin_code}
          onChange={(e) => handleChange("pin_code", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="City"
          value={addressDetails?.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="State"
          value={addressDetails?.state}
          onChange={(e) => handleChange("state", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          disabled={true}
          placeholder="Country"
          value={addressDetails?.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Land Phone"
          value={addressDetails?.contact_number}
          onChange={(e) => handleChange("contact_number", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
      </div>
    </div>
  );
};

export default AddressForm;
