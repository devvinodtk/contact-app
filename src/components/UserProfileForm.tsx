import React, { useEffect, useState } from 'react';
import { Members, BloodGroup, Address, AddressType, FamilyDetails, AddressChangeType } from '../types/Users';

import AddressForm from './AddressForm';
import DropdownSelect from './common/DropdownSelect';
import GeoLocationDisplay from './GeoLocationDisplay';
import Header from './common/Header';
import ProfilePicUploader from './common/ProfilePicUploader';
import PopupContainer from './common/PopupContainer';
import FamilyDetailsTable from './FamilyDetailsTable';
import { memberAddress, memberDetails } from '../types/UsersMock';
import { useDispatch } from 'react-redux';
import { addMember } from '../store/membersSlice';
import {
  communicationPreferenceOptions,
  educationLevelOptions,
  genderOptions,
  saveMemberDataToFiresbase,
  setTodayDate,
} from '../utils/Utility_Functions';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import { Plus } from 'lucide-react';
import FamilyDetailsForm from './FamilyDetailsForm';
import AddressCard from './common/AddressCard';

const UserProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<Members>({
    mode: 'onSubmit',
    defaultValues: memberDetails,
  });
  const [user, setUser] = useState<Members>(memberDetails);
  const [open, setOpen] = useState(false); // Maintains open/close state of Family Details Popup
  const [familyDetails, setFamilyDetails] = useState<FamilyDetails[] | undefined>(memberDetails.familyDetails);
  const [presentAddress, setPresentAddress] = useState<Address | null>(memberDetails.presentAddress);
  const [permanentAddress, setPermanentAddress] = useState<Address | null>(memberDetails.permanentAddress);
  const [officeAddress, setOfficeAddress] = useState<Address | null | undefined>(memberDetails.officeAddress);
  const [today, setToday] = useState('');
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [currentAddressChange, setCurrentAddressChange] = useState<AddressChangeType>({} as AddressChangeType);

  const handleClose = () => setOpen(false); // Callback function to close the Family Details Popup
  const handleAddMember = () => setOpen(true); // Callback function to open the Family Details Popup
  const handleAddAddress = ({ operation, addressType }: AddressChangeType) => {
    setCurrentAddressChange({ operation, addressType });
    setOpenAddressDialog(true);
  }; // Callback function to open the Address Popup
  const handleCloseAddress = () => setOpenAddressDialog(false);
  const dispatch = useDispatch();

  const handleResetForm = () => {
    setUser(memberDetails);
    setFamilyDetails([]);
    setPresentAddress(memberAddress);
    setPermanentAddress(memberAddress);
    setOfficeAddress(memberAddress);
  };

  const handleCopyPresentAddressChange = (value: boolean) => {
    if (value && presentAddress?.flatNumberName) {
      setPermanentAddress(presentAddress);
    } else {
      setPermanentAddress(memberAddress);
    }
  };

  const handlSaveFamilyDetails = (family_details: FamilyDetails) => {
    setFamilyDetails((prevFamilyMembers) => [...prevFamilyMembers, family_details]);
    setOpen(false);
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

  const onHandleSaveMembersForm: SubmitHandler<Members> = (data) => {
    console.log('addressDetails: submit from UserProfile ===>');
    if (!presentAddress?.flatNumberName) {
      setError('presentAddress', { type: 'manual', message: 'Present Address is required' });
    }
    if (!permanentAddress?.flatNumberName) {
      setError('permanentAddress', { type: 'manual', message: 'Permanent Address is required' });
    }

    if (isValid) {
      const userObj = {
        ...data,
        presentAddress: presentAddress,
        permanentAddress: permanentAddress,
        officeAddress: officeAddress,
        familyDetails: familyDetails,
      };
      saveMemberDataToFiresbase(userObj);
      dispatch(addMember(userObj));
      handleResetForm();
    }
  };

  return (
    <>
      <form
        autoComplete="off"
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
                  <label className="block text-sm font-medium mb-1 text-gray-600">Name *</label>
                  <input
                    type="text"
                    placeholder="Name"
                    autoComplete="off"
                    {...register(`personalDetails.name`, {
                      required: 'Name is required',
                    })}
                    className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                      errors.personalDetails?.name ? 'focus:outline-none border-red-500 bg-red-50' : ''
                    }`}
                  />
                </div>
                <div className="w-full sm:w-1/3 sm:pl-4">
                  <label className="block text-sm font-medium mb-1 text-gray-600">Mobile Number *</label>
                  <input
                    type="number"
                    placeholder="Mobile number"
                    autoComplete="off"
                    {...register(`personalDetails.mobileNumber`, {
                      required: 'Mobile number is required',
                      minLength: 10,
                      maxLength: 10,
                    })}
                    className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                      errors.personalDetails?.mobileNumber ? 'focus:outline-none border-red-500 bg-red-50' : ''
                    }`}
                  />
                </div>
                <div className="w-full sm:w-1/3 sm:pl-4">
                  <label className="block text-sm font-medium mb-1 text-gray-600">Email ID *</label>
                  <input
                    type="email"
                    autoComplete="off"
                    {...register(`personalDetails.emailId`, {
                      required: 'Email ID is required',
                      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                    })}
                    placeholder="Email ID"
                    className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                      errors.personalDetails?.emailId ? 'focus:outline-none border-red-500 bg-red-50' : ''
                    }`}
                  />
                </div>
                <div className="w-full sm:w-1/3">
                  <label className="block text-sm font-medium mb-1 text-gray-600">Date of Birth *</label>
                  <input
                    type="date"
                    autoComplete="off"
                    max={today}
                    {...register(`personalDetails.dateOfBirth`, {
                      required: 'Date of birth is required',
                    })}
                    placeholder="Date of Birth"
                    className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                      errors.personalDetails?.dateOfBirth ? 'focus:outline-none border-red-500 bg-red-50' : ''
                    }`}
                  />
                </div>
                <div className="w-full sm:w-1/3 sm:pl-4">
                  <Controller
                    name="personalDetails.gender"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Gender is required',
                      validate: (value) => value !== 'Select Gender' || 'Please select a valid gender',
                    }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <DropdownSelect
                        label="Gender *"
                        value={value}
                        error={error}
                        onChange={onChange}
                        options={genderOptions}
                      />
                    )}
                  />
                </div>
                <div className="w-full sm:w-1/3 sm:pl-4">
                  <Controller
                    name="personalDetails.bloodGroup"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Blood Group is required',
                      validate: (value) => value !== 'Select Blood Group' || 'Please select a valid blood group',
                    }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <DropdownSelect
                        label="Blood Group *"
                        value={value}
                        error={error}
                        onChange={onChange}
                        options={Object.values(BloodGroup)}
                      />
                    )}
                  />
                </div>
                <div className="w-full sm:w-1/3">
                  <label className="block text-sm font-medium mb-1 text-gray-600">Occupation *</label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Occupation"
                    {...register(`personalDetails.jobTitle`, {
                      required: 'Occupation is required',
                    })}
                    className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                      errors.personalDetails?.jobTitle ? 'focus:outline-none border-red-500 bg-red-50' : ''
                    }`}
                  />
                </div>
                <div className="w-full sm:w-1/3 sm:pl-4">
                  <Controller
                    name="personalDetails.educationalQualification.educationLevel"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Education level is required',
                      validate: (value) => value !== 'Select Education' || 'Please select a valid education level',
                    }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <DropdownSelect
                        label="Educational Qualification *"
                        value={value}
                        error={error}
                        onChange={onChange}
                        options={educationLevelOptions}
                      />
                    )}
                  />
                </div>
                <div className="w-full sm:w-1/3 sm:pl-4">
                  <label className="block text-sm font-medium mb-1 text-gray-600">Specialization</label>
                  <input
                    type="text"
                    placeholder="Specialization"
                    {...register(`personalDetails.educationalQualification.specialization`)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
            <AddressCard
              address={presentAddress}
              addressType={AddressType.PresentAddress}
              onEdit={({ operation, addressType }) => handleAddAddress({ operation, addressType })}
              error={!!errors.presentAddress}
            />
            <AddressCard
              address={permanentAddress}
              copyAddress={true}
              addressType={AddressType.PermanentAddress}
              onEdit={({ operation, addressType }) => handleAddAddress({ operation, addressType })}
              onCopyPresentAddress={handleCopyPresentAddressChange}
              error={!!errors.presentAddress}
            />
            <AddressCard
              address={officeAddress}
              addressType={AddressType.OfficeAddress}
              onEdit={({ operation, addressType }) => handleAddAddress({ operation, addressType })}
              error={false}
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
                  : currentAddressChange.addressType === AddressType.PermanentAddress
                    ? permanentAddress
                    : officeAddress
              }
              onAddressChange={(addressType, value) => handleAddressChange(addressType, value)}
            />
          </PopupContainer>
          <div className="p-4 border rounded-lg mt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1  text-left">
                <h2 className="text-lg font-semibold mb-4 text-gray-600">Add Family Members</h2>
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
            <FamilyDetailsTable familyMembers={familyDetails} />
          </div>

          <div className="flex flex-col mt-6 gap-4 md:flex-row">
            <div className="flex-1 p-4 border rounded">
              <GeoLocationDisplay geoLocation={memberDetails.geoLocation} />
            </div>
            <div className="flex-1 p-4 border rounded">
              <h2 className="text-lg font-semibold mb-4 text-gray-600">Office Use</h2>
              <label className="text-gray-600 text-sm font-medium">Proposed by</label>
              <input
                {...register(`proposedBy`, {
                  required: 'Proposed by is required',
                })}
                type="text"
                className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                  errors.proposedBy ? 'focus:outline-none border-red-500 bg-red-50' : ''
                }`}
              />
              <Controller
                name="communicationPreference"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Communication Preference is required',
                  validate: (value) => value !== 'Select Your Preference' || 'Please select a valid preference',
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <DropdownSelect
                    label="Communication Preference"
                    value={value}
                    error={error}
                    onChange={onChange}
                    options={communicationPreferenceOptions}
                  />
                )}
              />
              <label className="text-gray-600 text-sm font-medium">Comments</label>
              <input {...register(`comments`)} type="text" className="p-2 border mb-3 rounded w-full text-gray-600" />
            </div>
          </div>
        </div>
        <div className="p-4 w-full bg-gray-50 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center">
            <Button
              type="submit"
              color="blue"
              className="mb-4 sm:mb-0 order-1 sm:order-2 cursor-pointer text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              {...({} as React.ComponentProps<typeof Button>)}
            >
              Save Member Details
            </Button>
            <Button
              type="button"
              onClick={handleResetForm}
              className="order-2 sm:order-1 cursor-pointer mr-0 sm:mr-2 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              {...({} as React.ComponentProps<typeof Button>)}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
      <PopupContainer open={open} header="Add Family Member" onClose={handleClose}>
        <FamilyDetailsForm onSaveDetails={handlSaveFamilyDetails} />
      </PopupContainer>
    </>
  );
};

export default UserProfileForm;
