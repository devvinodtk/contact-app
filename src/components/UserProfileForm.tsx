import React, { useEffect, useState } from 'react';
import {
  Members,
  BloodGroup,
  Address,
  AddressType,
  FamilyDetails,
  AddressChangeType,
  typographyProps,
  UserOps,
  toastOptions,
  Coordinates,
  blreCoordinates,
} from '../types/Users';

import AddressForm from './AddressForm';
import DropdownSelect from './common/DropdownSelect';
import Header from './common/Header';
import ProfilePicUploader from './common/ProfilePicUploader';
import PopupContainer from './common/PopupContainer';
import FamilyDetailsTable from './FamilyDetailsTable';
import { memberAddress, memberDetails } from '../types/UsersMock';
import { useDispatch, useSelector } from 'react-redux';
import { addMember, updateMember } from '../store/MembersSlice';
import {
  communicationPreferenceOptions,
  educationLevelOptions,
  genderOptions,
  isValidDate,
  removeProfilePicFromFirebase,
  saveMemberDataToFirebase,
  updateMemberToFirebase,
  uploadProfilePicToFirebase,
} from '../utils/Utility_Functions';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, Checkbox, Typography } from '@material-tailwind/react';
import { Plus } from 'lucide-react';
import FamilyDetailsForm from './FamilyDetailsForm';
import AddressCard from './common/AddressCard';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useAuth, UserAuthValue } from '../context/AuthProvider';
import LoaderComponent from './common/Loader';
import { selectMemberById, selectMemberIDMobileMap } from '../store/MemberSelector';
import MapComponent from './MapComponent';
import RegistrationInfo from './RegistrationInfo';

