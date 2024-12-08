import { createSlice } from "@reduxjs/toolkit";
import { Member_Details } from "../types/Users_Mock";
import { Members } from "../types/Users";

const initialState: Members = [];

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addMember: (state, action) =>{
            state.push(action.payload);
        },
        updateMember: (state, action) => {

        },
        deleteMember: (state, action) => {

        }
    }
});

export const { addMember, updateMember, deleteMember } = membersSlice.actions;
export default membersSlice.reducer;