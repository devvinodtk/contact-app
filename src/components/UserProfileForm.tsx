import React, { useState } from "react";
import {
  Users,
  BloodGroup,
  AreaCode,
  CommunicationPreference,
  GeoLocation,
  Address,
  Gender,
} from "../types/Users";
import AddressForm from "./AddressForm";
import DropdownSelect from "./DropdownSelect";
import FamilyDetailsForm from "./FamilyDetailsForm";
import GeoLocationDisplay from "./GeoLocationDisplay";
import Header from "./common/Header";

const UserProfileForm: React.FC = () => {
  const [user, setUser] = useState<Users>({
    name: "",
    profile_photo_url: "",
    mobile_number: "",
    email_id: "",
    date_of_birth: "",
    blood_group: BloodGroup.APositive,
    gender: "Male",
    present_address: {
      flat_number_name: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      pin_code: "",
      contact_number: "",
    },
    permanent_address: {
      flat_number_name: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      pin_code: "",
      contact_number: "",
    },
    office_address: {
      flat_number_name: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      pin_code: "",
      contact_number: "",
    },
    educational_qualification: {
      education_level: "High School",
      specialization: "",
    },
    job_title: "",
    family_details: undefined,
    proposed_by: "",
    seconded_by: "",
    communication_preference: "In Person",
    date_of_joining: new Date(),
    area_code: AreaCode.SNPS,
    is_inactive: false,
    geo_location: { latitude: 12.9716, longitude: 77.5946 }, // Example coordinates (Bangalore)
  });

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
        <label className="block text-sm font-medium mb-1 text-gray-600">
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full p-2 border rounded mb-4 text-gray-600"
        />

        <label className="block text-sm font-medium mb-1 text-gray-600">
          Email ID
        </label>
        <input
          type="email"
          placeholder="Email ID"
          value={user.email_id}
          onChange={(e) => setUser({ ...user, email_id: e.target.value })}
          className="w-full p-2 border rounded mb-4 text-gray-600"
        />

        <label className="block text-sm font-medium mb-1 text-gray-600">
          Date of Birth
        </label>
        <input
          type="date"
          placeholder="Date of Birth"
          value={user.date_of_birth}
          onChange={(e) => setUser({ ...user, date_of_birth: e.target.value })}
          className="w-full p-2 border rounded mb-4 text-gray-600"
        />

        <DropdownSelect
          label="Gender"
          options={["Male", "Female", "Other", "Prefer not to say"] as Gender[]}
          value={user.gender}
          onChange={(value) => setUser({ ...user, gender: value })}
        />

        <DropdownSelect
          label="Blood Group"
          options={Object.values(BloodGroup)}
          value={user.blood_group}
          onChange={(value) => setUser({ ...user, blood_group: value })}
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
          value={user.educational_qualification.education_level}
          onChange={(value) =>
            setUser({
              ...user,
              educational_qualification: { education_level: value },
            })
          }
        />
        <input
          type="text"
          placeholder="Specialization"
          value={user.educational_qualification.specialization}
          onChange={(e) =>
            setUser({
              ...user,
              educational_qualification: { specialization: e.target.value },
            })
          }
          className="w-full p-2 border rounded mb-4 text-gray-600"
        />

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
        <FamilyDetailsForm
          familyDetails={user.family_details}
          onChange={() => {}}
        />
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
    </div>
  );
};

export default UserProfileForm;
