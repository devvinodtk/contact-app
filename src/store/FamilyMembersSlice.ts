import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FamilyDetails } from "../types/Users";

interface FamilyDetailsState {
    familyDetails: FamilyDetails[]
}
const initialState: FamilyDetailsState = {
    familyDetails: []
};

const familyMembersSlice = createSlice({
    name: 'family_members',
    initialState,
    reducers: {
        addFamilyMember: (state, action: PayloadAction<FamilyDetails>) =>{
            state.familyDetails.push(action.payload);
        }
    }
});

export const { addFamilyMember } = familyMembersSlice.actions;
export default familyMembersSlice.reducer;