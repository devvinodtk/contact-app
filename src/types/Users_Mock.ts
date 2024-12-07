import { Address, AreaCode, BloodGroup, EducationalQualification, FamilyDetails, GeoLocation, Members, PersonalDetails } from "./Users";

export const Geo_Location: GeoLocation = {
    latitude: 12.9716, longitude: 77.5946
};

export const Member_Address: Address = {
    flat_number_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    contact_number: "",
}

export const Educational_Qualification: EducationalQualification = {
    education_level: "High School",
    specialization: "",
}

export const Personal_Details: PersonalDetails = {
    name: "",
    profile_photo_url: "",
    mobile_number: "",
    email_id: "",
    date_of_birth: "",
    blood_group: BloodGroup.APositive,
    gender: "Male",
    educational_qualification: Educational_Qualification,
    job_title: ""
}

export const Family_Details: FamilyDetails = {
    member_personal_details: Personal_Details,
    relationship: "Spouse",
}

export const Member_Details: Members = {
    personal_details: Personal_Details,
    present_address: Member_Address,
    permanent_address: Member_Address,
    office_address: Member_Address,
    family_details: [Family_Details],
    proposed_by: "",
    seconded_by: "",
    communication_preference: "In Person",
    date_of_joining: new Date(),
    area_code: AreaCode.SNPS,
    is_inactive: false,
    geo_location: Geo_Location,
}