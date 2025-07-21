import { Button, Typography } from "@material-tailwind/react";
import { typographyProps } from "../types/Users";
interface interfaceRegistrationInfoProps {
  onAgreeAndConfirm: () => void;
}

const RegistrationInfo = ({
  onAgreeAndConfirm,
}: interfaceRegistrationInfoProps) => {
  return (
    <main className="text-justify">
      <Typography
        className="font-bold pb-1"
        {...(typographyProps as React.ComponentProps<typeof Typography>)}
      >
        Welcome to the Kalakairali Member Management System!
      </Typography>
      <Typography
        className="leading-relaxed pb-2"
        {...(typographyProps as React.ComponentProps<typeof Typography>)}
      >
        Please ensure that you complete all the available information,
        including:{" "}
        <strong>
          Profile Picture, Personal Details, Address Details, Family Details and
          Location
        </strong>
        .
      </Typography>
      <Typography
        className="leading-relaxed pb-1"
        {...(typographyProps as React.ComponentProps<typeof Typography>)}
      >
        <strong>Note:</strong> Once the details are saved, you will not be able
        to modify them yourself.
      </Typography>
      <Typography
        className="leading-relaxed pb-1"
        {...(typographyProps as React.ComponentProps<typeof Typography>)}
      >
        For any changes or updates, please contact the admin team at{" "}
        <strong>+91-8792527628</strong>. Thank you
      </Typography>
      <Typography
        className="leading-relaxed pb-1 italic"
        {...(typographyProps as React.ComponentProps<typeof Typography>)}
      >
        This information will be used solely for communication and activities
        related to Kalakairali. By providing your personal information as
        mentioned above you consent to the collection and processing of this
        data.
      </Typography>
      <div className="flex-1 text-left">
        <Button
          variant="text"
          color="blue"
          onClick={()=>{ window.open("/privacy-policy", "_blank")}}
          {...({} as React.ComponentProps<typeof Button>)} // Typecasting to avoid type error
          className="cursor-pointer hover:bg-primary-700 focus:outline-none
           font-medium rounded-lg text-sm px-0 py-2.5 text-center"
        >
          Read Privacy Policy
        </Button>
      </div>
      <div className="p-4 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center">
          <Button
            type="submit"
            color="blue"
            onClick={() => {
              onAgreeAndConfirm();
            }}
            className="mb-4 sm:mb-0 order-0 cursor-pointer sm:mr-2 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            {...({} as React.ComponentProps<typeof Button>)}
          >
            Agree and Continue
          </Button>
        </div>
      </div>
    </main>
  );
};

export default RegistrationInfo;
