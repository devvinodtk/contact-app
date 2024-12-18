import React, { useEffect, useState } from "react";
import {
  Members,
  BloodGroup,
  CommunicationPreference,
  Address,
  Gender,
  AddressType,
  FamilyDetails,
} from "../types/Users";

import AddressForm from "./AddressForm";
import DropdownSelect from "./DropdownSelect";
import GeoLocationDisplay from "./GeoLocationDisplay";
import Header from "./common/Header";
import ProfilePicUploader from "./common/ProfilePicUploader";
import FamilyDetailsDialog from "./common/FamilyDetailsDialog";
import FamilyDetailsTable from "./common/FamilyDetailsTable";
import { Member_Address, Member_Details } from "../types/Users_Mock";
import { useDispatch } from "react-redux";
import { addMember } from "../store/MembersSlice";

const UserProfileForm: React.FC = () => {
  const [user, setUser] = useState<Members>(Member_Details);
  const [open, setOpen] = useState(false); // Maintains open/close state of Family Details Popup
  const [familyDetails, setFamilyDetails] = useState<FamilyDetails[]>([]);
  const [presentAddress, setPresentAddress] = useState<Address>();
  const [permanentAddress, setPermanentAddress] = useState<Address>();
  const [officeAddress, setOfficeAddress] = useState<Address>();
  const [today, setToday] = useState("");

  const handleClose = () => setOpen(false); // Callback function to close the Family Details Popup
  const handleAddMember = () => setOpen(true); // Callback function to open the Family Details Popup

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
  };

  // Set today's date in YYYY-MM-DD format
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setToday(formattedDate);
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Add Members" />
      <div className="p-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white">
            <div className="bg-gray-50 min-h-56 flex w-full mt-1 border items-center rounded">
              <ProfilePicUploader />
            </div>
          </div>
          <div className="bg-white">
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
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
              className="w-full p-2 border rounded mb-4 text-gray-600"
            />
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              max={today}
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
              className="w-full p-2 border rounded mb-4 text-gray-600"
            />
            <DropdownSelect
              label="Educational Qualification"
              options={[
                "High School",
                "Higher Secondary",
                "Bachelors Degree",
                "Masters Degree",
                "PhD",
              ]}
              value={
                user.personal_details?.educational_qualification.education_level
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
          <div className="bg-white">
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Mobile Number
            </label>
            <input
              type="email"
              placeholder="Mobile number"
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
              className="w-full p-2 border rounded mb-4 text-gray-600"
            />

            <DropdownSelect
              label="Gender"
              options={
                ["Male", "Female", "Other", "Prefer not to say"] as Gender[]
              }
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

            <span className="pt-3 float-left">
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
            </span>
          </div>
          <div className="bg-white">
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Email ID
            </label>
            <input
              type="email"
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
              className="w-full p-2 border rounded mb-4 text-gray-600"
            />
            <DropdownSelect
              label="Blood Group"
              options={Object.values(BloodGroup)}
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
        </div>
        {/* Present Address Form */}
        <AddressForm
          label="Present Address"
          addressInfo={presentAddress}
          onAddressChange={(value) =>
            handleAddressChange(AddressType.PresentAddress, value)
          }
        />
        {/* Permanent Address Form */}
        <AddressForm
          label="Permanent Address"
          copyAddress={true}
          addressInfo={permanentAddress}
          onAddressChange={(value) =>
            handleAddressChange(AddressType.PermanentAddress, value)
          }
          onCopyPresentAddress={handleCopyPresentAddressChange}
        />
        {/* Office Address Form */}
        <AddressForm
          label="Office Address"
          addressInfo={officeAddress}
          onAddressChange={(value) =>
            handleAddressChange(AddressType.OfficeAddress, value)
          }
        />
        <div className="p-4 border rounded-lg mt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1  text-left">
              <h2 className="text-lg font-semibold mb-4 text-gray-600">
                Family Members
              </h2>
            </div>
            <div className="flex-1 text-right">
              <button
                onClick={handleAddMember}
                className="bg-blue-600 text-white px-4 py-2 mb-2 rounded"
              >
                Add Family Member
              </button>
            </div>
          </div>

          <FamilyDetailsDialog
            open={open}
            onClose={handleClose}
            onSaveFamilyDetails={handlSaveFamilyDetails}
          />
          <FamilyDetailsTable fmaily_members={familyDetails} />
        </div>

        <div className="flex flex-wrap gap-4 border rounded p-4  mt-6">
          <div className="flex-1 min-w-[200px]">
            <GeoLocationDisplay geoLocation={user.geo_location} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Office Use
            </h2>
            <label className="text-gray-600 text-sm font-medium">
              Proposed by
            </label>
            <input
              value={user.proposed_by}
              onChange={(e) =>
                setUser({ ...user, proposed_by: e.target.value })
              }
              type="text"
              className="p-2 border mb-3 rounded w-full text-gray-600"
            />
            <DropdownSelect
              label="Communication Preference"
              options={["In Person", "Postal"] as CommunicationPreference[]}
              value={user.communication_preference}
              onChange={(value) =>
                setUser({ ...user, communication_preference: value })
              }
            />
          </div>
        </div>
      </div>
      <div className="p-4 w-full bg-gray-50 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={handleResetForm}
            className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={handleSaveMembersForm}
            type="button"
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Save Member Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
