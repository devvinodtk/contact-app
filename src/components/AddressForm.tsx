import React, { useEffect, useState } from "react";
import { Address, AddressType, PostalInfo } from "../types/Users";
import { Button } from "@material-tailwind/react";
import { Member_Address } from "../types/Users_Mock";
// @ts-ignore
import pincodeDirectory from "india-pincode-lookup";
import DropdownSelect from "./common/DropdownSelect";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface AddressFormProps {
  addressType: AddressType;
  addressInfo?: Address;
  onAddressChange: (addressType: AddressType, value: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  addressType,
  addressInfo,
  onAddressChange,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<{ address: Address }>({
    mode: "all",
    defaultValues: {
      address: addressInfo ?? Member_Address,
    },
  });

  const [postOfficeNames, setPostOfficeNames] = useState<string[]>([
    "Select Post Office",
  ]);

  const handleChange = (field: keyof Address, value: any) => {
    if (value.length === 6 && field === "pin_code") {
      fetchPostOfficesByPIN(value);
    }
  };

  const fetchPostOfficesByPIN = (pincode: string) => {
    let postalInfo: PostalInfo[] = pincodeDirectory.lookup(pincode);
    if (postalInfo && postalInfo.length) {
      let officeNames = ["Select Post Office"];
      officeNames.push(...postalInfo.map((info) => info.officeName));
      setPostOfficeNames(officeNames);
      const postalInfoByPIN = postalInfo[0];
      setValue("address.city", postalInfoByPIN.districtName);
      setValue("address.state", postalInfoByPIN.stateName);
      setValue("address.post_office", postalInfoByPIN.officeName[0]);
    }
  };

  useEffect(() => {
    if (
      addressInfo &&
      addressInfo.pin_code &&
      addressInfo.pin_code.length === 6
    ) {
      fetchPostOfficesByPIN(addressInfo.pin_code);
    }
  }, [addressInfo]);

  const onSubmitHandler: SubmitHandler<{ address: Address }> = (
    _data,
    event
  ) => {
    event?.stopPropagation();
    onAddressChange(addressType, _data.address);
  };

  return (
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
        Address Line 2 / Landmark
      </label>
      <input
        type="text"
        placeholder="Address Line 2 / Landmark"
        className="w-full p-2 mb-4 border rounded text-gray-600"
      />
      <label
        htmlFor="addressDetails.pin_code"
        className="text-sm font-medium text-gray-600"
      >
        Pin Code *
      </label>
      <input
        type="number"
        autoComplete="off"
        placeholder="Pin Code"
        {...register(`address.pin_code`, {
          required: "Pin Code",
          minLength: 6,
          maxLength: 6,
        })}
        onChange={(e) => handleChange("pin_code", e.target.value)}
        className={`w-full p-2 mb-4 border rounded text-gray-600 appearance-none${
          errors.address?.pin_code
            ? "focus:outline-none border-red-500 bg-red-50"
            : ""
        }`}
      />
      <Controller
        name="address.post_office"
        control={control}
        defaultValue=""
        rules={{ required: "Post office is required" }}
        render={({ field }) => (
          <DropdownSelect
            label="Post Office *"
            value={field.value}
            error={errors.address?.post_office}
            options={postOfficeNames}
            onChange={field.onChange}
          />
        )}
      ></Controller>
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
        className="p-2 border mb-4 rounded w-full text-gray-600"
      />
      <Button
        type="button"
        onClick={handleSubmit(onSubmitHandler)}
        color="blue"
        className="w-full cursor-pointer text-white mt-6 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        {...({} as React.ComponentProps<typeof Button>)}
      >
        Save Details
      </Button>
    </div>
  );
};

export default AddressForm;
