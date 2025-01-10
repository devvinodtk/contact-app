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
  address?: Address | null;
  onEdit?: (addressChange: AddressChangeType) => void;
  onCopyPresentAddress?: (status: boolean) => void;
  error: boolean;
}

const AddressCard = ({
  copyAddress,
  addressType,
  address,
  onEdit,
  error,
  onCopyPresentAddress,
}: AddressCardProps) => {
  const handleAddAddress = () => {
    const operation: UserOps = address?.flatNumberName
      ? UserOps.Edit
      : UserOps.Add;
    if (onEdit) {
      onEdit({ operation, addressType });
    }
  };

  let style = "p-4 border rounded";
  style = error ? " focus:outline-none border-red-500 bg-red-50" : style;

  const [isCopyAddressChecked, setIsCopyAddressChecked] = useState(false);

  const handleCopyAddressCheckedChange: SwitchProps["onChange"] = (event) => {
    setIsCopyAddressChecked(event.target.checked);
  };

  useEffect(() => {
    if (isCopyAddressChecked && onCopyPresentAddress) {
      onCopyPresentAddress(isCopyAddressChecked);
    }
  }, [isCopyAddressChecked]);

  return (
    <div className={style}>
      <div className="flex">
        <div className="text-left">
          <h2 className="text-lg font-semibold  text-gray-600">
            {addressType}
          </h2>
        </div>
        <div className="font10 ml-2">
          {copyAddress && (
            <Switch
              checked={isCopyAddressChecked}
              onChange={handleCopyAddressCheckedChange}
              label="Copy Present Address"
              className="border bg-gray-100 z-0"
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
            type="button"
            color="blue"
            onClick={handleAddAddress}
            {...({} as React.ComponentProps<typeof Button>)} // Typecasting to avoid type error
            className="cursor-pointer text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-xs px-2 py-1 text-center"
          >
            {address?.flatNumberName ? (
              <Pencil className="inline size-4" />
            ) : (
              <Plus className="inline size-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="block w-full mt-2 text-gray-600">
        {address?.flatNumberName && (
          <>
            <p className="block w-full">{address?.flatNumberName},</p>
            <p className="block">
              {address?.addressLine1}, {address?.addressLine2}
              {address?.addressLine2 ? "," : ""}
            </p>
            <p className="block">
              {" "}
              {address?.postOffice}(PO), {address?.city} (Dist.)
            </p>
            <p className="block">
              {" "}
              {address?.state} - {address?.pincode}
            </p>
            <p className="block"> {address?.contactNumber}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
