import React from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  IconButton,
} from "@material-tailwind/react";
import FamilyDetailsForm from "../FamilyDetailsForm";
import { X } from "lucide-react";

const FamilyDetailsDialog = ({ open, onClose }: any) => {
  const handleOnSave = () => {
    console.log("Saved the family Details");
  };
  return (
    <Dialog
      size="lg"
      open={open}
      handler={onClose}
      className="flex flex-col items-center justify-center scroll-auto"
      dismiss={{ outside: false }}
    >
      <DialogHeader className="w-full justify-between">
        <h2>Add a family member</h2>
        <X
          onClick={onClose}
          className="cursor-pointer text-lg font-semibold w-[10%] mb-4 text-gray-600"
        />
      </DialogHeader>
      <DialogBody>
        <FamilyDetailsForm onChange={handleOnSave} />
      </DialogBody>
      <DialogFooter className="w-full">
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="button"
        >
          Save Details
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default FamilyDetailsDialog;
