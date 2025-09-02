import { Button } from '@material-tailwind/react';

interface ConfirmLogoutProps {
  onConfirmLogout: () => void;
  onCancelLogout: () => void;
}

const ConfirmLogout = ({
  onConfirmLogout,
  onCancelLogout,
}: ConfirmLogoutProps) => (
  <>
    <p>
      Are you sure you want to Logout? Click &apos;Yes&apos; to continue
      or &apos;Cancel&apos; to stay logged in.
    </p>
    <div className="p-4 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center">
        <Button
          type="submit"
          color="blue"
          onClick={() => onConfirmLogout()}
          className="mb-4 sm:mb-0 order-1
          sm:order-2 cursor-pointer sm:mr-2 text-white
          hover:bg-primary-700 focus:ring-4 focus:outline-none
          focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...({} as React.ComponentProps<typeof Button>)}
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          type="button"
          color="blue"
          onClick={() => onCancelLogout()}
          className="mb-4 sm:mb-0 order-0 sm:order-1
          cursor-pointer mr-0 sm:mr-2 text-blue-500
          hover:bg-primary-700 focus:ring-4 focus:outline-none
          focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...({} as React.ComponentProps<typeof Button>)}
        >
          Cancel
        </Button>
      </div>
    </div>
  </>
);

export default ConfirmLogout;
