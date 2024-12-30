import { FamilyDetails, BloodGroup } from '../types/Users';
import DropdownSelect from './common/DropdownSelect';
import { Button } from '@material-tailwind/react';
import { educationLevelOptions, genderOptions, relationshipOptions, setTodayDate } from '../utils/Utility_Functions';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface FamilyDetailsFormProps {
  familyDetails?: FamilyDetails;
  onSaveDetails: (details: FamilyDetails) => void;
}

const FamilyDetailsForm: React.FC<FamilyDetailsFormProps> = ({ familyDetails, onSaveDetails }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FamilyDetails>({
    mode: 'all',
    defaultValues: familyDetails,
  });

  const today = setTodayDate();

  const onSubmitHandler: SubmitHandler<FamilyDetails> = (data) => {
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
          defaultValue=""
          rules={{
            required: 'Gender is required',
            validate: (value) => value !== 'Select Gender' || 'Please select a valid gender',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DropdownSelect label="Gender *" value={value} error={error} onChange={onChange} options={genderOptions} />
          )}
        />
        <Controller
          name="relationship"
          control={control}
          defaultValue=""
          rules={{
            required: 'Relationship is required',
            validate: (value) => value !== 'Select Relationship' || 'Please select a valid relationship',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DropdownSelect
              label="Relationship"
              value={value}
              error={error}
              onChange={onChange}
              options={relationshipOptions}
            />
          )}
        />

        <Controller
          name="memberPersonalDetails.bloodGroup"
          control={control}
          defaultValue=""
          rules={{
            required: 'Blood Group is required',
            validate: (value) => value !== 'Select Blood Group' || 'Please select a valid blood group',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DropdownSelect
              label="Blood Group"
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
          defaultValue=""
          rules={{
            required: 'Education level is required',
            validate: (value) => value !== 'Select Education' || 'Please select a valid education level',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DropdownSelect
              label="Educational Qualification  *"
              value={value}
              error={error}
              onChange={onChange}
              options={educationLevelOptions}
            />
          )}
        />

        <label className="text-sm font-medium text-gray-600">
          Specialization
          <input
            type="text"
            placeholder="Specialization"
            {...register('memberPersonalDetails.educationalQualification.specialization')}
            className="w-full p-2 mb-4 border rounded text-gray-600"
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
            type="date"
            max={today}
            placeholder="Date of Birth"
            {...register('memberPersonalDetails.dateOfBirth')}
            className="w-full p-2 border rounded text-gray-600"
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
