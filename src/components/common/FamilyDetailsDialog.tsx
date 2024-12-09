import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import FamilyDetailsForm from "../FamilyDetailsForm";
import { X } from "lucide-react";
import { FamilyDetails } from "../../types/Users";

const FamilyDetailsDialog = ({ open, onClose }: any) => {
  const handleOnFormSave = (familyDetails: FamilyDetails) => {
    onClose();
  };

  return (
    <Dialog
      size="sm"
      open={open}
      handler={onClose}
      className="flex flex-col items-center justify-center"
      dismiss={{ outside: false }}
    >
      <DialogHeader className="w-full justify-between">
        <h2 className="text-center w-full ml-[10%]">Add a family member</h2>
        <X
          onClick={onClose}
          className="cursor-pointer text-lg font-semibold w-[10%] mb-4 text-gray-600"
        />
      </DialogHeader>
      <DialogBody>
        <FamilyDetailsForm onSaveDetails={handleOnFormSave} />
      </DialogBody>
      <DialogFooter className="w-full">
        <p></p>
      </DialogFooter>
    </Dialog>
  );
};

export default FamilyDetailsDialog;
