import { CommunicationPreference, EducationLevel, Gender, RelationshipType } from "../types/Users";

export function formatDate(inputDate: string) {
    const [year, month, date] = inputDate.split('-');
    return `${date}/${month}/${year}`;
}

export function setTodayDate() {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
}

export const relationshipOptions = [
    "Select Relationship",
    "Spouse",
    "Kid",
    "Father",
    "Mother",
    "Father In Law",
    "Mother In Law",
  ] as RelationshipType[];

export const postOfficeOptions = [
    "Select Post Office",
] as string[];

export const genderOptions = [
    "Select Gender",
    "Male",
    "Female",
    "Other",
    "Prefer not to say",
  ] as Gender[]

export const educationLevelOptions = [
    "Select Education",
    "Nursery",
    "Kindergarten",
    "Primary School",
    "High School",
    "Higher Secondary",
    "Bachelors Degree",
    "Masters Degree",
    "PhD",
  ] as EducationLevel[];

export const communicationPreferenceOptions = ["Select Your Preference", "In Person", "Postal"] as CommunicationPreference[];