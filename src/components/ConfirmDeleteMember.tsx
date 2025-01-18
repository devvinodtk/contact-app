import { Button } from "@material-tailwind/react";
import { DeleteAction } from "../types/Users";

interface DeleteMemberProps {
  memberId: string;
  onConfirmDelete: (memberId: string, deleteAction: DeleteAction) => void;
}

const ConfirmDeleteMember = ({
  memberId,
  onConfirmDelete,
}: DeleteMemberProps) => {
  return (
    <>
      <p>
        Are you sure you want to delete the member? Once deleted the records
        cannot be retrieved again.
      </p>
      <p>Optionally you may choose to deactivate the member. Please confirm</p>
      <div className="p-4 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center">
          <Button
            type="submit"
            color="blue"
            onClick={() => {
              onConfirmDelete && onConfirmDelete(memberId, "hard_delete");
            }}
            className="mb-4 sm:mb-0 order-1 sm:order-2 cursor-pointer sm:mr-2 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            {...({} as React.ComponentProps<typeof Button>)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            type="button"
            color="blue"
            onClick={() => {
              onConfirmDelete && onConfirmDelete(memberId, "soft_delete");
            }}
            className="mb-4 sm:mb-0 order-0 sm:order-1 cursor-pointer mr-0 sm:mr-2 text-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            {...({} as React.ComponentProps<typeof Button>)}
          >
            Deactivate
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteMember;
