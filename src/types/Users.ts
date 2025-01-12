import { ToastOptions, Slide } from "react-toastify";

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

export type DeleteAction = 'soft_delete' | 'hard_delete'
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
  | 'Child'
  | 'Father'
  | 'Mother'
  | 'Father In Law'
  | 'Mother In Law';
export type CommunicationPreference = '' | 'In Person' | 'Postal';

export enum AreaCode {
  SNPS = 'Sanjay Nagar Police Station',
  SNPO = 'Sanjay Nagar Post Office',
  NGSH = 'Nagashetty Halli',
  AN = 'Aswath Nagar',
  NBR = 'New BEL Road',
  DC = 'Dollors Colony',
  RTN = 'RT Nagar',
}

export type PersonalDetails = {
  name: string;
  profilePhotoUrl?: string;
  mobileNumber: string;
  emailId?: string;
  dateOfBirth: string;
  bloodGroup: BloodGroup;
  gender: Gender;
  educationalQualification: EducationalQualification;
  jobTitle?: string;
};

export type Members = {
  displayId?: string
  memberId: string,
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
  geoLocation?: Coordinates;
  comments?: string;
  verified: boolean;
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

export interface Coordinates {
  lat: number;
  lng: number;
}

export type AddressChangeType = {
  addressType: AddressType;
  operation: UserOps;
};

export const typographyProps = {
  variant: 'small',
  color: 'blue-gray',
};

export const blreCoordinates = {
  lat: 12.9716,
  lng: 77.5946,
};
export const toastOptions: ToastOptions<unknown> = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
}

export type PostOfficesInfo ={
  postOffices:string[]
  district: string,
  state: string
}

export type PostalData = {
  Block:  string,
  BranchType : string,
  Circle : string,
  Country : string,
  DeliveryStatus : string,
  Description :  string | null,
  District :  string,
  Division :  string,
  Name : string,
  Pincode : string,
  Region :  string,
  State : string
}