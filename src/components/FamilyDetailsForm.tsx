import { Button } from '@material-tailwind/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { FamilyDetails, BloodGroup } from '../types/Users.ts';
import DropdownSelect from './common/DropdownSelect.tsx';
import { educationLevelOptions, genderOptions, isValidDate, relationshipOptions } from '../utils/Utility_Functions.ts';
interface FamilyDetailsFormProps {
  familyDetails?: FamilyDetails;
  onSaveDetails: (details: FamilyDetails) => void;
}

const FamilyDetailsForm: React.FC<FamilyDetailsFormProps> = ({
  familyDetails,
  onSaveDetails,
}: FamilyDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FamilyDetails>({
    mode: 'all',
    defaultValues: familyDetails,
  });

  const onSubmitHandler: SubmitHandler<FamilyDetails> = (data) => {
    if (!data.familyMemberId) {
      data.familyMemberId = uuidv4();
    }
    onSaveDetails(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
      <div className="w-full">
        <label htmlFor=".memberPersonalDetails.name" className="text-sm font-medium text-gray-600">
          Name *
        </label>
        <input
          type="text"
          {...register(`memberPersonalDetails.name`, {
            required: 'Name is required',
          })}
          placeholder="Name"
          className={`w-full p-2 mb-4 border rounded text-gray-600 ${
            errors.memberPersonalDetails?.name ? 'focus:outline-none border-red-500 bg-red-50' : ''
          }`}
        />
        <Controller
          name="memberPersonalDetails.gender"
          control={control}
          rules={{
            required: 'Gender is required',
            validate: (value) => value !== '' || 'Please select a valid gender',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DropdownSelect
              label="Gender"
              mandatory={true}
              value={value}
              error={error}
              onChange={onChange}
              options={genderOptions}
            />
          )}
        />
        <Controller
          name="relationship"
          control={control}
          rules={{
            required: 'Relationship is required',
            validate: (value) => value !== '' || 'Please select a valid relationship',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DropdownSelect
              label="Relationship"
              mandatory={true}
              value={value}
              error={error}
              onChange={onChange}
              options={relationshipOptions.sort()}
            />
          )}
        />

        <Controller
          name="memberPersonalDetails.bloodGroup"
          control={control}
          rules={{
            required: 'Blood Group is required',
            validate: (value) => value !== '' || 'Please select a valid blood group',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DropdownSelect
              label="Blood Group"
              mandatory={true}
              value={value}
              error={error}
              onChange={onChange}
              options={Object.values(BloodGroup)}
            />
          )}
        />
        <Controller
          name="memberPersonalDetails.educationalQualification.educationLevel"
          control={control}
          rules={{
            required: 'Education level is required',
            validate: (value) => value !== '' || 'Please select a valid education level',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DropdownSelect
              label="Educational Qualification"
              mandatory={true}
              value={value}
              error={error}
              onChange={onChange}
              options={educationLevelOptions}
            />
          )}
        />

        <label className="text-sm font-medium text-gray-600">
          Course / Specialization
          <input
            type="text"
            placeholder="Specialization"
            {...register('memberPersonalDetails.educationalQualification.specialization')}
            className="w-full p-2 border rounded text-gray-600"
          />
        </label>
        <label className="w-full text-sm font-medium text-gray-600">
          Occupation
          <input
            type="text"
            placeholder="Occupation"
            {...register('memberPersonalDetails.jobTitle')}
            className="w-full p-2 border rounded text-gray-600"
          />
        </label>
        <label className="block text-sm font-medium mt-6 mb-1 text-gray-600">
          Date of Birth
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            {...register('memberPersonalDetails.dateOfBirth', {
              pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9][0-9]|20[0-9][0-9])$/,
              validate: (value) => {
                return !value || isValidDate(value);
              },
            })}
            className={`w-full block p-2 border rounded mb-4 text-gray-600 ${
              errors.memberPersonalDetails?.dateOfBirth ? 'focus:outline-none border-red-500 bg-red-50' : ''
            }`}
          />
        </label>
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
