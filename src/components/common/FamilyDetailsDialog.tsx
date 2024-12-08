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
  const handleOnFormChange = (familyDetails: FamilyDetails) => {
    console.log("Updated family Details : ", familyDetails);
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
        <FamilyDetailsForm onChange={handleOnFormChange} />
      </DialogBody>
      <DialogFooter className="w-full">
        <p></p>
      </DialogFooter>
    </Dialog>
  );
};

export default FamilyDetailsDialog;
