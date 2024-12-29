import {
  Address,
  AreaCode,
  BloodGroup,
  EducationalQualification,
  FamilyDetails,
  GeoLocation,
  Members,
  PersonalDetails,
} from './Users';

export const geoLocation: GeoLocation = {
  latitude: 12.9716,
  longitude: 77.5946,
};

export const memberAddress: Address = {
  flatNumberName: '',
  addressLine1: '',
  addressLine2: '',
  postOffice: '',
  city: '',
  state: '',
  country: 'INDIA',
  pincode: '',
  contactNumber: '',
};

export const educationalQualification: EducationalQualification = {
  educationLevel: 'Select Education',
  specialization: '',
};

export const personalDetails: PersonalDetails = {
  name: '',
  profilePhotoUrl: '',
  mobileNumber: '',
  emailId: '',
  dateOfBirth: '',
  bloodGroup: BloodGroup.SelectBloodGroup,
  gender: 'Select Gender',
  educationalQualification: educationalQualification,
  jobTitle: '',
};

export const familyDetails: FamilyDetails = {
  memberPersonalDetails: personalDetails,
  relationship: 'Select Relationship',
};

export const memberDetails: Members = {
  personalDetails: personalDetails,
  presentAddress: memberAddress,
  permanentAddress: memberAddress,
  officeAddress: memberAddress,
  familyDetails: [familyDetails],
  proposedBy: '',
  secondedBy: '',
  communicationPreference: 'Select Your Preference',
  dateOfJoining: new Date().toISOString().split('T')[0],
  areaCode: AreaCode.SNPS,
  isInactive: false,
  geoLocation: geoLocation,
  comments: '',
  verified: false,
};
