import React from "react";
import {
  PersonalDetails,
  FamilyDetails,
  BloodGroup,
  Gender,
  RelationshipType,
  EducationalQualification,
} from "../types/Users";
import DropdownSelect from "./DropdownSelect";

interface FamilyDetailsFormProps {
  familyDetails?: FamilyDetails;
  onChange: (details: FamilyDetails) => void;
}

const FamilyDetailsForm: React.FC<FamilyDetailsFormProps> = ({
  familyDetails,
  onChange,
}) => {
  const handleChange = (
    field:
      | keyof FamilyDetails
      | keyof EducationalQualification
      | keyof PersonalDetails,
    value: any
  ) => {};

  return (
    <>
      <div className="mt-6">
        <div className="border p-4 mb-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-5">
            <div>
              <h2 className="text-lg font-semibold w-full mb-4 text-gray-600">
                Family Details
              </h2>
            </div>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={familyDetails?.member_personal_details?.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full p-2 border rounded text-gray-600"
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
            className="w-full p-2 border rounded text-gray-600"
          />
          <label className="block text-sm font-medium mb-1 text-gray-600">
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
      </div>
    </>
  );
};

export default FamilyDetailsForm;
