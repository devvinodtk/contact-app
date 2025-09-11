export type PersonalDetails = {
  name: string;
  mobileNumber: string;
};

export type Address = {
  flatNumberName: string;
  addressLine1: string;
  addressLine2: string;
  postOffice: string;
  city: string;
  state: string;
  pincode: string;
  contactNumber: string;
};

export type Members = {
  displayId?: string;
  memberId?: string;
  isInactive?: boolean;
  verified: boolean;
  personalDetails: PersonalDetails;
  presentAddress: Address;
};
