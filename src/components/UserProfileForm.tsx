import React, { useState } from "react";
import {
  Members,
  BloodGroup,
  CommunicationPreference,
  Address,
  Gender,
} from "../types/Users";

import AddressForm from "./AddressForm";
import DropdownSelect from "./DropdownSelect";
import GeoLocationDisplay from "./GeoLocationDisplay";
import Header from "./common/Header";
import ProfilePicUploader from "./common/ProfilePicUploader";
import FamilyDetailsDialog from "./common/FamilyDetailsDialog";
import FamilyDetailsTable from "./common/FamilyDetailsTable";
import { Member_Details } from "../types/Users_Mock";

const UserProfileForm: React.FC = () => {
  const [user, setUser] = useState<Members>(Member_Details);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleAddMember = () => setOpen(true);

  const handleAddressChange = (
    addressType: "present_address" | "permanent_address" | "office_address",
    field: keyof Address,
    value: string
  ) => {
    setUser((prevUser) => ({
      ...prevUser,
      [addressType]: {
        ...prevUser[addressType],
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Add Members" />
      <div className="p-4 w-full">
        <div className="container mx-auto">
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
            <div className="bg-white">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Mobile Number
              </label>
              <input
                type="email"
                placeholder="Mobile number"
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
        </div>
        {/* Present Address Form */}
        <AddressForm
          label="Present Address"
          address={user.present_address}
          onChange={(field, value) =>
            handleAddressChange("present_address", field, value)
          }
        />
        {/* Permanent Address Form */}
        <AddressForm
          label="Permanent Address"
          address={user.permanent_address}
          onChange={(field, value) =>
            handleAddressChange("permanent_address", field, value)
          }
        />
        {/* Office Address Form */}
        <AddressForm
          label="Office Address"
          address={user.office_address}
          onChange={(field, value) =>
            handleAddressChange("office_address", field, value)
          }
        />
        <button
          onClick={handleAddMember}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Family Member
        </button>
        <FamilyDetailsDialog open={open} onClose={handleClose} />;
        <FamilyDetailsTable />
        <GeoLocationDisplay geoLocation={user.geo_location} />
        {/* Additional form fields here */}
        <DropdownSelect
          label="Communication Preference"
          options={["In Person", "Postal"] as CommunicationPreference[]}
          value={user.communication_preference}
          onChange={(value) =>
            setUser({ ...user, communication_preference: value })
          }
        />
      </div>
      <div className="container mx-auto p-4 w-full bg-gray-50 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="reset"
            className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
