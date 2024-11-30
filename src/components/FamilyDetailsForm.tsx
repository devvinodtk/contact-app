import React, { useState } from "react";
import {
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
  const handleAddMember = () => {
    onChange({
      name: "",
      relationship: "Spouse",
      blood_group: BloodGroup.APositive,
      gender: "Male",
      educational_qualification: {
        education_level: "High School",
        specialization: "",
      },
      job_title: "",
      date_of_birth: "",
    });
  };

  const handleChange = (
    field: keyof FamilyDetails | keyof EducationalQualification,
    value: any
  ) => {
    // const updatedDetails = [...familyDetails];
    // updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    // onChange(updatedDetails);
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-600">
        Family Details
      </h2>
      <div className="border p-4 mb-4 rounded-lg">
        <input
          type="text"
          placeholder="Name"
          value={familyDetails?.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full p-2 border rounded mb-4 text-gray-600"
        />
        <DropdownSelect
          label="Gender"
          options={["Male", "Female", "Other", "Prefer not to say"] as Gender[]}
          value={familyDetails?.gender}
          onChange={(value) => handleChange("gender", value)}
        />
        //
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
          value={familyDetails?.blood_group}
          onChange={(value) => handleChange("relationship", value)}
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
          value={familyDetails?.educational_qualification.education_level}
          onChange={(value) => handleChange("education_level", value)}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={familyDetails?.educational_qualification.specialization}
          onChange={(e) => handleChange("specialization", e.target.value)}
          className="w-full p-2 border rounded mb-4 text-gray-600"
        />
        <input
          type="text"
          placeholder="Job Title"
          value={familyDetails?.job_title}
          onChange={(e) => handleChange("job_title", e.target.value)}
          className="w-full p-2 border rounded mb-4 text-gray-600"
        />
        <label className="block text-sm font-medium mb-1 text-gray-600">
          Date of Birth
        </label>
        <input
          type="date"
          placeholder="Date of Birth"
          value={familyDetails?.date_of_birth}
          onChange={(e) => handleChange("date_of_birth", e.target.value)}
          className="w-full p-2 border rounded mb-4 text-gray-600"
        />
      </div>
      <button
        onClick={handleAddMember}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Family Member
      </button>
    </div>
  );
};

export default FamilyDetailsForm;
