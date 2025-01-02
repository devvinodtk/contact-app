export enum BloodGroup {
  SelectBloodGroup = '',
  APositive = 'A+',
  ANegative = 'A-',
  BPositive = 'B+',
  BNegative = 'B-',
  ABPositive = 'AB+',
  ABNegative = 'AB-',
  OPositive = 'O+',
  ONegative = 'O-',
}

export enum AddressType {
  PresentAddress = 'Present Address*',
  PermanentAddress = 'Permanent Address*',
  OfficeAddress = 'Office Address',
}

export enum UserOps {
  Add = 'Add',
  Edit = 'Edit',
  Delete = 'Delete',
  View = 'View',
}

export type Gender = ''| 'Male' | 'Female' | 'Other' | 'Prefer Not To Say';
export type EducationLevel =
  | ''
  | 'Nursery'
  | 'Kindergarten'
  | 'Primary School'
  | 'High School'
  | 'Higher Secondary'
  | 'Bachelors Degree'
  | 'Masters Degree'
  | 'PhD';
export type RelationshipType =
  | ''
  | 'Spouse'
  | 'Kid'
  | 'Father'
  | 'Mother'
  | 'Father In Law'
  | 'Mother In Law';
export type CommunicationPreference = '' | 'In Person' | 'Postal';

export enum AreaCode {
  SNPS = 'Sanjay Nagar Police Station',
  SNPO = 'Sanjay nagar Post Office',
  NGSH = 'Nagashetty Halli',
  AN = 'Aswath Nagar',
  NBR = 'New BEL Road',
  DC = 'Dollors Colony',
  RTN = 'RT Nagar',
}

export type PersonalDetails = {
  name: string;
  profilePhotoUrl?: string;
  mobileNumber?: string;
  emailId?: string;
  dateOfBirth: string;
  bloodGroup: BloodGroup;
  gender: Gender;
  educationalQualification: EducationalQualification;
  jobTitle?: string;
};

export type Members = {
  personalDetails: PersonalDetails;
  jobTitle?: string;
  presentAddress: Address;
  permanentAddress: Address;
  officeAddress?: Address | null;
  familyDetails: FamilyDetails[];
  proposedBy: string;
  secondedBy: string;
  communicationPreference: CommunicationPreference;
  dateOfJoining: string;
  areaCode: AreaCode;
  isInactive: boolean;
  geoLocation?: GeoLocation;
  comments?: string;
  verified: boolean;
};

export type PostalInfo = {
  districtName: string;
  officeName: string;
  pincode: number;
  stateName: string;
  taluk: string;
};

export type FamilyDetails = {
  familyMemberId: string,
  memberPersonalDetails: PersonalDetails;
  relationship: RelationshipType;
};

export type Address = {
  flatNumberName: string;
  addressLine1: string;
  addressLine2: string;
  postOffice: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  contactNumber: string;
};

export type EducationalQualification = {
  educationLevel: EducationLevel;
  specialization?: string;
};

export type GeoLocation = {
  latitude: number;
  longitude: number;
};

export type AddressChangeType = {
  addressType: AddressType;
  operation: UserOps;
};

export const typographyProps = {
  variant: 'small',
  color: 'blue-gray',
};