import React, { useEffect, useState } from "react";
import { Address, AddressType, PostalInfo } from "../types/Users";
import { Button } from "@material-tailwind/react";
// @ts-ignore
import pincodeDirectory from "india-pincode-lookup";
import DropdownSelect from "./common/DropdownSelect";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { memberAddress } from "../types/UsersMock";

interface AddressFormProps {
  addressType: AddressType;
  addressInfo: Address | null;
  onAddressChange: (addressType: AddressType, value: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  addressType,
  addressInfo,
  onAddressChange,
}) => {
  const [postOfficeNames, setPostOfficeNames] = useState<string[]>([""]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Address>({
    mode: "all",
    defaultValues: addressInfo ?? memberAddress,
  });

  const pincode = watch("pincode");

  useEffect(() => {
    if (pincode?.length === 6) {
      const postalInfo: PostalInfo[] = pincodeDirectory.lookup(pincode);
      const officeNames = [""];
      if (postalInfo?.length) {
        officeNames.push(...postalInfo.map((info) => info.officeName));
        const postalInfoByPIN = postalInfo[0];
        setValue("city", postalInfoByPIN.districtName);
        setValue("state", postalInfoByPIN.stateName);
        setValue("postOffice", postalInfoByPIN.officeName);
      } else {
        setValue("city", "");
        setValue("state", "");
        setValue("postOffice", "");
      }
      setPostOfficeNames(officeNames);
      trigger(["city", "state", "postOffice"]);
    }
  }, [pincode, setValue, trigger]);

  const onSubmitHandler: SubmitHandler<Address> = (data) => {
    onAddressChange(addressType, data);
  };

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-600">
        Flat Number / Name *
        <input
          type="text"
          placeholder="Flat Number/Name"
          {...register(`flatNumberName`, {
            required: "Flat Number / Name",
          })}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.flatNumberName
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
      </label>
      <label className="text-sm font-medium text-gray-600">
        Address Line 1 *
        <input
          type="text"
          placeholder="Address Line 1"
          {...register("addressLine1", {
            required: "Address Line 1",
          })}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.addressLine1
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
      </label>
      <label className="text-sm font-medium text-gray-600">
        Address Line 2 / Landmark
        <input
          type="text"
          {...register("addressLine2")}
          placeholder="Address Line 2 / Landmark"
          className="w-full p-2 mb-4 border rounded text-gray-600"
        />
      </label>
      <label className="text-sm font-medium text-gray-600">
        Pin Code *
        <input
          type="number"
          autoComplete="off"
          placeholder="Pin Code"
          {...register("pincode", {
            required: "Pin Code",
            minLength: 6,
            maxLength: 6,
          })}
          className={`w-full p-2 mb-4 border rounded text-gray-600 appearance-none${
            errors.pincode ? "focus:outline-none border-red-500 bg-red-50" : ""
          }`}
        />
      </label>
      <Controller
        name="postOffice"
        control={control}
        rules={{ required: "Post office is required" }}
        render={({ field: { value, onChange }, fieldState }) => (
          <DropdownSelect
            label="Post Office"
            mandatory={true}
            value={value}
            error={fieldState.error}
            options={postOfficeNames}
            onChange={onChange}
          />
        )}
      />
      <label className="text-sm font-medium text-gray-600">
        City *
        <input
          type="text"
          placeholder="City"
          {...register("city", {
            required: "City",
          })}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.city ? "focus:outline-none border-red-500 bg-red-50" : ""
          }`}
        />
      </label>
      <label className="text-sm font-medium text-gray-600">
        State *
        <input
          type="text"
          placeholder="State"
          {...register("state", {
            required: "State",
          })}
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.state ? "focus:outline-none border-red-500 bg-red-50" : ""
          }`}
        />
      </label>
      <label className="text-sm font-medium text-gray-600">
        Country *
        <input
          type="text"
          {...register("country", {
            required: "Country",
          })}
          placeholder="Country"
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.country ? "focus:outline-none border-red-500 bg-red-50" : ""
          }`}
        />
      </label>
      <label className="text-sm font-medium text-gray-600">
        Land Phone
        <input
          type="text"
          placeholder="Land Phone"
          className="p-2 border mb-4 rounded w-full text-gray-600"
        />
      </label>
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
