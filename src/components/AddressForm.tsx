import React, { useCallback, useEffect, useState } from "react";
import { Address, AddressType } from "../types/Users";
import { Switch } from "@material-tailwind/react";
import type { SwitchProps } from "@material-tailwind/react";
import debounce from "lodash/debounce";
import { Member_Address } from "../types/Users_Mock";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  AddressState,
  updateAddress,
} from "../store/AddressDetailsSlice";

interface AddressFormProps {
  label: string;
  copyAddress?: boolean;
  addressInfo?: Address;

  onAddressChange: (value: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  label,
  copyAddress,
  addressInfo,
  onAddressChange,
}) => {
  const member_address: [AddressState] = useSelector(
    (state: any) => state.address_details
  );
  const [addressDetails, setAddressDetails] = useState<Address>(Member_Address);
  const dispatch = useDispatch();
  const handleChange = (field: keyof Address, value: any) => {
    debouncedHandleChange(field, value);
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
    if (isAddressComplete()) {
      onAddressChange(addressDetails);
    }
  }, [addressDetails]);

  const debouncedHandleChange = useCallback(
    debounce((field: keyof Address, value: any) => {
      if (field === "flat_number_name") {
        setAddressDetails((prevState: Address) => ({
          ...prevState,
          flat_number_name: value,
        }));
      } else if (field === "address_line_1") {
        setAddressDetails((prevState: Address) => ({
          ...prevState,
          address_line_1: value,
        }));
      } else if (field === "address_line_2") {
        setAddressDetails((prevState: Address) => ({
          ...prevState,
          address_line_2: value,
        }));
      } else if (field === "city") {
        setAddressDetails((prevState: Address) => ({
          ...prevState,
          city: value,
        }));
      } else if (field === "state") {
        setAddressDetails((prevState: Address) => ({
          ...prevState,
          state: value,
        }));
      } else if (field === "country") {
        setAddressDetails((prevState: Address) => ({
          ...prevState,
          country: value,
        }));
      } else if (field === "pin_code") {
        setAddressDetails((prevState: Address) => ({
          ...prevState,
          pin_code: value,
        }));
      } else if (field === "contact_number") {
        setAddressDetails((prevState: Address) => ({
          ...prevState,
          contact_number: value,
        }));
      }
    }, 500),
    []
  );

  const [isCopyAddressChecked, setIsCopyAddressChecked] = useState(false);

  const handleCopyAddressCheckedChange: SwitchProps["onChange"] = (event) => {
    setIsCopyAddressChecked(event.target.checked);
  };

  useEffect(() => {
    if (isCopyAddressChecked) {
      if (member_address && member_address.length > 0) {
        const presentAddress: AddressState | undefined = member_address.find(
          (address) => address.address_type === AddressType.PresentAddress
        );
        if (presentAddress) {
          dispatch(
            addAddress({
              address_type: AddressType.PermanentAddress,
              address: presentAddress.address,
            })
          );
        }
      }
    } else {
      dispatch(
        updateAddress({
          address_type: AddressType.PermanentAddress,
          address: Member_Address,
        })
      );
    }
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
          value={addressInfo?.flat_number_name}
          onChange={(e) => handleChange("flat_number_name", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Address Line 1"
          value={addressInfo?.address_line_1}
          onChange={(e) => handleChange("address_line_1", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={addressInfo?.address_line_2}
          onChange={(e) => handleChange("address_line_2", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="City"
          value={addressInfo?.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="State"
          value={addressInfo?.state}
          onChange={(e) => handleChange("state", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Country"
          value={addressInfo?.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Pin Code"
          value={addressInfo?.pin_code}
          onChange={(e) => handleChange("pin_code", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
        <input
          type="text"
          placeholder="Land Phone"
          value={addressInfo?.contact_number}
          onChange={(e) => handleChange("contact_number", e.target.value)}
          className="p-2 border rounded w-full text-gray-600"
        />
      </div>
    </div>
  );
};

export default AddressForm;
