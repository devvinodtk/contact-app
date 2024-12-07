export type Users = {
    name : string,
    profile_photo_url?: string,
    mobile_number: string,
    email_id?: string,
    date_of_birth: string,
    blood_group: BloodGroup,
    gender: Gender,
    present_address: Address,
    permanent_address: Address,
    office_address?: Address,
    educational_qualification: EducationalQualification,
    job_title?: string,
    family_details?: FamilyDetails,
    proposed_by: string,
    seconded_by: string,
    communication_preference: CommunicationPreference,
    date_of_joining: Date,
    area_code: AreaCode,
    is_inactive: boolean,
    geo_location?: GeoLocation
}

export type Personal_Details = {
    name : string,
    profile_photo_url?: string,
    mobile_number: string,
    email_id?: string,
    date_of_birth: string,
    blood_group: BloodGroup,
    gender: Gender,
}

export enum BloodGroup {
    APositive = "A+",
    ANegative = "A-",
    BPositive = "B+",
    BNegative = "B-",
    ABPositive = "AB+",
    ABNegative = "AB-",
    OPositive = "O+",
    ONegative = "O-"
}

export type Address = {
    flat_number_name: string,
    address_line_1: string,
    address_line_2: string,
    city: string,
    state: string,
    country: string,
    pin_code: string,
    contact_number: string
}

export type FamilyDetails = {
    name: string,
    relationship: RelationshipType,
    blood_group: BloodGroup,
    gender: Gender,
    educational_qualification: EducationalQualification,
    job_title: string,
    date_of_birth: string
}

export type EducationalQualification = {
    education_level?: EducationLevel,
    specialization?: string
}

export type GeoLocation = {
    latitude: number;
    longitude: number;
  };

export type Gender = "Male" | "Female" | "Other" | "Prefer Not To Say";
export type EducationLevel = "High School" | "Higher Secondary" | "Bachelors Degree" | "Masters Degree" | "PhD"
export type RelationshipType = "Spouse" | "Kid" | "Father" | "Mother" | "Father In Law" | "Mother In Law"
export type CommunicationPreference = "In Person" | "Postal"
export enum AreaCode {
    SNPS = "Sanjay Nagar Police Station",
    SNPO = "Sanjay nagar Post Office",
    NGSH = "Nagashetty Halli",
    AN = "Aswath Nagar",
    NBR = "New BEL Road",
    DC = "Dollors Colony",
    RTN = "RT Nagar"
}