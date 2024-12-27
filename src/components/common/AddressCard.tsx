import { Button, Switch, SwitchProps } from "@material-tailwind/react";
import { Plus, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Address,
  AddressChangeType,
  AddressType,
  UserOps,
} from "../../types/Users";

interface AddressCardProps {
  copyAddress?: boolean;
  addressType: AddressType;
  address?: Address;
  onEdit?: (addressChange: AddressChangeType) => void;
  onCopyPresentAddress?: (status: boolean) => void;
}

const AddressCard = ({
  copyAddress,
  addressType,
  address,
  onEdit,
  onCopyPresentAddress,
}: AddressCardProps) => {
  const handleAddAddress = () => {
    const operation: UserOps =
      address && address.flat_number_name ? UserOps.Edit : UserOps.Add;
    onEdit && onEdit({ operation, addressType });
  };

  const [isCopyAddressChecked, setIsCopyAddressChecked] = useState(false);

  const handleCopyAddressCheckedChange: SwitchProps["onChange"] = (event) => {
    setIsCopyAddressChecked(event.target.checked);
  };

  useEffect(() => {
    onCopyPresentAddress && onCopyPresentAddress(isCopyAddressChecked);
  }, [isCopyAddressChecked]);

  return (
    <div className="p-4 border rounded ">
      <div className="flex">
        <div className="text-left mr-2">
          <h2 className="text-lg font-semibold  text-gray-600">
            {addressType}
          </h2>
        </div>
        <div className="">
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
        <div className="flex-1 text-right">
          <Button
            variant="text"
            color="blue"
            onClick={handleAddAddress}
            {...({} as React.ComponentProps<typeof Button>)} // Typecasting to avoid type error
            className="cursor-pointer bg-blue-500 text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg p-2 text-center"
          >
            {address && address.flat_number_name ? (
              <Pencil className="inline size-4" />
            ) : (
              <Plus className="inline size-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="block w-full text-gray-600">
        {address && address.flat_number_name && (
          <>
            <p className="block w-full">{address?.flat_number_name},</p>
            <p className="block">
              {address?.address_line_1}, {address?.address_line_2}
              {address?.address_line_2 ? "," : ""}
            </p>
            <p className="block">
              {" "}
              {address?.post_office}, {address?.city}, {address?.state} -{" "}
              {address?.pin_code}
            </p>
            <p className="block">
              {" "}
              {address.contact_number}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