interface UserProfileFormProps {
  registeredMember?: Members;
}
const UserProfileForm: React.FC = ({ registeredMember }: UserProfileFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<Members>({
    mode: 'all',
    defaultValues: registeredMember ?? memberDetails,
  });
  const { userLoggedIn }: UserAuthValue = useAuth();
  const { memberid } = useParams();
  const [member, setMember] = useState<Members | null>(null);
  const selectedMember = useSelector(selectMemberById(memberid));
  const memberIDMobileMap: { [key: string]: string }[] = useSelector(selectMemberIDMobileMap);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openAddFamily, setOpenAddFamily] = useState(false); // Maintains open/close state of Family Details Popup
  const [openRegisterInfoPopUp, setOpenRegisterInfoPopUp] = useState(true);
  const [familyDetails, setFamilyDetails] = useState<FamilyDetails[]>(memberDetails.familyDetails);
  const [familyMemberToEdit, setFamilyMemberToEdit] = useState<FamilyDetails>();
  const [presentAddress, setPresentAddress] = useState<Address>(memberDetails.presentAddress);
  const [permanentAddress, setPermanentAddress] = useState<Address>(memberDetails.permanentAddress);
  const [officeAddress, setOfficeAddress] = useState<Address | null | undefined>(memberDetails.officeAddress);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [currentAddressChange, setCurrentAddressChange] = useState<AddressChangeType>({} as AddressChangeType);
  const [memberLocation, setMemberLocation] = useState<Coordinates | null>(null);
  const [imageString, setImageString] = useState<string | null>(null);
  const handleClose = () => setOpenAddFamily(false); // Callback function to close the Family Details Popup
  const handleAddMember = () => setOpenAddFamily(true); // Callback function to open the Family Details Popup
  const handleRegisterInfoPopUpClose = () => setOpenRegisterInfoPopUp(false);
  const handleAddAddress = ({ operation, addressType }: AddressChangeType) => {
    setCurrentAddressChange({ operation, addressType });
    setOpenAddressDialog(true);
  }; // Callback function to open the Address Popup
  const handleCloseAddress = () => setOpenAddressDialog(false);
  const dispatch = useDispatch();

  const handleResetForm = () => {
    setPresentAddress(memberAddress);
    setPermanentAddress(memberAddress);
    setOfficeAddress(null);
    setFamilyDetails([]);
    setFamilyMemberToEdit(undefined);
    setMember(memberDetails);
    reset(memberDetails);
  };

  const handleCopyPresentAddressChange = (value: boolean) => {
    if (value && presentAddress?.flatNumberName) {
      setPermanentAddress(presentAddress);
      clearErrors('permanentAddress');
    } else {
      setPermanentAddress(memberAddress);
    }
  };

  const handlSaveFamilyDetails = (family_details: FamilyDetails) => {
    setFamilyDetails((prevDetails) => {
      const updateRecordIndx = prevDetails.findIndex(
        (detail) => detail.familyMemberId === family_details.familyMemberId,
      );
      if (updateRecordIndx > -1) {
        return prevDetails.map((detail, index) => (index === updateRecordIndx ? family_details : detail));
      } else {
        return [...prevDetails, family_details];
      }
    });
    setFamilyMemberToEdit(undefined);
    setOpenAddFamily(false);
  };

  const handleAddressChange = (addressType: AddressType, value: Address) => {
    if (addressType === AddressType.PresentAddress) {
      clearErrors('presentAddress');
      setPresentAddress(value);
    } else if (addressType === AddressType.PermanentAddress) {
      setPermanentAddress(value);
      clearErrors('permanentAddress');
    } else if (addressType === AddressType.OfficeAddress) {
      setOfficeAddress(value);
    }
    handleCloseAddress();
  };

  useEffect(() => {
    if (selectedMember) {
      reset(selectedMember);
      setMember(selectedMember);
      setPresentAddress(selectedMember.presentAddress);
      setPermanentAddress(selectedMember.permanentAddress);
      setOfficeAddress(selectedMember.officeAddress);
      setFamilyDetails(selectedMember.familyDetails);
      if (selectedMember.geoLocation) {
        setMemberLocation(selectedMember.geoLocation);
      }
    } else {
      handleResetForm();
    }
  }, [selectedMember, reset]);

  const onHandleSaveMembersForm: SubmitHandler<Members> = async (data) => {
    clearErrors();
    let error = false;
    if (!presentAddress?.flatNumberName) {
      setError('presentAddress', {
        type: 'manual',
        message: 'Present Address is required',
      });
      error = true;
    }
    if (!permanentAddress?.flatNumberName) {
      setError('permanentAddress', {
        type: 'manual',
        message: 'Permanent Address is required',
      });
      error = true;
    }

    trigger();
    if (error) return;

    if (isValid) {
      try {
        setIsLoading(true);
        const ops: UserOps = data.memberId ? UserOps.Edit : UserOps.Add;
        const profilePicUrl = imageString ? await handleSaveProfilePic(data.personalDetails.name) : '';
        if (profilePicUrl && data.personalDetails.profilePhotoUrl) {
          removeProfilePicFromFirebase(data.personalDetails.profilePhotoUrl);
        }
        const userObj = {
          ...data,
          personalDetails: {
            ...data.personalDetails,
            profilePhotoUrl: profilePicUrl || data.personalDetails.profilePhotoUrl,
          },
          geoLocation: memberLocation ?? blreCoordinates,
          memberId: data.memberId ? data.memberId : uuidv4(),
          presentAddress: presentAddress,
          permanentAddress: permanentAddress,
          officeAddress: officeAddress ?? null,
          familyDetails: familyDetails ?? [],
        };
        if (ops === UserOps.Add) {
          addNewMemberDataToFirebase(userObj);
        } else if (ops === UserOps.Edit) {
          updateMemberDataToFirebase(userObj);
        }
      } catch (err: any) {
        toast.error(err.message, toastOptions);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateMemberDataToFirebase = (userObj: Members) => {
    if (memberIDMobileMap?.length) {
      const currentMember = memberIDMobileMap.find((obj) => obj[userObj.personalDetails.mobileNumber]);
      if (currentMember && currentMember[userObj.personalDetails.mobileNumber] !== userObj.memberId) {
        throw new Error('This mobile number is already registered.');
      }
    }

    updateMemberToFirebase(userObj)
      .then(() => {
        toast.success('Member details updated successfully', toastOptions);
        dispatch(updateMember(userObj));
        handleResetForm();
      })
      .catch((err) => {
        toast.error(err.message, toastOptions);
      });
  };

  const addNewMemberDataToFirebase = (userObj: Members) => {
    saveMemberDataToFirebase(userObj)
      .then(() => {
        toast.success('Member details saved successfully', toastOptions);
        dispatch(addMember(userObj));
        handleResetForm();
      })
      .catch((err) => {
        toast.error(err.message, toastOptions);
      });
  };

  const handleEditFamilyMember = (familyMemberId: string) => {
    const memberToEdit = familyDetails.find((member) => {
      return member.familyMemberId === familyMemberId;
    });

    if (memberToEdit) {
      setFamilyMemberToEdit(memberToEdit);
      setOpenAddFamily(true);
    }
  };

  const handleDeleteFamilyMember = (familyMemberId: string) => {
    const updatedFamilyDetails = familyDetails.filter((member) => {
      return member.familyMemberId !== familyMemberId;
    });
    setFamilyDetails(updatedFamilyDetails);
    setFamilyMemberToEdit(undefined);
  };

  const handleSaveProfilePic = async (memberName: string): Promise<string | undefined> => {
    if (!imageString) return;
    try {
      const downloadUrl = await uploadProfilePicToFirebase(imageString, memberName);
      return downloadUrl;
    } catch (err: any) {
      throw new Error('Failed to uploaded profile picture: ' + err.message);
    }
  };

  return (
    <>
      {isLoading && <LoaderComponent />}
      <form
        autoComplete="off"
        className="flex-1 overflow-auto relative z-10"
        onSubmit={handleSubmit(onHandleSaveMembersForm)}
      >
        <Header title={userLoggedIn ? (memberid ? 'Edit Member' : 'Add Members') : 'Register to Kalakairali MMS'} />
        <div className="p-4 w-full mt-16 sm:mt-0">
          {userLoggedIn && !member?.verified && (
            <div className="p-4 flex flex-col sm:flex-row sm:justify-between items-center border rounded-lg mt-6">
              {/* Member ID Section */}
              <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
                <label className="block text-sm font-medium mr-2 text-gray-600">Member ID:</label>
                <input
                  {...register(`displayId`, {
                    required: 'Member ID is required',
                  })}
                  type="text"
                  className={`p-2 border rounded text-gray-600 ${
                    errors.displayId ? 'focus:outline-none border-red-500 bg-red-50' : ''
                  }`}
                  placeholder="KK2025XXXX"
                />
              </div>

              {/* Checkbox Section */}
              <div className="flex items-center">
                <Checkbox
                  {...register('verified')}
                  color="green"
                  label={
                    <Typography
                      color="blue-gray"
                      className="flex font-medium"
                      {...(typographyProps as React.ComponentProps<typeof Typography>)}
                    >
                      Mark this member verified.
                    </Typography>
                  }
                  {...({} as React.ComponentProps<typeof Checkbox>)}
                />
              </div>
            </div>
          )}

          <div className="p-4 border rounded-lg mt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/4">
                <div className="bg-white">
                  <div className="bg-gray-50 min-h-56 flex w-full mt-1 border items-center rounded">
                    <ProfilePicUploader
                      profilePicUrl={member?.personalDetails.profilePhotoUrl}
                      onCropProfilePic={(imgString) => {
                        setImageString(imgString);
                      }}
                    />
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
                      type="text"
                      autoComplete="off"
                      {...register(`personalDetails.dateOfBirth`, {
                        required: 'Date of birth is required',
                        pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9][0-9]|20[0-9][0-9])$/,
                        validate: (value) => {
                          return isValidDate(value, true);
                        },
                      })}
                      placeholder="DD/MM/YYYY"
                      className={`w-full block p-2 border rounded mb-4 text-gray-600 ${
                        errors.personalDetails?.dateOfBirth ? 'focus:outline-none border-red-500 bg-red-50' : ''
                      }`}
                    />
                  </div>
                  <div className="w-full sm:w-1/3 sm:pl-4">
                    <Controller
                      name="personalDetails.gender"
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
                  </div>
                  <div className="w-full sm:w-1/3 sm:pl-4">
                    <Controller
                      name="personalDetails.bloodGroup"
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
                  </div>
                  <div className="w-full sm:w-1/3 sm:pl-4">
                    <label className="block text-sm font-medium mb-1 text-gray-600">Course / Specialization</label>
                    <input
                      type="text"
                      placeholder="Specialization"
                      className="w-full p-2 border rounded mb-4 text-gray-600"
                      {...register(`personalDetails.educationalQualification.specialization`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-lg mt-6">
            <div className="w-full text-left pb-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="text-gray-600"
                {...(typographyProps as React.ComponentProps<typeof Typography>)}
              >
                * Present and Permanent Address are mandatory{' '}
              </Typography>
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
                error={!!errors.permanentAddress}
              />
              <AddressCard
                address={officeAddress}
                addressType={AddressType.OfficeAddress}
                onEdit={({ operation, addressType }) => handleAddAddress({ operation, addressType })}
                error={false}
              />
            </div>
          </div>
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
            <FamilyDetailsTable
              onEditFamilyMember={handleEditFamilyMember}
              onDeleteFamilyMember={handleDeleteFamilyMember}
              familyMembers={familyDetails}
            />
          </div>

          <div className="flex flex-col mt-6 gap-4 md:flex-row">
            <div className="flex-1 p-4 border rounded">
              {/* <GeoLocationDisplay geoLocation={memberDetails.geoLocation} /> */}
              <MapComponent
                coordinates={member?.geoLocation}
                onUpdateLocation={(coordinates: Coordinates) => {
                  setMemberLocation(coordinates);
                }}
              />
            </div>
            {userLoggedIn && (
              <div className="flex-1 p-4 border rounded">
                <h2 className="text-lg font-semibold mb-4 text-gray-600">Office Use</h2>
                <label className="text-gray-600 text-sm font-medium">Proposed by</label>
                <input
                  {...register(`proposedBy`)}
                  type="text"
                  className="w-full p-2 border rounded mb-4 text-gray-600"
                />
                <Controller
                  name="communicationPreference"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DropdownSelect
                      label="Communication Preference"
                      value={value}
                      onChange={onChange}
                      options={communicationPreferenceOptions}
                    />
                  )}
                />
                <label className="text-gray-600 text-sm font-medium">Comments</label>
                <input {...register(`comments`)} type="text" className="p-2 border mb-3 rounded w-full text-gray-600" />
                <label className="text-gray-600 text-sm font-medium">Date of joining *</label>
                <input
                  {...register(`dateOfJoining`, {
                    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9][0-9]|20[0-9][0-9])$/,
                    validate: (value) => {
                      return !value || isValidDate(value);
                    },
                  })}
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className={`w-full p-2 border rounded mb-4 text-gray-600 ${
                    errors.dateOfJoining ? 'focus:outline-none border-red-500 bg-red-50' : ''
                  }`}
                />
              </div>
            )}
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
      <PopupContainer
        header={`${currentAddressChange.operation} ${currentAddressChange.addressType}`}
        open={openAddressDialog}
        onClose={handleCloseAddress}
      >
        <AddressForm
          addressType={currentAddressChange.addressType}
          addressInfo={
            (presentAddress || permanentAddress || officeAddress) &&
            currentAddressChange.addressType === AddressType.PresentAddress
              ? presentAddress
              : currentAddressChange.addressType === AddressType.PermanentAddress
                ? permanentAddress
                : officeAddress
          }
          onAddressChange={(addressType, value) => handleAddressChange(addressType, value)}
        />
      </PopupContainer>
      <PopupContainer open={openAddFamily} header="Add Family Member" onClose={handleClose}>
        <FamilyDetailsForm familyDetails={familyMemberToEdit} onSaveDetails={handlSaveFamilyDetails} />
      </PopupContainer>
      {!userLoggedIn && (
        <PopupContainer
          open={openRegisterInfoPopUp}
          header="Kalakairali Member Management System"
          onClose={handleRegisterInfoPopUpClose}
        >
          <RegistrationInfo onAgreeAndConfirm={handleRegisterInfoPopUpClose} />
        </PopupContainer>
      )}

      <ToastContainer />
    </>
  );
};

export default UserProfileForm;
