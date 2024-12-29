import { CommunicationPreference, EducationLevel, Gender, Members, RelationshipType } from "../types/Users";
import { db, push, ref, get, query, set, orderByChild, equalTo } from "../firebase/firebase";

export function formatDate(inputDate: string) {
    const [year, month, date] = inputDate.split('-');
    return `${date}/${month}/${year}`;
}

export function setTodayDate() {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
}

export async function saveMemberDataToFiresbase(memberData: Members) {
    // Save data to firebase
    
    if(memberData && memberData.personal_details && memberData.personal_details.mobile_number) {
      const queryRef = ref(db, "kalakairali/members");
      const mobileQuery = query(queryRef, orderByChild("personal_details/mobile_number"), equalTo(memberData.personal_details.mobile_number));
      const snapshot = await get(mobileQuery);
      if (snapshot.exists()) {
        // Mobile number already exists
        throw new Error("This mobile number is already registered.");
      }
    }

    const newDocRef = push(ref(db, "kalakairali/members"));
    set(newDocRef, memberData).then(() => {
      console.log("Document successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
}

export async function getMemberDataFromFirebase() {
    // Get data from firebase
    const memberData: Members[] = [];
    const getDocRef = ref(db, "kalakairali/members");
    const snapshot = await get(getDocRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        memberData.push(childSnapshot.val());
      });
    } else {
      console.log("No data available");
    }
    return memberData;
}

export function getAge(dob: string) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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