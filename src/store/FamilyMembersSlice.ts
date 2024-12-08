import { createSlice } from "@reduxjs/toolkit";
import { Family_Details } from "../types/Users_Mock";
import { FamilyDetails } from "../types/Users";

const initialState: FamilyDetails = [];

const familyMembersSlice = createSlice({
    name: 'family_members',
    initialState,
    reducers: {
        addFamilyMember: (state, action) =>{
            state.push(action.payload);
        },
        updateFamilyMember: (state, action) => {

        },
        deleteFamilyMember: (state, action) => {

        }
    }
});

export const { addFamilyMember, updateFamilyMember, deleteFamilyMember } = familyMembersSlice.actions;
export default familyMembersSlice.reducer;