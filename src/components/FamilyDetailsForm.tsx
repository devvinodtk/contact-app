import React, { useCallback, useState } from "react";
import {
  PersonalDetails,
  FamilyDetails,
  BloodGroup,
  Gender,
  RelationshipType,
  EducationalQualification,
} from "../types/Users";
import DropdownSelect from "./DropdownSelect";
import { Family_Details } from "../types/Users_Mock";
import debounce from "lodash/debounce";
import { Button } from "@material-tailwind/react";
import { formatDate } from "../utils/Utility_Functions";

interface FamilyDetailsFormProps {
  familyDetails?: FamilyDetails;
  onSaveDetails: (details: FamilyDetails) => void;
}

const FamilyDetailsForm: React.FC<FamilyDetailsFormProps> = ({
  familyDetails,
  onSaveDetails,
}) => {
  const [memberFamilyDetails, setMemberFamilyDetails] =
    useState<FamilyDetails>(Family_Details);

  const handleSaveFormClick = () => {
    onSaveDetails(memberFamilyDetails);
  };

  const debouncedHandleChange = useCallback(
    debounce(
      (
        field:
          | keyof FamilyDetails
          | keyof EducationalQualification
          | keyof PersonalDetails,
        value: any
      ) => {
        if (field === "relationship") {
          setMemberFamilyDetails((prevState: FamilyDetails) => ({
            ...prevState,
            relationship: value,
          }));
        } else if (field === "name") {
          setMemberFamilyDetails((prevState: FamilyDetails) => ({
            ...prevState,
            member_personal_details: {
              ...prevState.member_personal_details,
              name: value,
            },
          }));
        } else if (field === "gender") {
          setMemberFamilyDetails((prevState: FamilyDetails) => ({
            ...prevState,
            member_personal_details: {
              ...prevState.member_personal_details,
              gender: value,
            },
          }));
        } else if (field === "blood_group") {
          setMemberFamilyDetails((prevState: FamilyDetails) => ({
            ...prevState,
            member_personal_details: {
              ...prevState.member_personal_details,
              blood_group: value,
            },
          }));
        } else if (field === "education_level") {
          setMemberFamilyDetails((prevState: FamilyDetails) => ({
            ...prevState,
            member_personal_details: {
              ...prevState.member_personal_details,
              educational_qualification: {
                ...prevState.member_personal_details.educational_qualification,
                education_level: value,
              },
            },
          }));
        } else if (field === "specialization") {
          setMemberFamilyDetails((prevState: FamilyDetails) => ({
            ...prevState,
            member_personal_details: {
              ...prevState.member_personal_details,
              educational_qualification: {
                ...prevState.member_personal_details.educational_qualification,
                specialization: value,
              },
            },
          }));
        } else if (field === "job_title") {
          setMemberFamilyDetails((prevState: FamilyDetails) => ({
            ...prevState,
            member_personal_details: {
              ...prevState.member_personal_details,
              job_title: value,
            },
          }));
        } else if (field === "date_of_birth") {
          setMemberFamilyDetails((prevState: FamilyDetails) => ({
            ...prevState,
            member_personal_details: {
              ...prevState.member_personal_details,
              date_of_birth: formatDate(value),
            },
          }));
        }
      },
      500
    ),
    []
  );
  const handleChange = (
    field:
      | keyof FamilyDetails
      | keyof EducationalQualification
      | keyof PersonalDetails,
    value: any
  ) => {
    debouncedHandleChange(field, value);
  };

  return (
    <>
      <div className="w-full">
        <div className="">
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            value={familyDetails?.member_personal_details?.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full p-2 mb-4 border rounded text-gray-600"
          />
          <DropdownSelect
            label="Gender"
            options={
              ["Male", "Female", "Other", "Prefer not to say"] as Gender[]
            }
            value={familyDetails?.member_personal_details?.gender}
            onChange={(value) => handleChange("gender", value)}
          />
          <DropdownSelect
            label="Relationship"
            options={
              [
                "Spouse",
                "Kid",
                "Father",
                "Mother",
                "Father In Law",
                "Mother In Law",
              ] as RelationshipType[]
            }
            value={familyDetails?.relationship}
            onChange={(value) => handleChange("relationship", value)}
          />
          <DropdownSelect
            label="Blood Group"
            options={Object.values(BloodGroup)}
            value={familyDetails?.member_personal_details?.blood_group}
            onChange={(value) => handleChange("blood_group", value)}
          />
          {/* Additional fields for family details */}
          <DropdownSelect
            label="Educational Qualification"
            options={[
              "Nursery",
              "Kindergarten",
              "Primary School",
              "High School",
              "Higher Secondary",
              "Bachelors Degree",
              "Masters Degree",
              "PhD",
            ]}
            value={
              familyDetails?.member_personal_details?.educational_qualification
                .education_level
            }
            onChange={(value) => handleChange("education_level", value)}
          />
          <input
            type="text"
            placeholder="Specialization"
            value={
              familyDetails?.member_personal_details?.educational_qualification
                .specialization
            }
            onChange={(e) => handleChange("specialization", e.target.value)}
            className="w-full p-2 border rounded text-gray-600"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={familyDetails?.member_personal_details?.job_title}
            onChange={(e) => handleChange("job_title", e.target.value)}
            className="w-full p-2 mt-6 border rounded text-gray-600"
          />
          <label className="block text-sm font-medium mt-6 mb-1 text-gray-600">
            Date of Birth
          </label>
          <input
            type="date"
            placeholder="Date of Birth"
            value={familyDetails?.member_personal_details?.date_of_birth}
            onChange={(e) => handleChange("date_of_birth", e.target.value)}
            className="w-full p-2 border rounded text-gray-600"
          />
        </div>
        <Button
          onClick={handleSaveFormClick}
          color="blue"
          className="w-full cursor-pointer text-white mt-6 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          {...({} as React.ComponentProps<typeof Button>)}
        >
          Save Details
        </Button>
      </div>
    </>
  );
};

export default FamilyDetailsForm;
