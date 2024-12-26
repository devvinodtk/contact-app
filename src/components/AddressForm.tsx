import React, { useEffect, useState } from "react";
import { Address, PostalInfo } from "../types/Users";
import { Button, Switch } from "@material-tailwind/react";
import type { SwitchProps } from "@material-tailwind/react";
import { Member_Address } from "../types/Users_Mock";
// @ts-ignore
import pincodeDirectory from "india-pincode-lookup";
import DropdownSelect from "./common/DropdownSelect";
import { useForm, SubmitHandler } from "react-hook-form";

interface AddressFormProps {
  copyAddress?: boolean;
  addressInfo?: Address;
  onAddressChange: (value: Address) => void;
  onCopyPresentAddress?: (status: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  copyAddress,
  addressInfo,
  onAddressChange,
  onCopyPresentAddress,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ address: Address }>({
    mode: "all",
    defaultValues: {
      address: Member_Address,
    },
  });
  const [addressDetails, setAddressDetails] = useState<Address>(
    addressInfo ?? Member_Address
  );
  const [postOfficeNames, setPostOfficeNames] = useState<string[]>([
    "Select Post Office",
  ]);
  const [fetchDetailsByPIN, setFetchDetailsByPIN] = useState<boolean>(false);

  const handleChange = (field: keyof Address, value: any) => {
    setAddressDetails((prevState: Address) => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (addressInfo) {
      setAddressDetails(addressInfo);
      let officeNames = ["Select Post Office"];
      officeNames.push(addressInfo.post_office);
      setPostOfficeNames(officeNames);
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
        let officeNames = ["Select Post Office"];
        officeNames.push(...postalInfo.map((info) => info.officeName));
        setPostOfficeNames(officeNames);
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
  }, [addressDetails]);

  const [isCopyAddressChecked, setIsCopyAddressChecked] = useState(false);

  const handleCopyAddressCheckedChange: SwitchProps["onChange"] = (event) => {
    setIsCopyAddressChecked(event.target.checked);
  };

  useEffect(() => {
    onCopyPresentAddress && onCopyPresentAddress(isCopyAddressChecked);
  }, [isCopyAddressChecked]);

  const onSubmitHandler: SubmitHandler<{ address: Address }> = (
    _data,
    event
  ) => {
    event?.stopPropagation();
    onAddressChange(addressDetails);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="w-full">
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
      <div className="w-full">
        <label
          htmlFor="addressDetails.flat_number_name"
          className="text-sm font-medium text-gray-600"
        >
          Flat Number / Name *
        </label>
        <input
          type="text"
          placeholder="Flat Number/Name"
          {...register(`address.flat_number_name`, {
            required: "Flat Number / Name",
          })}
          value={addressDetails?.flat_number_name}
          onChange={(e) => handleChange("flat_number_name", e.target.value)}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.address?.flat_number_name
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
        <label
          htmlFor="addressDetails.address_line_1"
          className="text-sm font-medium text-gray-600"
        >
          Address Line 1 *
        </label>
        <input
          type="text"
          placeholder="Address Line 1"
          {...register(`address.address_line_1`, {
            required: "Address Line 1",
          })}
          value={addressDetails?.address_line_1}
          onChange={(e) => handleChange("address_line_1", e.target.value)}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.address?.address_line_1
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
        <label
          htmlFor="addressDetails.address_line_2"
          className="text-sm font-medium text-gray-600"
        >
          Address Line 2 / Landmark *
        </label>
        <input
          type="text"
          placeholder="Address Line 2 / Landmark"
          {...register(`address.address_line_2`, {
            required: "Address Line 2",
          })}
          value={addressDetails?.address_line_2}
          onChange={(e) => handleChange("address_line_2", e.target.value)}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.address?.address_line_2
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
        <label
          htmlFor="addressDetails.pin_code"
          className="text-sm font-medium text-gray-600"
        >
          Pin Code *
        </label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Pin Code"
          {...register(`address.pin_code`, {
            required: "Pin Code",
          })}
          value={addressDetails?.pin_code}
          onChange={(e) => handleChange("pin_code", e.target.value)}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.address?.pin_code
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
        <DropdownSelect
          label="Post Office"
          {...register(`address.post_office`, {
            required: "Post office is required",
            validate: (value) =>
              value !== "Select Post Office" || "Please select a post office",
          })}
          error={errors.address?.post_office}
          options={postOfficeNames}
          value={addressDetails?.post_office}
          onChange={(value: string) => handleChange("post_office", value)}
        />
        <label
          htmlFor="addressDetails.city"
          className="text-sm font-medium text-gray-600"
        >
          City *
        </label>
        <input
          type="text"
          placeholder="City"
          {...register(`address.city`, {
            required: "City",
          })}
          value={addressDetails?.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.address?.city
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
        <label
          htmlFor="addressDetails.state"
          className="text-sm font-medium text-gray-600"
        >
          State *
        </label>
        <input
          type="text"
          placeholder="State"
          {...register(`address.state`, {
            required: "State",
          })}
          value={addressDetails?.state}
          onChange={(e) => handleChange("state", e.target.value)}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.address?.state
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
        <label
          htmlFor="addressDetails.country"
          className="text-sm font-medium text-gray-600"
        >
          Country *
        </label>
        <input
          type="text"
          disabled={true}
          {...register(`address.country`, {
            required: "Country",
          })}
          placeholder="Country"
          value={addressDetails?.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.address?.country
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
        <label
          htmlFor="addressDetails.contact_number"
          className="text-sm font-medium text-gray-600"
        >
          Land Phone
        </label>
        <input
          type="text"
          placeholder="Land Phone"
          value={addressDetails?.contact_number}
          onChange={(e) => handleChange("contact_number", e.target.value)}
          className="p-2 border mb-4 rounded w-full text-gray-600"
        />
        <Button
          type="submit"
          color="blue"
          className="w-full cursor-pointer text-white mt-6 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          {...({} as React.ComponentProps<typeof Button>)}
        >
          Save Details
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
