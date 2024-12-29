import React, { useEffect, useState } from "react";
import { FamilyDetails, BloodGroup } from "../types/Users";
import DropdownSelect from "./common/DropdownSelect";
import { Family_Details } from "../types/Users_Mock";
import { Button } from "@material-tailwind/react";
import {
  educationLevelOptions,
  genderOptions,
  relationshipOptions,
  setTodayDate,
} from "../utils/Utility_Functions";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface FamilyDetailsFormProps {
  familyDetails?: FamilyDetails;
  onSaveDetails: (details: FamilyDetails) => void;
}

const FamilyDetailsForm: React.FC<FamilyDetailsFormProps> = ({
  familyDetails,
  onSaveDetails,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ family: FamilyDetails }>({
    mode: "all",
    defaultValues: {
      family: familyDetails ?? Family_Details,
    },
  });

  const [today, setToday] = useState("");
  const handleSaveFormClick = (member: FamilyDetails) => {
    onSaveDetails(member);
  };

  // Set today's date in YYYY-MM-DD format
  useEffect(() => {
    setToday(setTodayDate());
  }, []);

  const onSubmitHandler: SubmitHandler<{ family: FamilyDetails }> = (data) => {
    if (data.family.familyMemberId === null) {
      data.family.familyMemberId = new Date().getTime();
    }
    handleSaveFormClick(data.family);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
      <div className="w-full">
        <label
          htmlFor="family.member_personal_details.name"
          className="text-sm font-medium text-gray-600"
        >
          Name *
        </label>
        <input
          type="text"
          {...register(`family.member_personal_details.name`, {
            required: "Name is required",
          })}
          placeholder="Name"
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.family?.member_personal_details?.name
              ? "focus:outline-none border-red-500 bg-red-50"
              : ""
          }`}
        />
        <Controller
          name="family.member_personal_details.gender"
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <DropdownSelect
              label="Gender *"
              error={errors.family?.member_personal_details?.gender}
              options={genderOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        ></Controller>
        <Controller
          name="family.relationship"
          control={control}
          rules={{ required: "Relationship is required" }}
          render={({ field }) => (
            <DropdownSelect
              label="Relationship *"
              error={errors.family?.relationship}
              options={relationshipOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        ></Controller>
        <Controller
          name="family.member_personal_details.blood_group"
          control={control}
          rules={{ required: "Blood Group is required" }}
          render={({ field }) => (
            <DropdownSelect
              label="Blood Group"
              options={Object.values(BloodGroup)}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        ></Controller>
        {/* Additional fields for family details */}
        <Controller
          name="family.member_personal_details.educational_qualification.education_level"
          control={control}
          rules={{ required: "Education level is required" }}
          render={({ field }) => (
            <DropdownSelect
              label="Educational Qualification  *"
              error={
                errors.family?.member_personal_details
                  ?.educational_qualification?.education_level
              }
              options={educationLevelOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        ></Controller>
        <label
          htmlFor="family.member_personal_details.educational_qualification
                .specialization"
          className="text-sm font-medium text-gray-600"
        >
          Specialization
        </label>
        <input
          type="text"
          {...register(
            `family.member_personal_details.educational_qualification.specialization`
          )}
          placeholder="Specialization"
          className="w-full p-2 mb-4 border rounded text-gray-600"
        />
        <label
          htmlFor="family.member_personal_details.job_title"
          className="w-full text-sm font-medium text-gray-600"
        >
          Occupation
        </label>
        <input
          type="text"
          {...register(`family.member_personal_details.job_title`)}
          placeholder="Occupation"
          className="w-full p-2 border rounded text-gray-600"
        />
        <label className="block text-sm font-medium mt-6 mb-1 text-gray-600">
          Date of Birth
        </label>
        <input
          type="date"
          {...register(`family.member_personal_details.date_of_birth`)}
          max={today}
          placeholder="Date of Birth"
          className="w-full p-2 border rounded text-gray-600"
        />
        <Button
          type="submit"
          color="blue"
          className="w-full cursor-pointer text-white mt-6 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          {...({} as React.ComponentProps<typeof Button>)}
        >
          Save Details
        </Button>
      </div>
    </form>
  );
};

export default FamilyDetailsForm;
