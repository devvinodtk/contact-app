import {
  Address,
  AreaCode,
  BloodGroup,
  Coordinates,
  EducationalQualification,
  FamilyDetails,
  Members,
  PersonalDetails,
} from './Users';

export const geoLocation: Coordinates = {
  lat: 12.9716,
  lng: 77.5946,
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
  educationLevel: '',
  specialization: '',
};

export const personalDetails: PersonalDetails = {
  name: '',
  profilePhotoUrl: '',
  mobileNumber: '',
  emailId: '',
  dateOfBirth: '',
  bloodGroup: BloodGroup.SelectBloodGroup,
  gender: '',
  educationalQualification: educationalQualification,
  jobTitle: '',
};

export const familyDetails: FamilyDetails = {
  familyMemberId: '',
  memberPersonalDetails: personalDetails,
  relationship: '',
};

export const memberDetails: Members = {
  displayId: '',
  memberId: '',
  personalDetails: personalDetails,
  presentAddress: memberAddress,
  permanentAddress: memberAddress,
  officeAddress: null,
  familyDetails: [],
  proposedBy: '',
  secondedBy: '',
  communicationPreference: '',
  dateOfJoining: new Date().toISOString().split('T')[0],
  areaCode: AreaCode.SNPS,
  isInactive: false,
  geoLocation: geoLocation,
  comments: '',
  verified: false,
};