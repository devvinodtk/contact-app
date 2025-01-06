import { CommunicationPreference, EducationLevel, Gender, Members, RelationshipType } from '../types/Users';
import { db, ref, get, query, set, orderByChild, equalTo, update } from '../firebase/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';

export function formatDate(inputDate: string) {
  if(!inputDate) return '';
  const [year, month, date] = inputDate.split('-');
  return `${date}/${month}/${year}`;
}

export function setTodayDate() {
  const currentDate = new Date();
  return currentDate.toISOString().split('T')[0];
}

export async function updateMemberToFiresbase(updatedMember: Members) {
  const getDocRef = ref(db, `kalakairali/members/${updatedMember.memberId}`);
  const snapshot = await get(getDocRef);

  if(snapshot.exists()) {
    update(getDocRef, updatedMember).then(() => {
      console.log('Member details successfully updated!');
    })
    .catch((error) => {
      throw new Error('Error updating member details: '+ error);
    });
  } else {
    throw new Error('The user with specified member id not found.');
  }
}

export async function saveMemberDataToFiresbase(memberData: Members) {
  // Save data to firebase

  if (memberData?.personalDetails?.mobileNumber) {
    const queryRef = ref(db, `kalakairali/members`);
    const mobileQuery = query(
      queryRef,
      orderByChild('personalDetails/mobileNumber'),
      equalTo(memberData.personalDetails.mobileNumber),
    );
    const snapshot = await get(mobileQuery);
    if (snapshot.exists()) {
      // Mobile number already exists
      throw new Error('This mobile number is already registered.');
    }
  }

  const newDocRef = ref(db, `kalakairali/members/${memberData.memberId}`);
  set(newDocRef, memberData)
    .then(() => {
      console.log('Member successfully registered!');
    })
    .catch((error) => {
      console.error('Error registering member: ', error);
    });
}

export const fetchMembers = createAsyncThunk('', async()=>{
  const getDocRef = ref(db, 'kalakairali/members');
  const snapshot = await get(getDocRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log('No data available');
  }
});

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
  '',
  'Spouse',
  'Kid',
  'Father',
  'Mother',
  'Father In Law',
  'Mother In Law',
] as RelationshipType[];

export const postOfficeOptions = [''] as string[];

export const genderOptions = ['', 'Male', 'Female', 'Other', 'Prefer not to say'] as Gender[];

export const educationLevelOptions = [
  '',
  'Nursery',
  'Kindergarten',
  'Primary School',
  'High School',
  'Higher Secondary',
  'Bachelors Degree',
  'Masters Degree',
  'PhD',
] as EducationLevel[];

export const communicationPreferenceOptions = [
  '',
  'In Person',
  'Postal',
] as CommunicationPreference[];
