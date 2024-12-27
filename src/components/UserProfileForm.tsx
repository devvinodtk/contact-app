import React, { useEffect, useState } from "react";
import {
  Members,
  BloodGroup,
  Address,
  AddressType,
  FamilyDetails,
  UserOps,
  AddressChangeType,
} from "../types/Users";

import AddressForm from "./AddressForm";
import DropdownSelect from "./common/DropdownSelect";
import GeoLocationDisplay from "./GeoLocationDisplay";
import Header from "./common/Header";
import ProfilePicUploader from "./common/ProfilePicUploader";
import PopupContainer from "./common/PopupContainer";
import FamilyDetailsTable from "./FamilyDetailsTable";
import { Member_Address, Member_Details } from "../types/Users_Mock";
import { useDispatch } from "react-redux";
import { addMember } from "../store/MembersSlice";
import {
  communicationPreferenceOptions,
  educationLevelOptions,
  genderOptions,
  setTodayDate,
} from "../utils/Utility_Functions";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import FamilyDetailsForm from "./FamilyDetailsForm";
import AddressCard from "./common/AddressCard";

const UserProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ user: Members }>({
    mode: "all",
    defaultValues: {
      user: Member_Details,
    },
  });
  const [user, setUser] = useState<Members>(Member_Details);
  const [open, setOpen] = useState(false); // Maintains open/close state of Family Details Popup
  const [familyDetails, setFamilyDetails] = useState<FamilyDetails[]>([]);
  const [presentAddress, setPresentAddress] = useState<Address>();
  const [permanentAddress, setPermanentAddress] = useState<Address>();
  const [officeAddress, setOfficeAddress] = useState<Address>();
  const [today, setToday] = useState("");
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [currentAddressChange, setCurrentAddressChange] =
    useState<AddressChangeType>({} as AddressChangeType);

  const handleClose = () => setOpen(false); // Callback function to close the Family Details Popup
  const handleAddMember = () => setOpen(true); // Callback function to open the Family Details Popup
  const handleAddAddress = ({ operation, addressType }: AddressChangeType) => {
    setCurrentAddressChange({ operation, addressType });
    setOpenAddressDialog(true);
  }; // Callback function to open the Address Popup
  const handleCloseAddress = () => setOpenAddressDialog(false);
  const dispatch = useDispatch();

  const handleResetForm = () => {
    setUser(Member_Details);
    setFamilyDetails([]);
    setPresentAddress(Member_Address);
    setPermanentAddress(Member_Address);
    setOfficeAddress(Member_Address);
  };

  // const members_state: Members = useSelector((state: any) => state.members);

  const handleCopyPresentAddressChange = (value: boolean) => {
    if (value && presentAddress && presentAddress.flat_number_name) {
      setPermanentAddress(presentAddress);
    } else {
      setPermanentAddress(Member_Address);
    }
  };

  const handlSaveFamilyDetails = (family_details: FamilyDetails) => {
    setFamilyDetails((prevFamilyMembers) => [
      ...prevFamilyMembers,
      family_details,
    ]);
    setOpen(false);
  };

  const handleSaveMembersForm = () => {
    const present_address =
      presentAddress && presentAddress.flat_number_name ? presentAddress : null;

    const permanent_address =
      permanentAddress && permanentAddress.flat_number_name
        ? permanentAddress
        : null;

    const office_address =
      officeAddress && officeAddress.flat_number_name ? officeAddress : null;

    const userObj = {
      ...user,
      present_address,
      permanent_address,
      family_details:
        familyDetails && familyDetails.length ? familyDetails : [],
      office_address,
    };

    setUser(userObj);

    if (
      present_address?.flat_number_name &&
      permanent_address?.flat_number_name
    ) {
      dispatch(addMember(userObj));
      handleResetForm();
    }
  };

  const handleAddressChange = (addressType: AddressType, value: Address) => {
    if (addressType === AddressType.PresentAddress) {
      setPresentAddress(value);
    } else if (addressType === AddressType.PermanentAddress) {
      setPermanentAddress(value);
    } else if (addressType === AddressType.OfficeAddress) {
      setOfficeAddress(value);
    }
    handleCloseAddress();
  };

  useEffect(() => {
    setToday(setTodayDate());
  }, []);

  const onHandleSaveMembersForm: SubmitHandler<{ user: Members }> = () => {
    handleSaveMembersForm();
  };

  return (
    <form  autoComplete="off"
      className="flex-1 overflow-auto relative z-10"
      onSubmit={handleSubmit(onHandleSaveMembersForm)}
    >
      <Header title="Add Members" />
      <div className="p-4 w-full mt-16 sm:mt-0">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/4">
            <div className="bg-white">
              <div className="bg-gray-50 min-h-56 flex w-full mt-1 border items-center rounded">
                <ProfilePicUploader />
              </div>
            </div>
          </div>
          <div className="w-full sm:w-3/4 ">
            <div className="flex flex-wrap">
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="Name"  autoComplete="off"
                  {...register(`user.personal_details.name`, {
                    required: "Name is required",
                  })}
                  value={user.personal_details.name}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      personal_details: {
                        ...user.personal_details,
                        name: e.target.value,
                      },
                    })
                  }
                  className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                    errors.user?.personal_details?.name
                      ? "focus:outline-none border-red-500 bg-red-50"
                      : ""
                  }`}
                />
              </div>
              <div className="w-full sm:w-1/3 sm:pl-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Mobile Number *
                </label>
                <input
                  type="number"
                  placeholder="Mobile number"  autoComplete="off"
                  {...register(`user.personal_details.mobile_number`, {
                    required: "Mobile number is required", minLength:10, maxLength: 10
                  })}
                  value={user.personal_details?.mobile_number}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      personal_details: {
                        ...user.personal_details,
                        mobile_number: e.target.value,
                      },
                    })
                  }
                  className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                    errors.user?.personal_details?.mobile_number
                      ? "focus:outline-none border-red-500 bg-red-50"
                      : ""
                  }`}
                />
              </div>
              <div className="w-full sm:w-1/3 sm:pl-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Email ID *
                </label>
                <input
                  type="email"  autoComplete="off"
                  {...register(`user.personal_details.email_id`, {
                    required: "Email ID is required", pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
                  })}
                  placeholder="Email ID"
                  value={user.personal_details?.email_id}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      personal_details: {
                        ...user.personal_details,
                        email_id: e.target.value,
                      },
                    })
                  }
                  className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                    errors.user?.personal_details?.email_id
                      ? "focus:outline-none border-red-500 bg-red-50"
                      : ""
                  }`}
                />
              </div>
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Date of Birth *
                </label>
                <input
                  type="date"  autoComplete="off"
                  max={today}
                  {...register(`user.personal_details.date_of_birth`, {
                    required: "Date of birth is required",
                  })}
                  placeholder="Date of Birth"
                  value={user.personal_details.date_of_birth}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      personal_details: {
                        ...user.personal_details,
                        date_of_birth: e.target.value,
                      },
                    })
                  }
                  className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                    errors.user?.personal_details?.date_of_birth
                      ? "focus:outline-none border-red-500 bg-red-50"
                      : ""
                  }`}
                />
              </div>
              <div className="w-full sm:w-1/3 sm:pl-4">
                <DropdownSelect
                  label="Gender *" 
                  options={genderOptions}
                  {...register(`user.personal_details.gender`, {
                    required: "Gender is required",
                    validate: (value) =>
                      value !== "Select Gender" ||
                      "Please select a valid gender",
                  })}
                  error={errors.user?.personal_details?.gender}
                  value={user.personal_details?.gender}
                  onChange={(value) =>
                    setUser({
                      ...user,
                      personal_details: {
                        ...user.personal_details,
                        gender: value,
                      },
                    })
                  }
                />
              </div>
              <div className="w-full sm:w-1/3 sm:pl-4">
                <DropdownSelect
                  label="Blood Group *"
                  options={Object.values(BloodGroup)}
                  {...register(`user.personal_details.blood_group`, {
                    required: "Blood Group is required",
                    validate: (value) =>
                      value !== "Select Blood Group" ||
                      "Please select a valid blood group",
                  })}
                  error={errors.user?.personal_details?.blood_group}
                  value={user.personal_details?.blood_group}
                  onChange={(value) =>
                    setUser({
                      ...user,
                      personal_details: {
                        ...user.personal_details,
                        blood_group: value,
                      },
                    })
                  }
                />
              </div>
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Occupation *
                </label>
                <input
                  type="text"  autoComplete="off"
                  placeholder="Occupation"
                  {...register(`user.personal_details.job_title`, {
                    required: "Occupation is required",
                  })}
                  value={user.personal_details.job_title}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      personal_details: {
                        ...user.personal_details,
                        job_title: e.target.value,
                      },
                    })
                  }
                  className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                    errors.user?.personal_details?.job_title
                      ? "focus:outline-none border-red-500 bg-red-50"
                      : ""
                  }`}
                />
              </div>
              <div className="w-full sm:w-1/3 sm:pl-4">
                <DropdownSelect
                  label="Educational Qualification *"
                  {...register(
                    `user.personal_details.educational_qualification.education_level`,
                    {
                      required: "Education level is required",
                      validate: (value) =>
                        value !== "Select Education" ||
                        "Please select a valid education level",
                    }
                  )}
                  error={
                    errors.user?.personal_details?.educational_qualification
                      ?.education_level
                  }
                  options={educationLevelOptions}
                  value={
                    user.personal_details?.educational_qualification
                      .education_level
                  }
                  onChange={(value) =>
                    setUser({
                      ...user,
                      personal_details: {
                        ...user.personal_details,
                        educational_qualification: { education_level: value },
                      },
                    })
                  }
                />
              </div>
              <div className="w-full sm:w-1/3 sm:pl-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder="Specialization"
                  value={
                    user.personal_details?.educational_qualification
                      .specialization
                  }
                  onChange={(e) =>
                    setUser({
                      ...user,
                      personal_details: {
                        ...user.personal_details,
                        educational_qualification: {
                          specialization: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full p-2 border rounded mb-4 text-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
          <AddressCard
            address={presentAddress}
            addressType={AddressType.PresentAddress}
            onEdit={({ operation, addressType }) =>
              handleAddAddress({ operation, addressType })
            }
          />
          <AddressCard
            address={permanentAddress}
            copyAddress={true}
            addressType={AddressType.PermanentAddress}
            onEdit={({ operation, addressType }) =>
              handleAddAddress({ operation, addressType })
            }
            onCopyPresentAddress={handleCopyPresentAddressChange}
          />
          <AddressCard
            address={officeAddress}
            addressType={AddressType.OfficeAddress}
            onEdit={({ operation, addressType }) =>
              handleAddAddress({ operation, addressType })
            }
          />
        </div>

        <PopupContainer
          header={`${currentAddressChange.operation} ${currentAddressChange.addressType}`}
          open={openAddressDialog}
          onClose={handleCloseAddress}
        >
          <AddressForm
            addressType={currentAddressChange.addressType}
            addressInfo={
              currentAddressChange.addressType === AddressType.PresentAddress
                ? presentAddress
                : currentAddressChange.addressType ===
                  AddressType.PermanentAddress
                ? permanentAddress
                : officeAddress
            }
            onAddressChange={(addressType, value) =>
              handleAddressChange(addressType, value)
            }
          />
        </PopupContainer>

        {/* Permanent Address Form */}
        {/* <AddressForm
          label="Permanent Address"
          copyAddress={true}
          addressInfo={permanentAddress}
          onAddressChange={(value) =>
            handleAddressChange(AddressType.PermanentAddress, value)
          }
          onCopyPresentAddress={handleCopyPresentAddressChange}
        /> }
        {/* Office Address Form */}
        {/* <AddressForm
          label="Office Address"
          addressInfo={officeAddress}
          onAddressChange={(value) =>
            handleAddressChange(AddressType.OfficeAddress, value)
          }
        /> */}
        <div className="p-4 border rounded-lg mt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1  text-left">
              <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Add Family Members
              </h2>
            </div>
            <div className="flex-1 text-right">
              <Button
                variant="text"
                color="blue"
                onClick={handleAddMember}
                {...({} as React.ComponentProps<typeof Button>)} // Typecasting to avoid type error
                className="cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <Plus className="inline size-4" /> Add Member
              </Button>
            </div>
          </div>

          <PopupContainer
            open={open}
            header="Add Family Member"
            onClose={handleClose}
          >
            <FamilyDetailsForm onSaveDetails={handlSaveFamilyDetails} />
          </PopupContainer>
          <FamilyDetailsTable fmaily_members={familyDetails} />
        </div>

        <div className="flex flex-col mt-6 gap-4 md:flex-row">
          <div className="flex-1 p-4 border rounded">
            <GeoLocationDisplay geoLocation={user.geo_location} />
          </div>
          <div className="flex-1 p-4 border rounded">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Office Use
            </h2>
            <label className="text-gray-600 text-sm font-medium">
              Proposed by
            </label>
            <input
              value={user.proposed_by}
              {...register(`user.proposed_by`, {
                required: "Proposed by is required",
              })}
              onChange={(e) =>
                setUser({ ...user, proposed_by: e.target.value })
              }
              type="text"
              className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                errors.user?.proposed_by
                  ? "focus:outline-none border-red-500 bg-red-50"
                  : ""
              }`}
            />
            <DropdownSelect
              label="Communication Preference"
              options={communicationPreferenceOptions}
              value={user.communication_preference}
              {...register(`user.communication_preference`, {
                required: "Communication Preference is required",
                validate: (value) =>
                  value !== "Select Your Preference" ||
                  "Please select a valid preference",
              })}
              error={errors.user?.communication_preference}
              onChange={(value) =>
                setUser({ ...user, communication_preference: value })
              }
            />
            <label className="text-gray-600 text-sm font-medium">
              Comments
            </label>
            <input
              value={user.comments}
              onChange={(e) => setUser({ ...user, comments: e.target.value })}
              type="text"
              className="p-2 border mb-3 rounded w-full text-gray-600"
            />
          </div>
        </div>
      </div>
      <div className="p-4 w-full bg-gray-50 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center">
          
          <Button
            type="button"
            onClick={handleResetForm}
            className="mt-4 sm:mt-0 order-1 sm:order-none  cursor-pointer text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            {...({} as React.ComponentProps<typeof Button>)}
          >
            Reset
          </Button>
          <Button
            onClick={handleSaveMembersForm}
            type="submit"
            color="blue"
            className="ml-0 sm:ml-4 order-none sm:order-1 cursor-pointer text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            {...({} as React.ComponentProps<typeof Button>)}
          >
            Save Member Details
          </Button>
        </div>

      </div>
    </form>
  );
};

export default UserProfileForm;
