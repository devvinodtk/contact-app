import React, { useEffect, useState } from "react";
import { Address, AddressType, PostOfficesInfo } from "../types/Users";
import { Button } from "@material-tailwind/react";
import DropdownSelect from "./common/DropdownSelect";
import { memberAddress } from "../types/UsersMock";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { pincodeLookup } from "../utils/Utility_Functions";
import LoaderComponent from "./common/Loader";

interface AddressFormProps {
  addressType: AddressType;
  addressInfo?: Address | null;
  onAddressChange: (addressType: AddressType, value: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  addressType,
  addressInfo,
  onAddressChange,
}) => {
  const [postOfficeNames, setPostOfficeNames] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm<Address>({
    mode: "all",
    defaultValues: addressInfo ?? memberAddress,
  });

  const pincode = useWatch({ control, name: "pincode" });

  useEffect(() => {
    const fetchPostalInfo = async () => {
      if (pincode?.length === 6) {
        try {
          setIsLoading(true);
          const postalInfo: PostOfficesInfo | undefined = await pincodeLookup(
            pincode
          );
          if (postalInfo) {
            setPostOfficeNames(postalInfo.postOffices);
            setValue("city", postalInfo.district);
            setValue("state", postalInfo.state);
            setValue("postOffice", postalInfo.postOffices[0]);
          } else {
            setValue("city", "");
            setValue("state", "");
            setValue("postOffice", "");
            setPostOfficeNames([""]);
          }

          trigger(["city", "state", "postOffice"]);
        } catch (err) {
          console.log("Failed fetching the postal info: ", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPostalInfo();
  }, [pincode, setValue, trigger]);

  const onSubmitHandler: SubmitHandler<Address> = (data) => {
    onAddressChange(addressType, data);
  };

  return (
    <>
      {isLoading && <LoaderComponent />}
      <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
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
                errors.pincode
                  ? "focus:outline-none border-red-500 bg-red-50"
                  : ""
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
                errors.state
                  ? "focus:outline-none border-red-500 bg-red-50"
                  : ""
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
                errors.country
                  ? "focus:outline-none border-red-500 bg-red-50"
                  : ""
              }`}
            />
          </label>
          <label className="text-sm font-medium text-gray-600">
            Land Phone
            <input
              {...register("contactNumber")}
              type="text"
              placeholder="Land Phone"
              className="p-2 border mb-4 rounded w-full text-gray-600"
            />
          </label>
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
    </>
  );
};

export default AddressForm;
