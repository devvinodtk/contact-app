import { CommunicationPreference, EducationLevel, Gender, Members, PostalData, PostOfficesInfo, RelationshipType } from '../types/Users';
import { db, ref, get, query, set, orderByChild, equalTo, update, remove, storage } from '../firebase/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import axios from 'axios';

export const pincodeLookup = async (pincode: string): Promise<PostOfficesInfo | undefined> => {
  try{
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    const PostOfficesList: PostalData[] = response.data[0].PostOffice;
    
    if(PostOfficesList && PostOfficesList.length > 0) {
      return {
          district: PostOfficesList[0].District,
          state: PostOfficesList[0].State,
          postOffices: PostOfficesList.map((postOffice)=> postOffice?.Name)
      }
    }
  } catch(err: any) {
    throw new Error('Error while fetching the postal info: '+ err);
  }
}

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

export async function deleteMemberFromFiresbase(memberId: string) {
  const getDocRef = ref(db, `kalakairali/members/${memberId}`);
  const snapshot = await get(getDocRef);

  if(snapshot.exists()) {
    remove(getDocRef).then(() => {
      console.log('Member successfully deleted!');
    })
    .catch((error) => {
      throw new Error('Error deleting member details: '+ error);
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

export const uploadProfilePicToFirebase = async(imageStrting: string, name: string) => {
  if (!imageStrting) return;
  try {
    const fileName = name?.trim().toLowerCase().replace(' ', '-');
    const imgRef = storageRef(storage, `images/profile/${fileName}_${new Date().getTime()}`);
      const blob = await resizeImage(imageStrting);
      if(blob) {
        await uploadBytes(imgRef, blob);
        return await getDownloadURL(imgRef);
      }
  } catch(err: any) {
    throw new Error('Failed to upload image: '+err);
  }
}

export const removeProfilePicFromFirebase = async(imageUrl: string) => {
  const imgRef = storageRef(storage, imageUrl);
  await deleteObject(imgRef);
}

export const resizeImage = (base64: string): Promise<Blob | null> =>
  new Promise((resolve, reject) => {
    const maxWidth = 1024;
    const maxHeight = 1024;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          width = maxWidth;
          height = Math.floor((img.height / img.width) * maxWidth);
        } else {
          height = maxHeight;
          width = Math.floor((img.width / img.height) * maxHeight);
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw the resized image
      ctx?.drawImage(img, 0, 0, width, height);

      // Convert to Blob
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg", // You can change the format (e.g., image/png)
        0.8 // Quality (0.1 to 1.0)
      );
    };

    img.onerror = reject;

    img.src = base64;
  });

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
